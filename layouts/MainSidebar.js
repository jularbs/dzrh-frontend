import { Col } from "shards-react";
import { Navbar, NavbarBrand, Nav } from "shards-react";
import SidebarNavItem from "../components/layout/MainSidebar/SidebarNavItem";
import SidebarTitle from "../components/common/SidebarTitle";

const showOverview = () => {
  return (
    <Nav className="nav--no-borders flex-column">
      <SidebarNavItem
        key={1}
        item={{
          title: "Dashboard Overview",
          to: "/blog-overview",
          htmlBefore: '<i class="material-icons">dashboard</i>',
          htmlAfter: "",
        }}
      />
      <SidebarNavItem
        key={1}
        item={{
          title: "Google Analytics",
          to: "/blog-overview",
          htmlBefore: '<i class="material-icons">leaderboard</i>',
          htmlAfter: "",
        }}
      />
      <SidebarNavItem
        key={1}
        item={{
          title: "Google Adsense",
          to: "/blog-overview",
          htmlBefore: '<i class="material-icons">show_chart</i>',
          htmlAfter: "",
        }}
      />
      <SidebarNavItem
        key={1}
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

const showArticles = () => {
  return (
    <Nav className="nav--no-borders flex-column">
      <SidebarNavItem
        key={1}
        item={{
          title: "Create New Article",
          to: "/blog-overview",
          htmlBefore: '<i class="material-icons">note_add</i>',
          htmlAfter: "",
        }}
      />
      <SidebarNavItem
        key={1}
        item={{
          title: "Manage Articles",
          to: "/blog-overview",
          htmlBefore: '<i class="material-icons">vertical_split</i>',
          htmlAfter: "",
        }}
      />
      <SidebarNavItem
        key={1}
        item={{
          title: "Category Management",
          to: "/blog-overview",
          htmlBefore: '<i class="material-icons">account_tree</i>',
          htmlAfter: "",
        }}
      />
      <SidebarNavItem
        key={1}
        item={{
          title: "Tags Management",
          to: "/blog-overview",
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
        key={1}
        item={{
          title: "Video Stream Settings",
          to: "/blog-overview",
          htmlBefore: '<i class="material-icons">edit</i>',
          htmlAfter: "",
        }}
      />
      <SidebarNavItem
        key={1}
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
        key={1}
        item={{
          title: "Manage Users",
          to: "/blog-overview",
          htmlBefore: '<i class="material-icons">people</i>',
          htmlAfter: "",
        }}
      />
      <SidebarNavItem
        key={1}
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
        key={1}
        item={{
          title: "Social Media API Keys",
          to: "/blog-overview",
          htmlBefore: '<i class="material-icons">edit</i>',
          htmlAfter: "",
        }}
      />
      <SidebarNavItem
        key={1}
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
          {showOverview()}
          <SidebarTitle title="articles" />
          {showArticles()}
          <SidebarTitle title="streaming" />
          {showStreaming()}
          <SidebarTitle title="user management" />
          {showUserManagement()}
          <SidebarTitle title="options" />
          {showOptions()}
        </div>
      </div>
    </Col>
  );
};

export default MainSidebar;
