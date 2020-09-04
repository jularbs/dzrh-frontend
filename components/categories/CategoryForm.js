import {
  Card,
  CardBody,
  Form,
  FormInput,
  CardHeader,
  Button,
} from "shards-react";

import { useState } from "react";

import { isAuth, getCookie } from "../../actions/auth";
import { create } from "../../actions/category";

const CategoryForm = () => {
  const [values, setValues] = useState({
    name: "",
    success: "",
    error: "",
    loading: "",
  });
  const token = getCookie("token");

  const { name, error, success, loading } = values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
    console.log(values.name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true });
    create({ name }, token).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          loading: false,
          error: data.error,
          success: false,
        });
      } else {
        setValues({
          ...values,
          loading: false,
          error: false,
          success: true,
          name: "",
        });
      }
    });
  };

  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : "";
  const showSpinner = () => {
    return (
      <div
        className="spinner-border spinner-border-sm ml-2"
        style={{ color: "#FBFBFB", display: loading ? "" : "none" }}
      ></div>
    );
  };

  const showSuccess = () =>
    success ? (
      <div className="alert alert-info">Category created successfully.</div>
    ) : (
      ""
    );

  return (
    <Card small className="mb-3">
      <CardHeader className="border-bottom">
        <h6 className="m-0">Add new category</h6>
      </CardHeader>
      <CardBody>
        {showError()}
        {showSuccess()}
        <Form className="add-new-post" onSubmit={handleSubmit}>
          <FormInput
            size="lg"
            className="mb-3"
            placeholder="Name"
            onChange={handleChange("name")}
            value={name}
          />
          <Button size="sm" className="float-right">
            Add
            {showSpinner()}
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};

export default CategoryForm;
