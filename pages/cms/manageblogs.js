// TO ADD
// TILE VIEW AND TABLE VIEW
// INFINITE SCROLLER LOAD MORE
// SHOW CATEGORY AND TAG PICKER
// Display user photo

//TRY MASONRY LAYOUT FOR CARDS

import { useState, useEffect } from "react";
import { listBlogsWithCategoriesAndTags } from "../../actions/blog";

import { Row, Col, Card, CardBody, Button, Badge } from "shards-react";

import Layout from "../../layouts/Layout";
import Admin from "../../components/auth/Admin.component";
import { withRouter } from "next/router";
import Link from "next/link";

import TagList from "../../components/tags/TagList";
import CategoryList from "../../components/categories/CategoryList";

import PageTitle from "../../components/common/PageTitle";
import moment from "moment";

const ManageBlogs = ({
  blogs,
  categories,
  tags,
  totalBlogs,
  blogsLimit,
  blogsSkip,
  router,
}) => {
  const [skip, setSkip] = useState(blogsSkip);
  const [limit, setLimit] = useState(blogsLimit);
  const [size, setSize] = useState(totalBlogs);
  const [loadedBlogs, setLoadedBlogs] = useState([]);

  const time = (t) => {
    const index = t.indexOf("T");
    const date = t.slice(0, index);
    const now = moment();
    const display = moment(t)
      .add(2, "days")
      .endOf("day");

    if (now.isAfter(display))
      return <div>{moment(date).format("DD MMMM YYYY")}</div>;
    else return <div>{moment(t).fromNow()}</div>;
  };

  const listBlogs = () => (
    <Row>
      {blogs.map((post, idx) => (
        <Col lg="6" sm="12" className="mb-4" key={idx}>
          <Link href={`/cms/admin/blog/${post.slug}`}>
            <a>
              <Card
                small
                className="card-post card-post--aside card-post--1"
                style={{
                  borderBottomRightRadius: "0",
                  borderBottomLeftRadius: "0",
                  zIndex: "-1",
                }}
              >
                <div
                  className="card-post__image"
                  style={{
                    backgroundImage: `url('${post.photo.link}')`,
                    borderBottomLeftRadius: "0",
                  }}
                >
                  <Badge
                    pill
                    className={`card-post__category bg-${post.categoryTheme}`}
                  >
                    {post.categories[0].name}
                  </Badge>
                </div>
                <CardBody>
                  <h5 className="card-title">
                    <a className="text-fiord-blue" href="#">
                      {post.title}
                    </a>
                  </h5>
                  <p className="card-text d-inline-block mb-3">
                    {post.excerpt}
                  </p>
                </CardBody>
              </Card>
              <div
                className="border-top d-flex card-footer"
                style={{
                  boxShadow: `0 2px 0 rgba(90, 97, 105, 0.11), 
                 0 4px 8px rgba(90, 97, 105, 0.12), 
                 0 10px 10px rgba(90, 97, 105, 0.06), 
                 0 7px 70px rgba(90, 97, 105, 0.1)`,
                  // backgroundColor: "#fff",
                  zIndex: "1",
                }}
              >
                <div className="card-post__author d-flex">
                  <img
                    className="card-post__author-avatar card-post__author-avatar--small"
                    src="../../static/images/avatars/0.jpg"
                    loading="lazy"
                  />
                  <div className="d-flex flex-column justify-content-center ml-3">
                    <span className="card-post__author-name">
                      {post.postedBy.name}
                    </span>
                    <small className="text-muted">{time(post.updatedAt)}</small>
                  </div>
                </div>
                <div className="my-auto ml-auto">
                  <Button size="sm" theme="primary">
                    Published
                  </Button>
                </div>
              </div>
            </a>
          </Link>
        </Col>
      ))}
      <Col lg="6" sm="12">
        <Card style={{ cursor: "pointer" }} className="mb-4">
          <div className="mx-auto mt-5 mb-5 text-center">
            <i
              style={{ fontSize: "80px", color: "#CACEDB" }}
              className="material-icons mr-1 mx-auto"
            >
              add_box
            </i>
            <h5>Show more blogs...</h5>
          </div>
        </Card>
      </Col>
    </Row>
  );

  return (
    <Layout>
      <Admin>
        <Row noGutters className="page-header py-4">
          <PageTitle
            title="Articles Management"
            subtitle="Articles"
            className="text-sm-left mb-3"
          />
        </Row>
        <Row>
          <Col lg="12" sm="12">
            {listBlogs()}
          </Col>
        </Row>
      </Admin>
    </Layout>
  );
};

ManageBlogs.getInitialProps = () => {
  let skip = 0;
  let limit = 2;
  return listBlogsWithCategoriesAndTags(skip, limit).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        blogs: data.blogs,
        categories: data.categories,
        tags: data.tags,
        totalBlogs: data.size,
        blogsLimit: limit,
        blogsSkip: skip,
      };
    }
  });
};

export default withRouter(ManageBlogs);
