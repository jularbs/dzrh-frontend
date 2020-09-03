import React from "react";
import Link from "next/link";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";

export default class UserActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.toggleUserActions = this.toggleUserActions.bind(this);
  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }

  render() {
    return (
      <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
        <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
          <img
            className="user-avatar rounded-circle mr-2"
            src={"../../../../static/images/avatars/0.jpg"}
            alt="User Avatar"
          />{" "}
          <span className="d-none d-md-inline-block">Sierra Brooks</span>
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={this.state.visible}>
          <DropdownItem tag={Link} href="user-profile">
            <NavLink className="pl-3">
              <i className="material-icons">&#xE7FD;</i> Profile
            </NavLink>
          </DropdownItem>
          <DropdownItem tag={Link} href="edit-user-profile">
            <NavLink className="pl-3">
              <i className="material-icons">&#xE8B8;</i> Edit Profile
            </NavLink>
          </DropdownItem>
          <DropdownItem tag={Link} href="file-manager-list">
            <NavLink className="pl-3">
              <i className="material-icons">&#xE2C7;</i> Files
            </NavLink>
          </DropdownItem>
          <DropdownItem tag={Link} href="transaction-history">
            <NavLink className="pl-3">
              <i className="material-icons">&#xE896;</i> Transactions
            </NavLink>
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem tag={Link} href="/" className="text-danger">
            <NavLink className="pl-3">
              <i className="material-icons text-danger">&#xE879;</i> Logout
            </NavLink>
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }
}
