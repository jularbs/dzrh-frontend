import {
  Form,
  FormInput,
  FormGroup,
  Button,
  FormCheckbox,
  Alert,
} from "shards-react";
import { Container, Row, Col } from "shards-react";
import { Card, CardBody, CardFooter } from "shards-react";
import { useState, useEffect } from "react";
import Router from "next/router";
import { signup, isauth } from "../../actions/auth";

// TO DO: Redirect if already logged in
// validations
// hide navbar and side bar

const Signin = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    passwordValidation: "",
    termscondition: false,
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  const {
    name,
    email,
    password,
    passwordValidation,
    termscondition,
    error,
    loading,
    message,
  } = values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const handleToggle = (tc) => () => {
    setValues({ ...values, termscondition: !tc });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (termscondition) {
      //check if passwords are valid
      if (password !== passwordValidation) {
        setValues({
          ...values,
          error: "Passwords do not match.",
        });
      } else {
        setValues({ ...values, loading: true, error: false });
        const user = {name, email, password};

        signup(user).then((data) => {
          if (data.error) {
            console.log(data);
            setValues({ ...values, error: data.error });
          } else {
            setValues({
              ...values,
              name: "",
              email: "",
              password: "",
              error: "",
              loading: false,
              message: data.message,
              showForm: false,
            });
          }
        });
      }
    } else {
      setValues({
        ...values,
        error: "You need to agree with the Terms and Conditions.",
      });
    }
  };

  const showError = () => {
    return (
      <Alert
        theme="warning"
        style={{
          display: error ? "" : "none",
        }}
      >
        {error}
      </Alert>
    );
  };
  const showLoading = () => {
    return (
      <Alert
        theme="info"
        style={{
          display: loading ? "" : "none",
        }}
      >
        Processing...{" "}
      </Alert>
    );
  };

  const showSpinner = () => {
    return (
      <div
        className="spinner-border spinner-border-sm ml-2"
        style={{ color: "#FBFBFB", display: loading ? "" : "none" }}
      ></div>
    );
  };

  const showMessage = () => {
    return (
      <Alert
        theme="info"
        style={{
          display: message ? "" : "none",
        }}
      >
        {message}
      </Alert>
    );
  }

  const signupForm = () => {
    return (
      <Form onSubmit={handleSubmit}>
        {/* {showLoading()} */}
        {showMessage()}
        {showError()}
        <FormGroup>
          <label htmlFor="#name">Name</label>
          <FormInput
            id="#name"
            placeholder="Full Name"
            value={name}
            onChange={handleChange("name")}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="#email">Email Address</label>
          <FormInput
            id="#email"
            placeholder="Email Address"
            type="email"
            value={email}
            onChange={handleChange("email")}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="#password">Password</label>
          <FormInput
            type="password"
            id="#password"
            placeholder="Password"
            value={password}
            onChange={handleChange("password")}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="#confirmpassword">Confirm Password</label>
          <FormInput
            type="password"
            id="#confirmpassword"
            placeholder="Confirm Password"
            value={passwordValidation}
            onChange={handleChange("passwordValidation")}
          />
        </FormGroup>
        <FormCheckbox
          id="#checkbox"
          checked={termscondition}
          onChange={handleToggle(termscondition)}
        >
          I agree with the <a href="/terms-and-conditions">Terms & Condition</a>
        </FormCheckbox>
        <Button pill disabled={loading} className="d-table mt-4 mx-auto">
          {loading ? 'Processing...' : 'Register Account'}
          {showSpinner()}
        </Button>
      </Form>
    );
  };

  return (
    <Container fluid className="main-content-container h-100">
      <Row className="h-100">
        <Col
          className="mx-auto my-auto"
          sm={{ size: 10 }}
          lg={{ size: 5 }}
          md={{ size: 10 }}
        >
          <Card>
            <CardBody
              style={{
                boxShadow: "inset 0 4px 0 0 #007bff",
                borderRadius: ".625rem",
              }}
            >
              <img
                src="../../static/images/shards-dashboards-logo.svg"
                className="d-table mb-4 mx-auto"
                alt=""
              />
              <h5 className="text-center mb-4">Register an Account</h5>
              {signupForm()}
            </CardBody>
            <CardFooter></CardFooter>
          </Card>
          <div className="mt-4 d-flex justify-content-between">
            <a
              href="/forgot-password"
              style={{ color: "#818ea3", textDecoration: "none" }}
            >
              Forgot Password?
            </a>
            <a
              href="login"
              style={{ color: "#818ea3", textDecoration: "none" }}
            >
              Sign in?
            </a>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Signin;
