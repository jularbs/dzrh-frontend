import React from "react";
import { Card, CardBody, Form, FormInput, CardHeader, Button } from "shards-react";

const VideoForm = () => (
  <Card small className="mb-3">
    <CardHeader className="border-bottom">
      <h6 className="m-0">Video Livestream URL</h6>
    </CardHeader>
    <CardBody>
      <Form className="add-new-post">
        <FormInput size="lg" className="mb-3" placeholder="URL" />
        <Button size="sm" className="float-right">Update</Button>
      </Form>
    </CardBody>
  </Card>
);

export default VideoForm;
