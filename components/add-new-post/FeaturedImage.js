/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  ListGroupItem
} from "shards-react";
//import Image from "../../images/content-management/1.jpeg";

const FeaturedImage = ({ title }) => (
  <Card small className="mb-3">
    <CardHeader className="border-bottom">
      <h6 className="m-0">{title}</h6>
    </CardHeader>

    <CardBody className="p-0">
      <div
        className="card-post__image"
        style = {
          {
            backgroundImage: {Image}
          }
        }
      / >
      <ListGroupItem className="d-flex px-3 border-0">
          {/* <Button outline theme="accent" size="sm">
            <i className="material-icons">save</i> Save Image
          </Button> */}
          <Button theme="accent" size="sm" className="ml-auto">
            <i className="material-icons">file_copy</i> Upload
          </Button>
        </ListGroupItem>
    </CardBody>
  </Card>
);

FeaturedImage.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

FeaturedImage.defaultProps = {
  title: "Featured Image"
};

export default FeaturedImage;
