import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { ethers } from "ethers";
import ABI from "../abi.json";
import ErrorMessage from "../ErrorMessage";
import LoadingSpinner from "../Lodder/LoadingSpinner";
import {
  BigNumber,
  FixedFormat,
  FixedNumber,
  formatFixed,
  parseFixed,
  BigNumberish,
} from "@ethersproject/bignumber";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, withRouter } from "react-router-dom";
const GetNominee = async ({ setError1, setTxs1, setnom }) => {
  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    ethers.utils.getAddress(process.env.REACT_APP_CONTRACT_ADD);
    const iface = new ethers.Contract(
      process.env.REACT_APP_CONTRACT_ADD,
      ABI,
      signer
    );
    try {
      const userd = await iface.getNominee();
      var loopData = [];
      let totalCount = [];
      var i;
      for (i = 0; i < userd.length; i++) {
        totalCount.push(userd.length);
        let dt = [];
        let vr = BigNumber.from(userd[i].share._hex);
        let nocov = vr.toNumber();
        dt.push(userd[i].nominee);
        dt.push(nocov);
        loopData.push(dt);
        setTxs1(totalCount);
        //loopData.push(userd[i].share._hex);
      }
      setnom(loopData);
    } catch (error) {
      // console.log("ERROR AT GETTING USER: ", error);
    }
  } catch (err) {
    setError1(err.message);
  }
};
// Delete Nominee
const NomineeDelete = async ({
  setErrorDlt,
  setTxsDlt,
  nomVl,
  SetReceiptInfo,
}) => {
  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");
    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    ethers.utils.getAddress(process.env.REACT_APP_CONTRACT_ADD);
    // Get Interface
    const iface = new ethers.utils.Interface(ABI);
    const data = iface.encodeFunctionData("removeNominee(address,address)", [
      nomVl,
      "0x0000000000000000000000000000000000000000",
    ]);
    const tx = await signer.sendTransaction({
      to: process.env.REACT_APP_CONTRACT_ADD,
      data,
    });
    const receipt = await tx.wait();
    setTxsDlt(tx);
    SetReceiptInfo(receipt);
  } catch (err) {
    setErrorDlt(err.message);
  }
};
const UserDashOne = (props) => {
  //Get api data
  const [error1, setError1] = useState();
  const [txs1, setTxs1] = useState([]);
  const [nom, setnom] = useState([]);
  const [error, setErrorDlt] = useState();
  const [txs, setTxsDlt] = useState([]);
  const [ReceiptInfo, SetReceiptInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(async () => {
    setError1();
    await GetNominee({
      setError1,
      setTxs1,
      setnom,
    });
  }, []);
  const UserId = localStorage.getItem("id");
  const [notes, getNotes] = useState([]);
  const [notes2, getNotes2] = useState([]);
  const [myId, setId] = useState(12);
  const url = "http://localhost:3001/UserNominee";
  useEffect(() => {
    getAllNotes(myId);
  }, [myId]);

  const getAllNotes = () => {
    axios
      .post(url, { UserPublicKey: UserId })
      .then((response) => {
        const allNotes = response.data.data.count;
        const allNotes2 = response.data.data.data;

        getNotes(allNotes);
        getNotes2(allNotes2);
      })
      .catch((error) => console.log(`Error: ${error}`));
  };
  //function GetBtnValue(event) {
  const GetBtnValue = async (event) => {
    setErrorDlt();
    setIsLoading(true);
    await NomineeDelete({
      setErrorDlt,
      setTxsDlt,
      SetReceiptInfo,
      nomVl: event.target.value,
    });
    setIsLoading(false);
  };
  useEffect(() => {
    if (ReceiptInfo && ReceiptInfo.status == 1) {
      setIsLoading(false);
      toast.success("Nominee Delete successfully!");
      setTimeout(() => {
        props.history.push("/dashboard");
      }, 3000);
      window.location.reload(false);
    }
  }, [ReceiptInfo]);
  //Using useToggle Hook
  const useToggle = (initialState = false) => {
    const [state, setState] = useState(initialState);
    const toggle = useCallback(() => setState((state) => !state), []);
    return [state, toggle];
  };

  const [toggle, setToggle] = useToggle();
  return (
    <>
      <div className="tw-flex tw-flex-col tw-justify-start">
        <div className="tw-w-[37px] tw-h-[37px] tw-rounded-full tw-bg-[#ECEEF6] tw-grid tw-place-items-center tw-cursor-pointer">
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 122.88 106.19"
            width={20}
          >
            <g>
              <path
                class="st0"
                d="M0,106.19V89.02c9.18-4.09,37.3-11.86,38.63-23.1c0.3-2.54-5.69-12.21-7.06-16.85 c-2.93-4.68-3.99-12.11-0.77-17.06c1.28-1.96,0.73-9.13,0.73-11.84c0-26.91,47.15-26.92,47.15,0c0,3.41-0.78,9.66,1.07,12.33 c3.09,4.47,1.49,12.41-1.11,16.56c-1.67,4.87-8.03,14.09-7.49,16.85c2.02,10.27,28.1,17.16,36.31,20.82l0,19.45H0L0,106.19z M109.94,36.16v12.19h12.94v9.22h-12.94v12.94h-9.22V57.57H87.79v-9.22h12.94V35.42l9.22,0V36.16L109.94,36.16L109.94,36.16z"
              />
            </g>
          </svg>
        </div>

        <button
          onClick={setToggle}
          className="tw-mt-[12px] tw-font-[500] tw-text-[15px] tw-text-black tw-text-left tw-border tw-border-gray-300 tw-w-fit tw-px-4 tw-py-1 tw-rounded-md tw-bg-gray-200 hover:tw-bg-gray-300"
        >
          <h4>{txs1[0]}</h4>Added Nominee
        </button>
        {/* <button  onClick={handleSubmit}>dsd</button> */}

        {toggle && (
          <div className="tbl_dsh">
            <table className="table custom">
              <tr>
                <th>Nominee Email Id</th>
                <th>Percentage</th>
                <th>Action</th>
              </tr>
              {nom.map((val, key) => {
                return (
                  <tr key={key}>
                    <td>{val[0]}</td>
                    <td>{val[1]}</td>
                    <td>
                      <button
                        className="btndl"
                        value={val[0]}
                        onClick={GetBtnValue}
                        disabled={isLoading}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <ErrorMessage message={error} />
              )}
            </table>
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default withRouter(UserDashOne);
