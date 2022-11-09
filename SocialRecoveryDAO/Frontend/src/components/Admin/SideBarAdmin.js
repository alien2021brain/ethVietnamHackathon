import React from "react";
import { Link } from "react-router-dom";

export default function SideBarAdmin() {
  const UserKey = localStorage.getItem("id");
  console.log('UserKey', UserKey);
  return (
    <>
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        {/* Sidebar - Brand */}
        <Link
          className="sidebar-brand d-flex align-items-center justify-content-center"
          to="/dashboard"
        >
          {" "}
          <div className="sidebar-brand-icon rotate-n-15">
            {/* <i className="fas fa-laugh-wink"></i> */}
            {/* <img src={image} height={60} width={60} /> */}
          </div>
          <div className="sidebar-brand-text whitespace-nowrap">
            Social Recovery DAO <sup></sup>
          </div>
        </Link>

        {/*  Divider -->  */}
        <hr className="my-0 sidebar-divider" />

        {/* Nav Item - Dashboard */}
        <li className="nav-item active">
          <Link className="nav-link" to="/dashboard">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </Link>
        </li>

        {/*<!-- Divider --> */}
        <hr className="sidebar-divider" />

        
        {/* Nav Item - Utilities Collapse Menu */}
      </ul>
    </>
  );
}
