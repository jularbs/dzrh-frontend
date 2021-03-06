import { Container, Row, Col } from "shards-react";
import MainSidebar from "./MainSidebar";
import MainNavbar from "./MainNavbar";
import MainFooter from "../components/layout/MainFooter";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
NProgress.configure({ showSpinner: true });
Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = (url) => NProgress.done();
Router.onRouteChangeError = (url) => NProgress.done();

const Layout = ({children}) => {
  return (
    <Container fluid>
      <Row>
        <MainSidebar />
        <Col
          className="main-content p-0"
          lg={{ size: 10, offset: 2 }}
          md={{ size: 9, offset: 3 }}
          sm="12"
          tag="main"
        >
          <MainNavbar />
          <Container fluid className="main-content-container px-4">
            {children}
          </Container>
          <MainFooter />
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;
