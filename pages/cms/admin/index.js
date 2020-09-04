import { Container, Row, Col } from "shards-react";
import Layout from "../../../layouts/Layout";
import PageTitle from "../../../components/common/PageTitle";
import Admin from "../../../components/auth/Admin.component";

const AdminIndex = () => {
  return (
    <Admin>
      <Layout>
        <Row noGutters className="page-header py-4">
          <PageTitle
            title="Administrator Overview"
            subtitle="Dashboard"
            className="text-sm-left mb-3"
          />
        </Row>
      </Layout>
    </Admin>
  );
};

export default AdminIndex;
