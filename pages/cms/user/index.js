import { Container, Row, Col } from "shards-react";
import Layout from "../../../layouts/Layout";
import PageTitle from "../../../components/common/PageTitle";

const UserIndex = () => {
    return (
      <Layout>
        <Row noGutters className="page-header py-4">
          <PageTitle
            title="User Overview"
            subtitle="Dashboard"
            className="text-sm-left mb-3"
          />
        </Row>
      </Layout>
    );
}

export default UserIndex;

