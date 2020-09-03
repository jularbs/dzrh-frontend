import { Container, Row, Col, Navbar } from "shards-react";
import NavbarSearch from "../components/layout/MainNavbar/NavbarSearch";
import NavbarNav from "../components/layout/MainNavbar/NavbarNav/NavbarNav";

const MainNavbar = () => {
  return (
    <div className="main-navbar bg-white sticky-top">
      <Container className="p-0">
        <Navbar className="align-items-stretch flex-md-nowrap p-0">
          <NavbarSearch />
          <NavbarNav />
        </Navbar>
      </Container>
    </div>
  );
};

export default MainNavbar;
