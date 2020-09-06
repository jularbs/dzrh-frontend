import { Row } from "shards-react";

import Layout from "../../../layouts/Layout";
import Admin from "../../../components/auth/Admin.component";

import PageTitle from "../../../components/common/PageTitle";
import CreateBlog from "../../../components/blog/CreateBlog";

const CreateArticle = () => {
  return (
    <Layout>
      <Admin>
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Add New Article"
            subtitle="Articles"
            className="text-sm-left"
          />
        </Row>
        <CreateBlog />
      </Admin>
    </Layout>
  );
};

export default CreateArticle;
