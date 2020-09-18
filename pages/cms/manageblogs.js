// TO ADD
// TILE VIEW AND TABLE VIEW
// INFINITE SCROLLER LOAD MORE
// SHOW CATEGORY AND TAG PICKER
// Display user photo

// TRY MASONRY LAYOUT FOR CARDS

//show more

import { useState, useEffect } from "react";
import { listBlogsWithCategoriesAndTags } from "../../actions/blog";

import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Badge,
  ButtonGroup,
} from "shards-react";

import Layout from "../../layouts/Layout";
import Admin from "../../components/auth/Admin.component";
import { withRouter } from "next/router";
import Link from "next/link";

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

  const loadMoreButton = () => {
    if (size > 0 && size >= limit) {
      return (
        <Col lg="12" sm="12">
          <Card
            style={{ cursor: "pointer" }}
            className="mb-4"
            onClick={loadMore}
            
          >
            <div className="mx-auto mt-3 mb-2 text-center">
              <i
                style={{ fontSize: "30px", color: "#CACEDB" }}
                className="material-icons mr-1 mx-auto"
              >
                add_box
              </i>
              <h5>Show more</h5>
            </div>
          </Card>
        </Col>
      );
    } else {
      return (
        <Col lg="12" sm="12">
          <Card style={{ cursor: "pointer" }} className="mb-4">
            <div className="mx-auto mt-3 mb-2 text-center">
              <i
                style={{ fontSize: "30px", color: "#CACEDB" }}
                className="material-icons mr-1 mx-auto"
              >
                pending
              </i>
              <h5>No more articles to load</h5>
            </div>
          </Card>
        </Col>
      );
    }
  };

  const loadMore = () => {
    let toSkip = skip + limit;
    listBlogsWithCategoriesAndTags(toSkip, limit).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setLoadedBlogs([...loadedBlogs, ...data.blogs]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const listBlogs = () => {
    return blogs.map((post, i) => {
      return <BlogCard post={post} key={i} />;
    });
  };

  const listLoadedBlogs = () => {
    return loadedBlogs.map((post, i) => {
      return <BlogCard post={post} key={i} />;
    });
  };

  const BlogCard = ({ post }) => (
    <Col lg="6" sm="12" className="mb-4">
      <Link href={`/cms/admin/blog/${post.slug}`}>
        <div style={{ cursor: "pointer" }}>
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
              <p
                className="card-text d-inline-block mb-3"
                style={{ color: "#5A6169" }}
              >
                {post.excerpt}
              </p>
            </CardBody>
          </Card>
          <div className="border-top d-flex card-footer footer-overcard">
            <div className="card-post__author d-flex">
              <div className="image-cropper-sm mx-auto">
                {post.postedBy.photo.link ? (
                  <img
                    className="profile-pic mr-0"
                    src={post.postedBy.photo.link}
                    alt="thumb"
                  />
                ) : (
                  <i
                    className="material-icons text-muted"
                    style={{ fontSize: "2.1875rem" }}
                  >
                    face
                  </i>
                )}
              </div>
              <div className="d-flex flex-column justify-content-center ml-3">
                <span
                  className="card-post__author-name"
                  style={{ color: "#5A6169" }}
                >
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
        </div>
      </Link>
    </Col>
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
        <div className="d-flex justify-content-start">
          <ButtonGroup className="mb-4">
            <Button theme="primary">
              <i className="material-icons mr-1">view_module</i> Card View
            </Button>
            <Button theme="white">
              <i className="material-icons mr-2">list</i>List View
            </Button>
          </ButtonGroup>
        </div>

        <Row>
          {listBlogs()}
          {listLoadedBlogs()}
          {loadMoreButton()}
        </Row>
      </Admin>
    </Layout>
  );
};

ManageBlogs.getInitialProps = () => {
  let skip = 0;
  let limit = 6;
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
