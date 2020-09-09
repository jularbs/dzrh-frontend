// TO DO
// ERROR HANDLING
// LOADING HANDLER
// LIST REMOVE USERS

import Layout from "../../../../layouts/Layout";
import Admin from "../../../../components/auth/Admin.component";
import PageTitle from "../../../../components/common/PageTitle";
import {
  Col,
  Row,
  Card,
  CardHeader,
  Button,
  CardFooter,
  FormSelect,
} from "shards-react";

import { listUsers, changeRole, removeUser } from "../../../../actions/user";
import { useState, useEffect } from "react";

import { getCookie, handleResponse } from "../../../../actions/auth";

const PendingUsersPage = () => {
  const [listUser, setListUser] = useState([]);
  const [userRoles, setUserRoles] = useState([]);
  const [values, setValues] = useState({
    error: "",
    success: "",
    message: "",
  });

  const { error, success, message } = values;
  const token = getCookie("token");

  const init = () => {
    listUsers().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      }

      setListUser(data);
      data.forEach((u, i) => {
        userRoles[u._id] = u.role;
      });
    });
  };

  useEffect(() => {
    init();
  }, []);

  const onRoleChange = (_id) => (e) => {
    const value = e.target.value;
    userRoles[_id] = value;
  };

  const handleUpdate = (_id) => (e) => {
    e.preventDefault();
    changeRole(token, { _id, role: userRoles[_id] }).then((data) => {
      setValues({ ...values, success: true });
      setListUser(data);
    });
  };

  const handleRemove = (_id) => (e) => {
    e.preventDefault();

    if (window.confirm("Are you sure you want to remove this user?")) {
      removeUser(token, { _id }).then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        }

        setListUser(data);
      });
    }
  };

  const showUserLists = () =>
    listUser &&
    listUser.map((u, i) => (
      <Col lg="4" md="6" sm="12" key={i}>
        <Card small className="mb-4 pt-3">
          <CardHeader className="border-bottom text-center">
            <div className="mb-3 mx-auto">
              {u.photo ? (
                <img
                  className="rounded-circle"
                  src={u.photo.link}
                  alt={u.name}
                  width="110"
                />
              ) : (
                <i
                  className="material-icons text-muted"
                  style={{ fontSize: "105px" }}
                >
                  face
                </i>
              )}
            </div>
            <h4 className="mb-0 text-capitalize">{u.name}</h4>
            <strong className="text-muted d-block mb-2 mt-3">Role</strong>
            <Col md="12" className="form-group">
              <FormSelect name="role" onChange={onRoleChange(u._id)}>
                <option value="0" selected={u.role == 0}>
                  Writer
                </option>
                <option value="1" selected={u.role == 1}>
                  Administrator
                </option>
              </FormSelect>
            </Col>
          </CardHeader>
          <CardFooter className="py-3 px-3">
            <div className="d-flex justify-content-between ">
              <Button theme="primary" onClick={handleUpdate(u._id)}>
                Update
              </Button>
              <Button theme="danger" onClick={handleRemove(u._id)}>
                Remove
              </Button>
            </div>
          </CardFooter>
        </Card>
      </Col>
    ));

  const showUpdateSuccess = () =>
    success && (
      <div className="alert alert-success">User role updated successfully!</div>
    );
  return (
    <Layout>
      <Admin>
        <Row noGutters className="page-header py-4">
          <PageTitle
            title="Manage Users"
            subtitle="Users Management"
            className="text-sm-left"
          />
        </Row>
        {showUpdateSuccess()}
        <Row>{showUserLists()}</Row>
      </Admin>
    </Layout>
  );
};

export default PendingUsersPage;
