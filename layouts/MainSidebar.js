import { Col } from "shards-react";
import { Navbar, NavbarBrand, Nav } from "shards-react";
import SidebarNavItem from "../components/layout/MainSidebar/SidebarNavItem";
import SidebarTitle from "../components/common/SidebarTitle";
import { isAuth } from "../actions/auth";

const showOverview = () => {
  return (
    <Nav className="nav--no-borders flex-column">
      <SidebarNavItem
        item={{
          title: "Dashboard Overview",
          to: "/blog-overview",
          htmlBefore: '<i class="material-icons">dashboard</i>',
          htmlAfter: "",
        }}
      />
      <SidebarNavItem
        item={{
          title: "Google Analytics",
          to: "/blog-overview",
          htmlBefore: '<i class="material-icons">leaderboard</i>',
          htmlAfter: "",
        }}
      />
      <SidebarNavItem
        item={{
          title: "Google Adsense",
          to: "/blog-overview",
          htmlBefore: '<i class="material-icons">show_chart</i>',
          htmlAfter: "",
        }}
      />
      <SidebarNavItem
        item={{
          title: "Disqus Management",
          to: "/blog-overview",
          htmlBefore: '<i class="material-icons">forum</i>',
          htmlAfter: "",
        }}
      />
    </Nav>
  );
};

const showArticles = (roleURL) => {
  return (
    <Nav className="nav--no-borders flex-column">
      <SidebarNavItem
        item={{
          title: "Create New Article",
          to: `/cms/${roleURL}/createarticle`,
          htmlBefore: '<i class="material-icons">note_add</i>',
          htmlAfter: "",
        }}
      />
      <SidebarNavItem
        item={{
          title: "Manage Articles",
          to: `/cms/manageblogs/`,
          htmlBefore: '<i class="material-icons">vertical_split</i>',
          htmlAfter: "",
        }}
      />
      <SidebarNavItem
        item={{
          title: "Category Management",
          to: `/cms/${roleURL}/category/`,
          htmlBefore: '<i class="material-icons">account_tree</i>',
          htmlAfter: "",
        }}
      />
      <SidebarNavItem
        item={{
          title: "Tags Management",
          to: `/cms/${roleURL}/tag/`,
          htmlBefore: '<i class="material-icons">local_offer</i>',
          htmlAfter: "",
        }}
      />
    </Nav>
  );
};

const showStreaming = () => {
  return (
    <Nav className="nav--no-borders flex-column">
      <SidebarNavItem
        item={{
          title: "Video Stream Settings",
          to: "/blog-overview",
          htmlBefore: '<i class="material-icons">edit</i>',
          htmlAfter: "",
        }}
      />
      <SidebarNavItem
        item={{
          title: "Audio Stream Settings",
          to: "/blog-overview",
          htmlBefore: '<i class="material-icons">edit</i>',
          htmlAfter: "",
        }}
      />
    </Nav>
  );
};

const showUserManagement = () => {
  return (
    <Nav className="nav--no-borders flex-column">
      <SidebarNavItem
        item={{
          title: "Manage Users",
          to: "/blog-overview",
          htmlBefore: '<i class="material-icons">people</i>',
          htmlAfter: "",
        }}
      />
      <SidebarNavItem
        item={{
          title: "Pending Users",
          to: "/blog-overview",
          htmlBefore: '<i class="material-icons">how_to_reg</i>',
          htmlAfter: "",
        }}
      />
    </Nav>
  );
};

const showOptions = () => {
  return (
    <Nav className="nav--no-borders flex-column">
      <SidebarNavItem
        item={{
          title: "Social Media API Keys",
          to: "/blog-overview",
          htmlBefore: '<i class="material-icons">edit</i>',
          htmlAfter: "",
        }}
      />
      <SidebarNavItem
        item={{
          title: "Dashboard Overview",
          to: "/blog-overview",
          htmlBefore: '<i class="material-icons">edit</i>',
          htmlAfter: "",
        }}
      />
    </Nav>
  );
};

const MainSidebar = () => {
  var roleURL = "";

  if (isAuth() && isAuth().role == 0) roleURL = "user";
  else if (isAuth() && isAuth().role == 1) roleURL = "admin";
  else roleURL = "";

  return (
    <Col
      tag="aside"
      className="main-sidebar px-0 col-12"
      lg={{ size: 2 }}
      md={{ size: 3 }}
    >
      <div className="main-navbar">
        <Navbar
          className="align-items-stretch bg-white flex-md-nowrap border-bottom p-0"
          type="light"
        >
          <NavbarBrand
            className="w-100 mr-0"
            href="#"
            style={{ lineHeight: "25px", backgroundColor: "rgb(254,195,33)" }}
          >
            <div className="d-table m-auto">
              <span className="d-none d-md-inline ml-1">DZRH NEWS ONLINE</span>
            </div>
          </NavbarBrand>
        </Navbar>
        <div className="nav-wrapper">
          <SidebarTitle title="dashboards" />
          {showOverview(roleURL)}
          <SidebarTitle title="articles" />
          {showArticles(roleURL)}
          <SidebarTitle title="streaming" />
          {showStreaming(roleURL)}
          <SidebarTitle title="user management" />
          {showUserManagement(roleURL)}
          <SidebarTitle title="options" />
          {showOptions(roleURL)}
        </div>
      </div>
    </Col>
  );
};

export default MainSidebar;
