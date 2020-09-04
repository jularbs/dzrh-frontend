import { Form, FormInput, FormGroup, Button } from "shards-react";
import { Container, Row, Col } from "shards-react";
import { Card, CardBody, CardFooter } from "shards-react";
import { useState } from "react";
import { signin, authenticate, isAuth } from "../../actions/auth";
import Router from "next/router";

//TO DO: Layout fix
//Fix Links
// redirext if logged on
// fix redirection place (user roles)

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    message: "",
  });

  const { email, password, error, loading, message } = values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: false });
    const user = { email, password };

    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        authenticate(data, () => {
          if (isAuth() && isAuth().role === 1) {
            Router.push(`admin/`);
          } else {
            Router.push(`user/`);
          }
        });
      }
    });
    
  };

  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : "";
  const showMessage = () =>
    message ? <div className="alert alert-info">{message}</div> : "";

  const showSpinner = () => {
    return (
      <div
        className="spinner-border spinner-border-sm ml-2"
        style={{ color: "#FBFBFB", display: loading ? "" : "none" }}
      ></div>
    );
  };

  const loginForm = () => {
    return (
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <label htmlFor="#email">Email Addess</label>
          <FormInput
            id="#email"
            placeholder="Email Address"
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
        <Button pill disabled={loading} className="d-table mt-4 mx-auto">
          {loading ? "Signing in..." : "Access Account"}
          {showSpinner()}
        </Button>
      </Form>
    );
  };

  return (
    <Container fluid className="main-content-container h-100">
      <Row className="h-100">
        <Col className="mx-auto my-auto" lg={{ size: 3 }} md={{ size: 5 }}>
          <Card>
            <CardBody
              style={{
                boxShadow: "inset 0 4px 0 0 #007bff",
                borderRadius: ".625rem",
              }}
            >
              {/* Insert logo */}
              <img
                src="../../static/images/shards-dashboards-logo.svg"
                className="d-table mb-4 mx-auto"
                alt=""
              />
              <h5 className="text-center mb-4">Access Your Account</h5>
              {showError()}
              {showMessage()}
              {loginForm()}
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
              href="createaccount"
              style={{ color: "#818ea3", textDecoration: "none" }}
            >
              Create New Account?
            </a>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Signin;
