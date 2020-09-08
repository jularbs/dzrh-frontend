import React from "react";
import PropTypes from "prop-types";
import { NavItem, NavLink } from "shards-react";
import Link from "next/link";
import { useRouter } from "next/router";

const SidebarNavItem = ({ item }) => {
  const pathName = useRouter().pathname;
  return (
    <NavItem className={pathName == item.to ? "active" : ""}>
      <Link href={item.to}>
        <NavLink>
          {item.htmlBefore && (
            <div
              className="d-inline-block item-icon-wrapper"
              dangerouslySetInnerHTML={{ __html: item.htmlBefore }}
            />
          )}
          {item.title && (
            <span className={pathName == item.to ? "activelink" : ""}> {item.title}</span>
          )}
          {item.htmlAfter && (
            <div
              className="d-inline-block item-icon-wrapper"
              dangerouslySetInnerHTML={{ __html: item.htmlAfter }}
            />
          )}
        </NavLink>
      </Link>
    </NavItem>
  );
};

SidebarNavItem.propTypes = {
  /**
   * The item object.
   */
  item: PropTypes.object,
};

export default SidebarNavItem;
