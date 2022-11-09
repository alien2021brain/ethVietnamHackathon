import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import FooterAdmin from "./FooterAdmin";
import TopBarAdmin from "./TopBarAdmin";
import SideBarAdmin from "./SideBarAdmin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function AdminDashbord(props) {
  const rememberMe = localStorage.getItem("id");


  return (
    <>
      {/*<div className="container adm"> */}
      <div className="adm">
        <div className="mb-3">
          <div className="row" id="main">
            <div id="page-top">
              <div id="wrapper">
                {/*sidebar component*/}
                <SideBarAdmin />
                {/*End sidebar component*/}

                {/*  <!-- Content Wrapper --> */}
                <div id="content-wrapper" className="d-flex flex-column">
                  <div id="content">
                    {/* <!-- Topbar component--> */}
                    <TopBarAdmin />
                    {/*  <!-- End of Topbar --> */}

                    <div className="container-fluid">
                      {/*  <!-- Page Heading --> */}
                      <div className="tw-mb-4 tw-flex tw-justify-between tw-items-center tw-w-full">
                        <h1 className="tw-text-black tw-text-[32px] tw-font-bold">
                          Dashboard
                        </h1>

                      </div>



                    </div>
                  </div>

                  <FooterAdmin />

                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
export default withRouter(AdminDashbord);
