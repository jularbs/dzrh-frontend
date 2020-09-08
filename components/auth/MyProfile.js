// TO ADD
//Change Password with validations
//Username field??
//show role?

import { useState, useEffect } from "react";
import { getCookie, updateUser } from "../../actions/auth";
import { getProfile, update } from "../../actions/user";

import {
  Row,
  Col,
  Card,
  CardHeader,
  Button,
  ListGroup,
  ListGroupItem,
  Form,
  FormGroup,
  FormInput,
  FormSelect,
  FormTextarea,
} from "shards-react";

const MyProfile = () => {
  const [values, setValues] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    about: "",
    error: false,
    success: false,
    loading: false,
    photoAvailable: false,
    userData: "",
    displayPhoto: "",
    displayName: "",
    previewPhoto: "",
  });

  const token = getCookie("token");

  const {
    username,
    name,
    email,
    password,
    about,
    error,
    success,
    loading,
    photoAvailable,
    userData,
    displayPhoto,
    displayName,
    previewPhoto,
  } = values;

  const init = () => {
    getProfile(token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          username: data.username,
          name: data.name,
          email: data.email,
          about: data.about,
          userData: new FormData(),
          displayName: data.name,
        });
        if (data.photo) {
          setValues({
            ...values,
            username: data.username,
            name: data.name,
            email: data.email,
            about: data.about,
            userData: new FormData(),
            displayPhoto: data.photo.link,
            photoAvailable: true,
            displayName: data.name,
            previewPhoto: data.photo.link,
          });
        }
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange = (name) => (e) => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    if (name === "photo") {
      let reader = new FileReader();
      reader.onloadend = () => {
        console.log("READER ENDED LOAD");
        setValues({ ...values, previewPhoto: reader.result });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
    userData.set(name, value);
    setValues({
      ...values,
      [name]: value,
      userData,
      success: false,
    });
  };

  const handleSubmitProfile = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true });
    update(token, userData).then((data) => {
      console.log(data);
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          success: false,
          loading: false,
        });
      } else {
        updateUser(data, () => {
          setValues({
            ...values,
            username: data.username,
            name: data.name,
            email: data.email,
            about: data.about,
            success: true,
            loading: false,
          });
          if (data.photo) {
            setValues({
              ...values,
              username: data.username,
              name: data.name,
              email: data.email,
              about: data.about,
              success: true,
              loading: false,
              displayPhoto: data.photo.link,
              photoAvailable: true,
            });
          }
        });
      }
    });
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
  };

  const showSuccess = () =>
    success && (
      <div className="alert alert-success">Profile Updated Successfully</div>
    );

  const showError = () =>
    error && <div className="alert alert-danger">{error}</div>;

  const showSpinner = () => {
    return (
      <div
        className="spinner-border spinner-border-sm ml-2"
        style={{ color: "#FBFBFB", display: loading ? "" : "none" }}
      ></div>
    );
  };

  const changePasswordForm = () => {
    return (
      <Card small className="mb-4">
        <CardHeader className="border-bottom">
          <h6 className="m-0">Change Password</h6>
        </CardHeader>
        <ListGroup flush>
          <ListGroupItem className="p-3">
            <Row>
              <Col>
                <Form>
                  <Row form>
                    <Col md="12" className="form-group">
                      <label htmlFor="fOldPassword">Old Password</label>
                      <FormInput
                        id="fOldPassword"
                        placeholder="Input Old Password"
                        type="password"
                      />
                    </Col>
                    <Col md="12" className="form-group">
                      <label htmlFor="fNewPassword">New Password</label>
                      <FormInput
                        id="fNewPassword"
                        placeholder="Input New Password"
                        type="password"
                      />
                    </Col>
                    <Col md="12" className="form-group">
                      <label htmlFor="fConfirmPass">Confirm New Password</label>
                      <FormInput
                        id="fConfirmPass"
                        placeholder="Confirm New Password"
                        type="password"
                      />
                    </Col>
                  </Row>
                  <Button onClick={handleChangePassword} theme="accent">Change Password</Button>
                </Form>
              </Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
      </Card>
    );
  };

  const showEditProfileForm = () => {
    return (
      <Card small className="mb-4">
        <CardHeader className="border-bottom">
          <h6 className="m-0">Edit Profile</h6>
        </CardHeader>
        <ListGroup flush>
          <ListGroupItem className="p-3">
            <Row>
              <Col lg="4">
                <label className="mb-4 w-100 text-center">
                  Profile Picture
                </label>
                <div className="mb-3 text-center w-100">
                  <div className="image-cropper mx-auto">
                    {previewPhoto ? (
                      <img
                        className="profile-pic"
                        src={previewPhoto}
                        alt={name}
                        width="110"
                      />
                    ) : displayPhoto ? (
                      <img
                        className="profile-pic"
                        src={displayPhoto}
                        alt={name}
                        width="110"
                      />
                    ) : (
                      <i
                        className="material-icons text-muted"
                        style={{ fontSize: "110px" }}
                      >
                        face
                      </i>
                    )}
                  </div>
                </div>
                <label className="d-table mx-auto mt-4 btn btn-white btn-sm">
                  <i className="material-icons">cloud_upload</i> Change Image
                  <input
                    onChange={handleChange("photo")}
                    type="file"
                    accept="image/*"
                    hidden
                  />
                </label>
              </Col>
              <Col lg="8">
                <Form>
                  <Row form>
                    <Col md="6" className="form-group">
                      <label htmlFor="feFirstName">Full Name</label>
                      <FormInput
                        id="feFirstName"
                        placeholder="First Name"
                        value={name}
                        onChange={handleChange("name")}
                      />
                    </Col>
                    <Col md="6" className="form-group">
                      <label htmlFor="feEmail">Email</label>
                      <FormInput
                        type="email"
                        id="feEmail"
                        placeholder="Email Address"
                        value={email}
                        onChange={handleChange("email")}
                        autoComplete="email"
                      />
                    </Col>
                  </Row>
                  <Row form>
                    <Col md="12" className="form-group">
                      <label htmlFor="feAbout">About</label>
                      <FormTextarea
                        id="feAbout"
                        rows="5"
                        value={about}
                        onChange={handleChange("about")}
                      />
                    </Col>
                  </Row>
                  <Button
                    onClick={handleSubmitProfile}
                    disabled={loading}
                    theme="accent"
                  >
                    {loading ? "Updating Profile..." : "Update Profile"}
                    {showSpinner()}
                  </Button>
                </Form>
              </Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
      </Card>
    );
  };

  return (
    <Row>
      <Col lg="12">
        {showSuccess()}
        {showError()}
      </Col>
      <Col lg="8">{showEditProfileForm()}</Col>
      <Col lg="4">{changePasswordForm()}</Col>
    </Row>
  );
};

export default MyProfile;
