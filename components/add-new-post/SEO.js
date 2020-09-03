import React from "react";
import ReactQuill from "react-quill";
import { Card, CardBody, Form, FormInput, CardHeader, FormTextarea, FormRadio, ListGroup, ListGroupItem, FormCheckbox } from "shards-react";

const SEO = () => (
  <Card small className="mb-3">
    <CardHeader className="border-bottom">
      <h6 className="m-0">Search Engine Optimization</h6>
    </CardHeader>
    <CardBody>
      <Form className="add-new-post">
        <FormInput size="lg" className="mb-3" placeholder="SEO Title" />
        <FormInput size="lg" className="mb-3" placeholder="SEO Slug" />
        <FormTextarea rows="10" placeholder="SEO Description"/>
        <ListGroup flush>
          <ListGroupItem className="px-3 pb-2">
            <FormCheckbox name="include_image" className="mb-1" value="image" defaultChecked>
                Display Featured Image on Search
            </FormCheckbox>
            <FormCheckbox name="view as article" className="mb-1" value="article" defaultChecked>
                View as Article
            </FormCheckbox>
          </ListGroupItem>
         </ListGroup>
      </Form>
    </CardBody>
  </Card>
);

export default SEO;
