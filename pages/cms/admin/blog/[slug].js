import { Container, Row, Col, Card, CardBody, CardHeader } from "shards-react";
import Layout from "../../../../layouts/Layout";
import PageTitle from "../../../../components/common/PageTitle";
import Admin from "../../../../components/auth/Admin.component";

import CreateBlog from "../../../../components/blog/CreateBlog";
import ExpBlog from "../../../../components/blog/ExpBlog";

const AdminCategoryManagement = () => {
  return (
    <Layout>
      <Admin>
        <Row noGutters className="page-header py-4">
          <PageTitle
            title="Update Article"
            subtitle="Articles Management"
            className="text-sm-left mb-3"
          />
        </Row>
        <ExpBlog />
      </Admin>
    </Layout>
  );
};

export default AdminCategoryManagement;
