import React from "react";
import Link from "next/link";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink,
} from "shards-react";
import { isAuth, signout } from "../../../../actions/auth";
import Router from "next/router";

export default class UserActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };

    this.toggleUserActions = this.toggleUserActions.bind(this);
  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible,
    });
  }

  render() {
    return (
      <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
        <DropdownToggle
          caret
          tag={NavLink}
          className="text-nowrap px-3"
          style={{ color: "rgb(0,0,0,0.5)" }}
        >
          <img
            className="user-avatar rounded-circle mr-2"
            src={"../../../../static/images/avatars/0.jpg"}
            alt="User Avatar"
          />{" "}
          {isAuth() && (
            <label className="d-none d-md-inline-block mr-3">{`${
              isAuth().name
            }`}</label>
          )}
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={this.state.visible}>
          <DropdownItem tag={Link} href="edit-user-profile">
            <NavLink className="pl-3" style={{ color: "rgb(0,0,0,0.5)" }}>
              <i className="material-icons">&#xE8B8;</i> Edit Profile
            </NavLink>
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem
            onClick={() => signout(() => Router.replace("/cms/login"))}
          >
            <NavLink className="pl-3 text-danger">
              <i className="material-icons text-danger">&#xE879;</i> Logout
            </NavLink>
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }
}
