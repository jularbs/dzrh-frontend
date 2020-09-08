import Layout from "../../layouts/Layout";
import Private from "../../components/auth/Private.component";
import MyProfile from "../../components/auth/MyProfile";
import PageTitle from "../../components/common/PageTitle";

import { Row, Col } from "shards-react";

const MyProfilePage = () => {
  return (
    <Layout>
      <Private>
        <Row noGutters className="page-header py-4">
          <PageTitle
            title="My Profile"
            subtitle="Users Management"
            className="text-sm-left mb-3"
          />
        </Row>
        <MyProfile />
      </Private>
    </Layout>
  );
};

export default MyProfilePage;
