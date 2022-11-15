import React from "react";
import { withRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import FooterAdmin from "./FooterAdmin";
import TopBarAdmin from "./TopBarAdmin";
import SideBarAdmin from "./SideBarAdmin";

import CustomTable from "../CustomTable";

import "react-toastify/dist/ReactToastify.css";

const Enroll = () => {
  const columns = [
    { title: "SP Address", field: "SPAddress" },
    { title: "Rate", field: "Rate" },
    { title: "Rating", field: "Rating" },
  ];

  const data = [
    {
      SPAddress: "0xF2379d114d065c54d9C49dB8bB3a4035550c4e71",
      Rate: "10",
      Rating: 2,
    },
    {
      SPAddress: "0xBf7E2F0d6F3cE0AeD6711385b474d0cbdd966965",
      Rate: "10",
      Rating: 3,
    },
    {
      SPAddress: "0xEe45A7dfe2EbDB8d113Ec669F2682f27DAC5Fc31",
      Rate: "10",
      Rating: 3,
    },
    {
      SPAddress: "0xd5E5C7085d8e39e9242f910E1116B222c4002DC0",
      Rate: "0.5",
      Rating: 4,
    },
    {
      SPAddress: "0xF538E6A7b08e4E2770F81B97dB4bbB6C475a4d6c",
      Rate: "20",
      Rating: 4,
    },
    {
      SPAddress: "0x8d7477E0A4D9A3A5E81FeE5B0956Abf374C961bA",
      Rate: "20",
      Rating: 5,
    },
    {
      SPAddress: "0x8b286889C52F8EcBBF91BCc08BFB46f888A25881",
      Rate: "15",
      Rating: 5,
    },
  ];

  const handleBulkDelete = () => {};

  return (
    <>
      <div className="adm">
        <div className="mb-3">
          <div className="row" id="main">
            <div id="page-top">
              <div id="wrapper">
                <SideBarAdmin />

                <div id="content-wrapper" className="d-flex flex-column">
                  <div id="content">
                    <TopBarAdmin />

                    <div className="container-fluid">
                      <div className="mb-4 d-sm-flex align-items-center justify-content-between">
                        <div
                          className="font-bold text-black"
                          style={{
                            fontSize: "18px",
                            fontWeight: "bold",
                          }}
                        >
                          Enroll Me
                        </div>
                      </div>

                      <div className="compny">
                        <div className="col-sm-12 rsp">
                          <CustomTable
                            title=""
                            columns={columns}
                            data={data}
                            options={{
                              actionsColumnIndex: -1,
                              addRowPosition: "first",
                              selection: true,

                              headerStyle: {
                                backgroundColor: "#eaeffb",
                                color: "#000",
                              },
                            }}
                            actions={[
                              {
                                icon: "personaddalt",
                                tooltip: "Request",
                                onClick: handleBulkDelete,
                              },
                            ]}
                          />
                        </div>
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
};
export default withRouter(Enroll);
