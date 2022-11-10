import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import FooterAdmin from "./FooterAdmin";
import TopBarAdmin from "./TopBarAdmin";
import SideBarAdmin from "./SideBarAdmin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CustomTable from "../CustomTable";

const Guard = () => {
  const columns = [
    { title: "Timestamp", field: "Timestamp" },
    { title: "Address", field: "Address" },
    { title: "SM", field: "SM" },
    { title: "Last Activity", field: "LastActivity" },
  ];

  const [notes, getNotes] = useState([]);

  const [selectedRows, setSelectedRows] = useState([]);
  const [dltnotes, getdltNotes] = useState();
  const [myId, setId] = useState(12);
  const url = "http://localhost:3001/getCompanyList";
  useEffect(() => {
    getAllNotes(myId);
  }, [myId]);
  const getAllNotes = (id) => {
    axios
      .post(url, { userId: id })
      .then((response) => {
        const allNotes = response.data.payload.payload;
        getNotes(allNotes);
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  //Update Records
  const handleRowUpdate = (newData, oldData, resolve, reject) => {
    if (newData != "") {
      axios
        .post("http://localhost:3001/updateCompanyById", newData)
        .then((res) => {
          toast.success(res.data.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            getAllNotes(myId);
          }, 2000);
        })
        .catch((e) => console.log("Error", e));
    } else {
      toast.error("Invalid Input", {
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  // Delete Contac list
  const urldlt = "http://localhost:3001/deleteCompanyById/";
  const handleRowDelete = (selectedRow, resolve) => {
    const upId = selectedRow.CompanyId;
    axios
      .post(urldlt, { id: upId })
      .then((response) => {
        toast.success("Record Deleted successfully!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          getAllNotes(myId);
        }, 2000);
      })
      .catch((error) => console.log(`Error: ${error}`));
  };
  //Delete Multipal row
  const handleBulkDelete = () => {
    const urldt = "http://localhost:3001/deleteAllCompanysById/";
    const updatedData = notes.filter((row) => selectedRows.includes(row));
    console.log("dat____", updatedData);
    const updt = updatedData.map((u) => u.CompanyId);
    axios
      .post(urldt, { ids: updt })
      .then((response) => {
        console.log("delete_____", response);
        toast.success("Record Deleted successfully!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          getAllNotes(myId);
        }, 2000);
      })
      .catch((error) => console.log(`Error: ${error}`));
    getdltNotes(updatedData);
  };

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
                          Guard Me
                        </div>
                      </div>

                      <div className="compny">
                        <div className="col-sm-12 rsp">
                          <CustomTable
                            title=""
                            columns={columns}
                            data={notes}
                            onSelectionChange={(rows) => setSelectedRows(rows)}
                            options={{
                              actionsColumnIndex: -1,
                              addRowPosition: "first",
                              selection: true,

                              headerStyle: {
                                backgroundColor: "#eaeffb",
                                color: "#000",
                              },
                              loadingType: "none",
                            }}
                            actions={[
                              {
                                icon: "delete",
                                tooltip: "Delete all selected rows",
                                onClick: () => handleBulkDelete(),
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
export default withRouter(Guard);
