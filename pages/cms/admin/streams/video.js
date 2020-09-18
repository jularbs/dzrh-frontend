//TO DO:
//visibility option
//form sanitize?
//autoplay?
// loading state

import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Form,
  FormInput,
  Button,
} from "shards-react";
import Layout from "../../../../layouts/Layout";
import PageTitle from "../../../../components/common/PageTitle";
import Admin from "../../../../components/auth/Admin.component";
import { VIDEO_STREAMING_URL } from "../../../../helpers/constants";
import ReactPlayer from "react-player";
import { getCookie } from "../../../../actions/auth";

import { useState, useEffect } from "react";
import { create, read, update } from "../../../../actions/option";

const VideoStreamingPage = () => {
  const [url, setUrl] = useState("");
  const [values, setValues] = useState({
    error: "",
    loading: "",
    success: "",
    message: "",
  });

  const { error, loading, success, message } = values;

  const token = getCookie("token");

  const init = () => {
    read(VIDEO_STREAMING_URL).then((data) => {
      if (!data) {
        setValues({ ...values, error: "No data found" });
      }

      if (data) {
        if (data.error) {
          setValues({ ...values, error: data.error });
        }

        setUrl(data.value);
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange = (name) => (e) => {
    setValues({
      ...values,
      error: false,
      success: false,
      loading: false,
      massage: false,
    });
    setUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //show loading
    update({ key: VIDEO_STREAMING_URL, value: url }, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      }
      setValues({ ...values, success: true });
      setUrl(data.value);
    });
  };

  const showError = () =>
    error && <div className="alert alert-danger">{error}</div>;

  const showSuccess = () =>
    success && (
      <div className="alert alert-success">
        "Video Livestream URL updated successfully."
      </div>
    );

  const showVideoStreamForm = () => {
    return (
      <Card small className="mb-3">
        <CardHeader className="border-bottom">
          <h6 className="m-0">Manage Video Livestreaming</h6>
        </CardHeader>
        <CardBody>
          {showError()}
          {showSuccess()}
          <Form className="add-new-post">
            <FormInput
              size="lg"
              className="mb-3"
              placeholder="e.g. https://www.youtube.com/watch?v=ysz5S6PUM-U"
              value={url}
              onChange={handleChange("url")}
            />
            <Button size="sm" className="float-right" onClick={handleSubmit}>
              Update
            </Button>
          </Form>
        </CardBody>
      </Card>
    );
  };

  return (
    <Layout>
      <Admin>
        <Row noGutters className="page-header py-4">
          <PageTitle
            title="Video Livestream"
            subtitle="Streams Management"
            className="text-sm-left mb-3"
          />
        </Row>
        <Row>
          <Col lg="4" md="12" sm="12">
            {showVideoStreamForm()}
          </Col>
          <Col lg="8" md="12" sm="12">
            <div className="d-flex justify-content-center">
              <ReactPlayer url={url} />
            </div>
          </Col>
        </Row>
      </Admin>
    </Layout>
  );
};

export default VideoStreamingPage;
