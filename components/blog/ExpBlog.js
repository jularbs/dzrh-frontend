import { Row, Col } from "shards-react";
import rs from "text-readability";
import { Editor } from "@tinymce/tinymce-react";
import { editorModules } from "../../helpers/tinymce";

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
import { getCookie, isAuth } from "../../actions/auth";
import { withRouter } from "next/router";

import { getTags } from "../../actions/tag";
import { getCategories } from "../../actions/category";
import { create, singleBlog, updateBlog } from "../../actions/blog";

const CreateBlog = ({ router }) => {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const [checkedCategories, setCheckedCategories] = useState([]);
  const [checkedTags, setCheckedTags] = useState([]);

  const [status, setStatus] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [photo, setPhoto] = useState("");

  const [updating, setUpdating] = useState(false);
  const [values, setValues] = useState({
    error: "",
    success: "",
    loading: "",
    rsScore: "",
    previewImage: "",
    author: "",
  });

  const { error, success, loading, previewImage, author } = values;

  const token = getCookie("token");

  useEffect(() => {
    initTags();
    initCategories();
    initBlog();
  }, [router]);

  const initBlog = () => {
    setValues({ ...values, author: isAuth().name });
    if (router.query.slug) {
      singleBlog(router.query.slug).then((data) => {
        console.log(data);
        if (data) {
          if (data.error) {
            setValues({ ...values, error: data.error });
          }

          setValues({
            ...values,
            previewImage: data.photo.link,
            author: data.postedBy.name,
          });
          setStatus(data.status);
          setTitle(data.title);
          setBody(data.body);
          setCategoriesArray(data.categories);
          setTagsArray(data.tags);
          setUpdating(true);
        } else {
          setValues({ ...values, error: "No article found" });
        }
      });
    }
  };

  const setCategoriesArray = (blogCats) => {
    let cat = [];

    blogCats.map((c, i) => {
      cat.push(c._id);
    });
    setCheckedCategories(cat);
  };

  const setTagsArray = (blogTags) => {
    let ta = [];

    blogTags.map((t, i) => {
      ta.push(t._id);
    });
    setCheckedTags(ta);
  };

  const findOutCategory = (id) => {
    const result = checkedCategories.indexOf(id);
    if (result !== -1) {
      return true;
    } else {
      return false;
    }
  };

  const findOutTag = (id) => {
    const result = checkedTags.indexOf(id);
    if (result !== -1) {
      return true;
    } else {
      return false;
    }
  };

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
                <strong className="mr-1">Status:</strong> {status}
              </span>
              <span className="d-flex mb-2">
                <i className="material-icons mr-1">create</i>
                <strong className="mr-1">Author:</strong>{" "}
                <strong>{author}</strong>
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
                  {rs.fleschReadingEase(body.replace(/(<([^>]+)>)/gi, ""))}
                </strong>
              </span>
            </ListGroupItem>
            <ListGroupItem className="d-flex px-3 border-0">
              <Button
                outline
                theme="accent"
                size="sm"
                onClick={handleSubmit("draft")}
              >
                <i className="material-icons">save</i>{" "}
                {loading ? "Processing..." : "Save as draft"} 
                {showSpinner()}
              </Button>
              <Button
                theme="accent"
                type="submit"
                size="sm"
                className="ml-auto"
                onClick={handleSubmit("published")}
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
    if (previewImage)
      return <img src={previewImage} alt="" style={{ width: "100%" }} />;
    else
      return (
        <div className="mb-2 mt-2 text-center mx-auto">No photo selected.</div>
      );
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
          checked={findOutCategory(c._id)}
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
          checked={findOutTag(t._id)}
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
  };

  const handleSubmit = (status) => (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true });
    var data = new FormData();
    data.set("status", status);
    data.set("title", title);

    if (photo) data.set("photo", photo, "blogfi" + new Date().getTime());
    data.set("body", body);
    data.set("categories", checkedCategories);
    data.set("tags", checkedTags);

    if (updating) {
      updateBlog(data, token, router.query.slug).then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setStatus(data.status);
          setValues({
            ...values,
            success: `Blog titled ${data.title} is successfully updated`,
            error: "",
            previewImage: data.photo.link,
            loading: "",
          });
        }
      });
    } else {
      create(data, token).then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          setValues({
            ...values,
            error: "",
            success: `A new blog titled "${data.title}" is created.`,
            loading: false,
            previewImage: "",
          });
          setTitle("");
          setBody("");
          setPhoto("");
          setUpdating(false);
          setCheckedTags([]);
          setCheckedCategories([]);
        }
      });
    }
  };

  const handleEditorChange = (e) => {
    setBody(e.target.getContent());
    setValues({
      ...values,
      error: "",
    });
  };

  const showTinyMce = () => {
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
          <Editor
            init={editorModules}
            onChange={handleEditorChange}
            value={body}
          />
        </CardBody>
      </Card>
    );
  };

  const handleChange = (name) => (e) => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    if (name === "photo") {
      if (e.target.files[0]) {
        setPhoto(value);
        let reader = new FileReader();
        reader.onloadend = () => {
          setValues({ ...values, previewImage: reader.result });
        };
        reader.readAsDataURL(e.target.files[0]);
        console.log("FILE PICKER SUCCESS");
      }
    }

    if (name === "title") setTitle(value);
    setValues({ ...values, error: "" });
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
        {showTinyMce()}
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
