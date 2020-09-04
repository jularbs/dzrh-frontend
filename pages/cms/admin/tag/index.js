import { Container, Row, Col } from "shards-react";
import Layout from "../../../../layouts/Layout";
import PageTitle from "../../../../components/common/PageTitle";
import Admin from "../../../../components/auth/Admin.component";

import TagForm from "../../../../components/tags/TagForm";
import TagList from "../../../../components/tags/TagList";

const AdminTagManagement = () => {
  return (
    <Layout>
      <Admin>
        <Row noGutters className="page-header py-4">
          <PageTitle
            title="Tags Management"
            subtitle="Articles"
            className="text-sm-left mb-3"
          />
        </Row>
        <Row>
          <Col lg="4" md="6" sm="12">
            <TagForm />
            <TagList />
          </Col>
        </Row>
      </Admin>
    </Layout>
  );
};

export default AdminTagManagement;
