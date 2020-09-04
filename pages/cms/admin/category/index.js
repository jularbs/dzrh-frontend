import { Container, Row, Col } from "shards-react";
import Layout from "../../../../layouts/Layout";
import PageTitle from "../../../../components/common/PageTitle";
import Admin from "../../../../components/auth/Admin.component";


import CategoryForm from "../../../../components/categories/CategoryForm";
import CategoryList from "../../../../components/categories/CategoryList";


const AdminCategoryManagement = () => {
  return (
    <Layout>
      <Admin>
        <Row noGutters className="page-header py-4">
          <PageTitle
            title="Category Management"
            subtitle="Articles"
            className="text-sm-left mb-3"
          />
        </Row>
        <Row>
          <Col lg="4" md="6" sm="12">
            <CategoryForm />
            <CategoryList />
          </Col>
        </Row>
      </Admin>
    </Layout>
  );
};

export default AdminCategoryManagement;
