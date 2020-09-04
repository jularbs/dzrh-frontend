import { Container, Row, Col } from "shards-react";
import Layout from "../../../layouts/Layout";
import PageTitle from "../../../components/common/PageTitle";
import Private from "../../../components/auth/Private.component";

const UserIndex = () => {
  return (
    <Layout>
      <Private>
        <Row noGutters className="page-header py-4">
          <PageTitle
            title="User Overview"
            subtitle="Dashboard"
            className="text-sm-left mb-3"
          />
        </Row>
      </Private>
    </Layout>
  );
};

export default UserIndex;
