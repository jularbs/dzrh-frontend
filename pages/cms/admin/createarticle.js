import { Row } from "shards-react";

import Layout from "../../../layouts/Layout";
import Admin from "../../../components/auth/Admin.component";

import PageTitle from "../../../components/common/PageTitle";
import CreateBlog from "../../../components/blog/CreateBlog";
import ExpBlog from "../../../components/blog/ExpBlog";

const CreateArticle = () => {
  return (
    <Layout>
      <Admin>
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Add New Article"
            subtitle="Articles Management"
            className="text-sm-left"
          />
        </Row>
        <ExpBlog />
      </Admin>
    </Layout>
  );
};

export default CreateArticle;
