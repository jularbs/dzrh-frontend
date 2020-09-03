import { Container, Row, Col } from "shards-react";
import MainSidebar from "./MainSidebar";
import MainNavbar from "./MainNavbar";
import MainFooter from "../components/layout/MainFooter";

// TO FIX
// userActions: Color
// MainFooter: align items

const NoAuthLayout = ({ children }) => {
  return (
    <Container fluid>
      <Row>
        <Col
          className="main-content p-0"
          lg="12"
          md="12"
          sm="12"
          tag="main"
        >
          {children}
          {/* <MainFooter /> */}
        </Col>
      </Row>
    </Container>
  );
};

export default NoAuthLayout;
