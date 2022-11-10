import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import FooterAdmin from "../FooterAdmin";
import TopBarAdmin from "../TopBarAdmin";
import SideBarAdmin from "../SideBarAdmin";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ethers } from "ethers";
import ABI from "../abi.json";
import ErrorMessage from "../ErrorMessage";
import LoadingSpinner from "../Lodder/LoadingSpinner";
const AddNomineeData = async ({
  setError,
  setTxs,
  SetReceiptInfo,
  NomineePublicKey,
  Percentage,
  isLoading,
}) => {
  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    ethers.utils.getAddress(NomineePublicKey);
    // Get Interface
    const iface = new ethers.utils.Interface(ABI);
    const data = iface.encodeFunctionData("addNominee(address,uint256)", [
      NomineePublicKey,
      Percentage,
    ]);
    const tx = await signer.sendTransaction({
      to: process.env.REACT_APP_CONTRACT_ADD,
      data,
    });
    setTxs(tx);
    const receipt = await tx.wait();
    SetReceiptInfo(receipt);
  } catch (err) {
    console.log("Nominee___error", err.code);
    setError(err.message);
  }
};

function AddNominee(props) {
  const UserKey = localStorage.getItem("id");
  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);
  const [ReceiptInfo, SetReceiptInfo] = useState([]);
  const [user, setUser] = useState({
    UserPublicKey: UserKey,
    NomineePublicKey: "",
    NomineeEmailId: "",
    NomineeMobileNumber: "",
    Percentage: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = new FormData(e.target);
    setError();
    await AddNomineeData({
      setError,
      setTxs,
      SetReceiptInfo,
      isLoading,
      NomineePublicKey: data.get("NomineePublicKey"),
      Percentage: data.get("Percentage"),
    });
    setIsLoading(true);
    setFormErrors(validate(user));
    setIsSubmit(true);
  };
  useEffect(() => {
    if (ReceiptInfo && ReceiptInfo.status == 1) {
      const {
        UserPublicKey,
        NomineePublicKey,
        NomineeEmailId,
        NomineeMobileNumber,
        Percentage,
      } = user;
      if (UserPublicKey && NomineePublicKey && Percentage) {
        axios
          .post("http://localhost:3001/AddNominee", user)
          .then((res) => {
            setIsLoading(false);
            toast.success("Nominee Added successfully!");
            setTimeout(() => {
              props.history.push("/dashboard");
            }, 3000);
          })
          .catch((err) => {
            console.log("There was an error!", err.response.data.message);
            // this.setState({ errorMessage: error.message });
            toast.error(err.response.data.message, {
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            //console.log('There was an error!', err);
          });
      } else {
        toast.error("Invlid Input", {
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  }, [ReceiptInfo]);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};

    if (!values.NomineePublicKey) {
      errors.NomineePublicKey = "Nominee Public Key is required!";
    }
    if (!values.Percentage) {
      errors.Percentage = "Percentage is required!";
    }
    return errors;
  };

  return (
    <>
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
                      <div className="d-sm-flex align-items-center justify-content-between mb-[10px]">
                        <h1 className="tw-text-[32px] tw-text-black tw-font-bold">
                          Add Nominee
                        </h1>
                      </div>
                      <form
                        className="tw-w-full"
                        onSubmit={handleSubmit}
                        disabled={isLoading}
                      >
                        <div className="tw-w-full">
                          {/* <!-- Content Row --> */}
                          <div className="tw-mb-[35px] tw-text-black tw-text-[15px] tw-text-left tw-mt-[10px]">
                            Enter the nominee details{" "}
                          </div>

                          <div className="tw-w-full tw-bg-white tw-px-[34px] tw-py-[28px] tw-rounded-[12px] tw-flex tw-flex-col tw-items-start">
                            <div className="tw-w-full tw-flex tw-flex-col tw-items-start tw-mb-[25px] tw-text-black tw-text-base">
                              <label> Nominee Public Key</label>
                              <input
                                type="text"
                                className="form-control"
                                name="NomineePublicKey"
                                value={user.NomineePublicKey}
                                onChange={handleChange}
                                placeholder=""
                              ></input>
                              {formErrors.NomineePublicKey && (
                                <p className="erromsg">
                                  {formErrors.NomineePublicKey}
                                </p>
                              )}
                            </div>

                            <div className="tw-w-full tw-flex tw-flex-col tw-items-start tw-mb-[25px] tw-text-black tw-text-base">
                              <label>Nominee Email ID</label>
                              <input
                                type="text"
                                className="form-control"
                                name="NomineeEmailId"
                                value={user.NomineeEmailId}
                                onChange={handleChange}
                                placeholder=""
                              ></input>
                            </div>

                            <div className="tw-w-full tw-flex tw-flex-col tw-items-start tw-mb-[25px] tw-text-black tw-text-base">
                              <label>Nominee Mobile Number</label>
                              <input
                                type="text"
                                className="form-control"
                                name="NomineeMobileNumber"
                                value={user.NomineeMobileNumber}
                                onChange={handleChange}
                                placeholder=""
                              ></input>
                            </div>

                            <div className="tw-w-full tw-flex tw-flex-col tw-items-start tw-mb-[25px] tw-text-black tw-text-base">
                              <label>Percentage</label>
                              <input
                                type="text"
                                className="form-control"
                                name="Percentage"
                                value={user.Percentage}
                                onChange={handleChange}
                                placeholder=""
                              ></input>
                              <p className="erromsg">{formErrors.Percentage}</p>
                            </div>

                            <div className="tw-mt-[30px] tw-flex tw-justify-end tw-w-full">
                              {/* <div className="button2" ><button type="button" className="btn btn-primary" onClick={AdNominee}>Submit</button></div> */}
                              {isLoading ? (
                                <LoadingSpinner />
                              ) : (
                                <ErrorMessage message={error} />
                              )}
                              <button
                                type="submit"
                                className="tw-bg-[#4763E4] tw-w-[274px] tw-h-[48px] tw-text-white tw-rounded-[5px] tw-flex tw-justify-center tw-items-center"
                              >
                                <span className="tw-mr-[8px]">Add</span>

                                <svg
                                  width="21"
                                  height="12"
                                  viewBox="0 0 21 12"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M19.7688 4.24563L16.5434 0.986943C16.466 0.908828 16.3738 0.846825 16.2722 0.804513C16.1707 0.762202 16.0617 0.740417 15.9517 0.740417C15.8417 0.740417 15.7327 0.762202 15.6312 0.804513C15.5296 0.846825 15.4374 0.908828 15.36 0.986943C15.2047 1.1431 15.1176 1.35433 15.1176 1.57451C15.1176 1.79469 15.2047 2.00592 15.36 2.16207L18.327 5.15407H1.33342C1.11239 5.15407 0.900402 5.24188 0.744105 5.39817C0.587807 5.55447 0.5 5.76646 0.5 5.98749H0.5C0.5 6.20853 0.587807 6.42052 0.744105 6.57681C0.900402 6.73311 1.11239 6.82092 1.33342 6.82092H18.377L15.36 9.82958C15.2819 9.90706 15.2198 9.99924 15.1775 10.1008C15.1352 10.2024 15.1134 10.3113 15.1134 10.4213C15.1134 10.5313 15.1352 10.6403 15.1775 10.7418C15.2198 10.8434 15.2819 10.9356 15.36 11.013C15.4374 11.0912 15.5296 11.1532 15.6312 11.1955C15.7327 11.2378 15.8417 11.2596 15.9517 11.2596C16.0617 11.2596 16.1707 11.2378 16.2722 11.1955C16.3738 11.1532 16.466 11.0912 16.5434 11.013L19.7688 7.77936C20.237 7.31055 20.5 6.67507 20.5 6.0125C20.5 5.34992 20.237 4.71444 19.7688 4.24563Z"
                                    fill="white"
                                  />
                                </svg>
                              </button>
                            </div>

                            {(() => {
                              if (error && error == "UNPREDICTABLE_GAS_LIMIT") {
                                return (
                                  <h5 mt-2 className="text-center">
                                    Cannot Estimate gas Transaction may fail or
                                    may require manual gas limit
                                  </h5>
                                );
                              }
                            })()}
                          </div>
                          {/* Content Row End*/}
                        </div>
                      </form>
                    </div>
                  </div>
                  {/* <!-- Footer --> */}
                  <FooterAdmin />
                  {/*<!-- End of Footer --> */}
                </div>

                {/* <!-- End of Content Wrapper --> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
export default withRouter(AddNominee);
