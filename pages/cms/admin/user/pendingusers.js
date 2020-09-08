// TO DO
// HANDLE LOADING
// test if accepted users can log in


import Layout from "../../../../layouts/Layout";
import Admin from "../../../../components/auth/Admin.component";
import PageTitle from "../../../../components/common/PageTitle";
import { Col, Row, Card, CardBody, Button } from "shards-react";

import { listPending, acceptUser, declineUser } from "../../../../actions/user";
import { getCookie } from "../../../../actions/auth";

import { useState, useEffect } from "react";

import moment from "moment";

const PendingUsersPage = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [values, setValues] = useState({
    error: "",
    message: "",
    loading: "",
    success: "",
  });

  const { error, success, loading, message } = values;

  const token = getCookie("token");

  const init = () => {
    listPending(token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      }
      setPendingUsers(data);
    });
  };

  useEffect(() => {
    init();
  }, []);

  const showListPendingUsers = () =>
    pendingUsers &&
    pendingUsers.map((pu, i) => (
      <tr className="text-center" key={i}>
        <td className="align-middle">{pu.name}</td>
        <td className="align-middle">{pu.email}</td>

        <td className="align-middle d-none d-sm-table-cell">
          {moment(pu.createdAt).fromNow()}
        </td>
        <td>
          <Button
            theme="danger"
            className="mr-2"
            onClick={handleDecline(pu._id)}
          >
            <i className="material-icons" style={{ fontSize: "18px" }}>
              close
            </i>
          </Button>
          <Button theme="success" onClick={handleAccept(pu._id)}>
            <i className="material-icons" style={{ fontSize: "18px" }}>
              check
            </i>
          </Button>
        </td>
      </tr>
    ));

  const handleAccept = (_id) => (e) => {
    e.preventDefault();
    acceptUser(token, { _id }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.errer });
      }

      setPendingUsers(data);
      setValues({ ...values, success: true, error: false, message: false });
    });
  };

  const handleDecline = (_id) => (e) => {
    e.preventDefault();
    declineUser(token, { _id }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      }

      setPendingUsers(data);
      setValues({
        ...values,
        message: "User registration has been declined for access.",
        success: false,
        error: false,
      });
    });
  };

  const showSuccess = () =>
    success && (
      <div className="alert alert-success">
        User successfully accepted. User can now login.
      </div>
    );

  const showError = () =>
    error && <div className="alert alert-success">{error}</div>;

  const showMessage = () =>
    message && <div className="alert alert-warning">{message}</div>;

  return (
    <Layout>
      <Admin>
        <Row noGutters className="page-header py-4">
          <PageTitle
            title="Pending Users"
            subtitle="Users Management"
            className="text-sm-left"
          />
        </Row>
        {showMessage()}
        {showSuccess()}
        {showError()}
        <Row>
          <Col lg="8" md="12" sm="12" className="mx-auto">
            <Card style={{ overflow: "hidden" }}>
              <CardBody className="p-0 pt-2 pb-3">
                {pendingUsers.length == 0 ? (
                  <h3 className="pt-3 pb-3 text-center">No Pending Users</h3>
                ) : (
                  ""
                )}
                <table
                  className="table mb-0"
                  style={{ borderRadius: ".625rem" }}
                >
                  <thead className="bg-light">
                    <tr>
                      <th scope="col" className="border-0 text-center">
                        Name
                      </th>
                      <th scope="col" className="border-0 text-center">
                        Email
                      </th>
                      <th
                        scope="col"
                        className="border-0 text-center	d-none d-sm-block"
                      >
                        Registration Date
                      </th>
                      <th scope="col" className="border-0 text-center"></th>
                    </tr>
                  </thead>
                  <tbody>{showListPendingUsers()}</tbody>
                </table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Admin>
    </Layout>
  );
};

export default PendingUsersPage;
