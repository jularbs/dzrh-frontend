// TO DO:
// form validation
// show parent dropdown? on tag
//lazy load articles limit 10?
// overflow-y scroll on tag list?


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

import moment from "moment";

import { useState, useEffect } from "react";

import { getCookie } from "../../../../actions/auth";

import {
  create,
  singeCategory,
  getCategories,
  singleCategory,
} from "../../../../actions/category";

const AdminCategoryManagement = () => {
  const [chosen, setChosen] = useState("");
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);

  const [values, setValues] = useState({
    error: "",
    message: "",
    reload: "",
    loading: "",
    name: "",
    loadingArticles: "",
  });

  const token = getCookie("token");

  const { name, error, success, loading, loadingArticles } = values;

  const init = () => {
    getCategories().then((data) => {
      if (data.error) setValues({ ...values, error: data.error });
      setCategories(data);
    });
  };

  useEffect(() => {
    init();
  }, []);

  const listCategories = () =>
    categories &&
    categories.map((c, i) => (
      <tr
        key={i}
        className={chosen === c.slug ? "active__list" : "card__list--item"}
        onClick={getArticles(c.slug)}
      >
        <td>{c.name}</td>
        <td>
          <i className="material-icons float-right text-muted">
            arrow_forward_ios
          </i>
        </td>
      </tr>
    ));

  const getArticles = (slug) => (e) => {
    setValues({ ...values, loadingArticles: true });
    setChosen(slug);
    setArticles([]);
    singleCategory(slug).then((data) => {
      //TO DO: this returns blogs, and tags. decide if you should emit tags ( backend/controllers/tag/read )
      setArticles(data.blogs);
      setValues({ ...values, loadingArticles: false });
    });
  };

  const showCategories = () => {
    return (
      <Card small className="mb-4">
        <CardHeader className="border-bottom">
          <h6 className="m-0">Category List</h6>
        </CardHeader>
        <CardBody className="p-0 pb-3">
          <table className="table mb-0">
            <thead className="bg-light">
              <tr>
                <th scope="col" className="border-0">
                  Category Name
                </th>
                <th scope="col" className="border-0"></th>
              </tr>
            </thead>
            <tbody>{listCategories()}</tbody>
          </table>
        </CardBody>
      </Card>
    );
  };

  const showArticleItem = () => {
    return (
      articles &&
      articles.map((a, i) => (
        <tr key={i}>
          <td>{a.title}</td>
          <td>{a.postedBy.name}</td>
          <td>{moment(a.createdAt).fromNow()}</td>
          <td>Published</td>
        </tr>
      ))
    );
  };

  const showArticleList = () => {
    return (
      <Card small className="mb-4">
        <CardHeader className="border-bottom">
          <h6 className="m-0">Article List</h6>
        </CardHeader>
        <CardBody className="p-0 pb-3">
          {articles.length > 0 ? (
            <table className="table mb-0">
              <thead className="bg-light">
                <tr>
                  <th scope="col" className="border-0">
                    Title
                  </th>
                  <th scope="col" className="border-0">
                    Author
                  </th>
                  <th scope="col" className="border-0">
                    Publish Date
                  </th>
                  <th scope="col" className="border-0">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>{showArticleItem()}</tbody>
            </table>
          ) : (
            <div className=" d-flex text-center justify-content-center align-center mt-3">
              <div
                className="spinner-border mr-2 text-muted"
                style={{ display: loadingArticles ? "" : "none" }}
              ></div>
              <span className="align-self-center text-strong">
                {chosen
                  ? loadingArticles
                    ? "Loading Articles..."
                    : "There are 0 Articles for this category"
                  : "Pick a category to show articles"}
              </span>
            </div>
          )}
        </CardBody>
      </Card>
    );
  };

  const handleChange = (name) => (e) => {
    setValues({
      ...values,
      error: false,
      success: false,
      [name]: e.target.value,
    });
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
        setCategories(data);
      }
    });
  };

  const showCategoryForm = () => {
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
    <Layout>
      <Admin>
        <Row noGutters className="page-header py-4">
          <PageTitle
            title="Categories Management"
            subtitle="Articles"
            className="text-sm-left mb-3"
          />
        </Row>
        <Row>
          <Col lg="4" md="6" sm="12">
            {showCategoryForm()}
            {showCategories()}
          </Col>
          <Col lg="8" md="6" sm="12">
            {showArticleList()}
          </Col>
        </Row>
      </Admin>
    </Layout>
  );
};

export default AdminCategoryManagement;
