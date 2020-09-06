import { Container, Navbar } from "shards-react";
import NavbarSearch from "../components/layout/MainNavbar/NavbarSearch";
import NavbarNav from "../components/layout/MainNavbar/NavbarNav/NavbarNav";

import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Router from "next/router";

Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = (url) => NProgress.done();
Router.onRouteChangeError = (url) => NProgress.done();

const MainNavbar = () => {
  return (
    <div className="main-navbar bg-white sticky-top">
      <Container fluid className="p-0">
        <Navbar className="align-items-stretch flex-md-nowrap p-0">
          <NavbarSearch />
          <NavbarNav />
        </Navbar>
      </Container>
    </div>
  );
};

export default MainNavbar;
