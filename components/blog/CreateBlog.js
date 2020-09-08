// TO DO:

// ABUSE TEST ON CHECKBOX SOMETIEMS BUGGY
// CONVERT CATEGORIES TO RADIO BUTTON

// ADD IMAGE ON RICH EDITOR
// DECIDE ON SEO SETTINGS >> WILL AFFECT BACKEND

// UI for long category/tag list
// Action handler for add category and tag

// LocalStorage Handler

import { Row, Col } from "shards-react";
import rs from "text-readability";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "../../node_modules/react-quill/dist/quill.snow.css";

import {
  CardHeader,
  FormTextarea,
  ListGroup,
  ListGroupItem,
  FormCheckbox,
  Card,
  CardBody,
  Form,
  FormInput,
  Button,
  InputGroup,
  InputGroupAddon,
} from "shards-react";

import { useState, useEffect } from "react";
import { getCookie } from "../../actions/auth";
import { withRouter } from "next/router";

import { getTags } from "../../actions/tag";
import { getCategories } from "../../actions/category";
import { create } from "../../actions/blog";

import { Quillmodules, Quillformats } from "../../utils/quill";

const CreateBlog = ({ router }) => {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const [checkedCategories, setCheckedCategories] = useState([]);
  const [checkedTags, setCheckedTags] = useState([]);

  const [body, setBody] = useState([]);

  const [values, setValues] = useState({
    error: "",
    success: "",
    loading: "",
    title: "",
    formData: "",
    rsScore: "",
    previewImage: "",
  });

  const {
    error,
    success,
    loading,
    title,
    formData,
    rsScore,
    previewImage,
  } = values;

  const token = getCookie("token");

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initTags();
    initCategories();
  }, [router]);

  const initTags = () => {
    getTags().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setTags(data);
      }
    });
  };

  const initCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setCategories(data);
      }
    });
  };

  const showEditor = () => {
    return (
      <Card small className="mb-3">
        <CardBody>
          <FormInput
            onChange={handleChange("title")}
            value={title}
            size="lg"
            className="mb-3"
            placeholder="Your Post Title"
          />
          <ReactQuill
            className="add-new-post__editor mb-1"
            placeholder="Type something amazing..."
            onChange={handleBody}
            value={body}
            modules={Quillmodules}
            formats={Quillformats}
          />
        </CardBody>
      </Card>
    );
  };

  const showSEO = () => {
    return (
      <Card small className="mb-3">
        <CardHeader className="border-bottom">
          <h6 className="m-0">Search Engine Optimization</h6>
        </CardHeader>
        <CardBody>
          <Form className="add-new-post">
            <FormInput size="lg" className="mb-3" placeholder="SEO Title" />
            <FormInput size="lg" className="mb-3" placeholder="SEO Slug" />
            <FormTextarea rows="10" placeholder="SEO Description" />
            <ListGroup flush>
              <ListGroupItem className="px-3 pb-2">
                <FormCheckbox
                  name="include_image"
                  className="mb-1"
                  value="image"
                  defaultChecked
                >
                  Display Featured Image on Search
                </FormCheckbox>
                <FormCheckbox
                  name="view as article"
                  className="mb-1"
                  value="article"
                  defaultChecked
                >
                  View as Article
                </FormCheckbox>
              </ListGroupItem>
            </ListGroup>
          </Form>
        </CardBody>
      </Card>
    );
  };

  const showActions = () => {
    return (
      <Card small className="mb-3">
        <CardHeader className="border-bottom">
          <h6 className="m-0">Actions</h6>
        </CardHeader>
        <CardBody className="p-0">
          <ListGroup flush>
            <ListGroupItem className="p-3">
              <span className="d-flex mb-2">
                <i className="material-icons mr-1">flag</i>
                <strong className="mr-1">Status:</strong> Draft{" "}
                <a className="ml-auto" href="#">
                  Edit
                </a>
              </span>
              <span className="d-flex mb-2">
                <i className="material-icons mr-1">visibility</i>
                <strong className="mr-1">Visibility:</strong>{" "}
                <strong className="text-success">Public</strong>{" "}
                <a className="ml-auto" href="#">
                  Edit
                </a>
              </span>
              <span className="d-flex mb-2">
                <i className="material-icons mr-1">calendar_today</i>
                <strong className="mr-1">Schedule:</strong> Now{" "}
                <a className="ml-auto" href="#">
                  Edit
                </a>
              </span>
              <span className="d-flex">
                <i className="material-icons mr-1">score</i>
                <strong className="mr-1">Readability:</strong>{" "}
                <strong className="text-warning">
                  {rs.fleschReadingEase(body.toString())}
                </strong>
              </span>
            </ListGroupItem>
            <ListGroupItem className="d-flex px-3 border-0">
              <Button outline theme="accent" size="sm">
                <i className="material-icons">save</i> Save Draft
              </Button>
              <Button
                theme="accent"
                disabled={loading}
                type="submit"
                size="sm"
                className="ml-auto"
                onClick={handleSubmit}
              >
                <i className="material-icons">file_copy</i>{" "}
                {loading ? "Processing..." : "Publish"}
                {showSpinner()}
              </Button>
            </ListGroupItem>
          </ListGroup>
        </CardBody>
      </Card>
    );
  };

  const previewImageContainer = () => {
    if (previewImage) return <img src={previewImage} alt="" style={{width:"100%"}}/>;
    else return <div className="mb-2 mt-2 text-center mx-auto">No photo selected.</div>;
  };
  const showFeaturedImage = () => {
    return (
      <Card small className="mb-3">
        <CardHeader className="border-bottom">
          <h6 className="m-0">Featured Photo</h6>
        </CardHeader>

        <CardBody className="p-0">
          {previewImageContainer()}
          <ListGroupItem className="d-flex px-3 border-0">
            {/* <div className="align-items-center"> */}
            <label className="btn ml-auto btn-primary">
              <i className="material-icons">insert_photo</i> Choose File
              <input
                onChange={handleChange("photo")}
                type="file"
                accept="image/*"
                hidden
              />
            </label>
            {/* <span className="mt-1 mb-1">Max File Size: 1 MB</span> */}
            {/* </div> */}
          </ListGroupItem>
        </CardBody>
      </Card>
    );
  };

  const categoriesList = () => {
    return (
      categories &&
      categories.map((c, i) => (
        <FormCheckbox
          key={i}
          onClick={handleCategoryToggle(c._id)}
          className="mb-1"
          value={c._id}
        >
          {c.name}
        </FormCheckbox>
      ))
    );
  };
  const showCategories = () => {
    return (
      <Card small className="mb-3">
        <CardHeader className="border-bottom">
          <h6 className="m-0">Category</h6>
        </CardHeader>
        <CardBody className="p-0">
          <ListGroup flush>
            <ListGroupItem className="px-3 pb-2">
              {categoriesList()}
            </ListGroupItem>
            <ListGroupItem className="d-flex px-3">
              <InputGroup className="ml-auto">
                <FormInput placeholder="New category" />
                <InputGroupAddon type="append">
                  <Button theme="white" className="px-2">
                    <i className="material-icons">add</i>
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </ListGroupItem>
          </ListGroup>
        </CardBody>
      </Card>
    );
  };
  const handleCategoryToggle = (c) => () => {
    setValues({ ...values, error: "" });
    const all = [...checkedCategories];
    const clickedCategory = checkedCategories.indexOf(c);

    if (clickedCategory === -1) {
      all.push(c);
    } else {
      all.splice(clickedCategory, 1);
    }
    setCheckedCategories(all);
    formData.set("categories", all);
  };

  const tagList = () => {
    return (
      tags &&
      tags.map((t, i) => (
        <FormCheckbox
          key={i}
          onClick={handleTagToggle(t._id)}
          className="mb-1"
          value={t.id}
        >
          {t.name}
        </FormCheckbox>
      ))
    );
  };
  const showTags = () => {
    return (
      <Card small className="mb-3">
        <CardHeader className="border-bottom">
          <h6 className="m-0">Tags</h6>
        </CardHeader>
        <CardBody className="p-0">
          <ListGroup flush>
            <ListGroupItem className="px-3 pb-2">{tagList()}</ListGroupItem>

            <ListGroupItem className="d-flex px-3">
              <InputGroup className="ml-auto">
                <FormInput placeholder="New Tag" />
                <InputGroupAddon type="append">
                  <Button theme="white" className="px-2">
                    <i className="material-icons">add</i>
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </ListGroupItem>
          </ListGroup>
        </CardBody>
      </Card>
    );
  };
  const handleTagToggle = (t) => () => {
    setValues({ ...values, error: "" });

    const all = [...checkedTags];
    const clickedTag = checkedTags.indexOf(t);

    if (clickedTag === -1) {
      all.push(t);
    } else {
      all.splice(clickedTag, 1);
    }

    setCheckedTags(all);
    formData.set("tags", all);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true });
    create(formData, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        setValues({
          ...values,
          title: "",
          error: "",
          success: `A new blog titled "${data.title}" is created.`,
          loading: false,
        });
        setBody("");
        setCategories([]);
        setTags([]);
      }
    });
  };

  const handleBody = (e) => {
    setBody(e);
    formData.set("body", e);
    setValues({
      ...values,
      rsScore: rs.fleschReadingEase(body.toString()),
      error: "",
    });

    // if (typeof window !== "undefined") {
    //   localStorage.setItem("blog", JSON.stringify(e));
    // }
  };
  const handleChange = (name) => (e) => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    if (name === "photo") {
      let reader = new FileReader();
      reader.onloadend = () => {
        console.log("READER ENDED LOAD");
        setValues({ ...values, previewImage: reader.result });
      };
      reader.readAsDataURL(e.target.files[0]);
    }

    formData.set(name, value);
    setValues({ ...values, [name]: value, formData, error: "" });
  };

  const showSuccess = () =>
    success && (
      <div style={{ borderRadius: ".25rem" }} className="alert alert-success">
        {success}
      </div>
    );

  const showError = () =>
    error && (
      <div style={{ borderRadius: ".25rem" }} className="alert alert-warning">
        {error}
      </div>
    );

  const showSpinner = () => {
    return (
      <div
        className="spinner-border spinner-border-sm ml-2"
        style={{ color: "#FBFBFB", display: loading ? "" : "none" }}
      ></div>
    );
  };
  return (
    <Row>
      <Col lg="9" md="12">
        {showSuccess()}
        {showError()}
        {showEditor()}
        {showSEO()}
      </Col>
      <Col lg="3" md="12">
        {showActions()}
        {showFeaturedImage()}
        {showCategories()}
        {showTags()}
      </Col>
    </Row>
  );
};

export default withRouter(CreateBlog);
