import React, { useEffect, useState } from "react"
import { Link, withRouter } from "react-router-dom";
import { ethers } from "ethers";
import ABI from "../abi.json";

//Get User Blance
const GetContractStatus
    = async ({ setError, setContStatus }) => {

        try {
            if (!window.ethereum)
                throw new Error("No crypto wallet found. Please install it.");

            await window.ethereum.send("eth_requestAccounts");
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            const AccountAdd = await signer.getAddress();
            ethers.utils.getAddress(process.env.REACT_APP_CONTRACT_ADD);
            const iface = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADD, ABI, signer);
            try {
                const userd = await iface.paused();
                setContStatus(userd);

            } catch (error) {

                //console.log("ERROR AT GETTING USER: ", error);
            }

        } catch (err) {
            setError(err.message);
        }
    };
function GetPausedStatus() {

    const [Error, setError] = useState();
    const [ContSts, setContStatus] = useState();

    useEffect(async () => {
        setError();
        await GetContractStatus({
            setError,
            setContStatus
        });
    }, []);
    return (
        <>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">

                    <div className="">
                        {/*  <!-- Page Heading --> */}

                        {(() => {
                            if (ContSts == false) {
                                return (
                                    <div className="tw-flex tw-text-black tw-justify-end">
                                        <h4><span>Contract Status</span> <button className="BtnUnpus tw-ml-2 tw-px-8" disabled={true}>UnPaused</button></h4>
                                    </div>
                                )
                            } else {
                                return (
                                    <div className="tw-flex tw-text-black tw-justify-end">
                                        <h4><span>Contract Status</span> <button className="BtnPus tw-ml-2 tw-px-8" disabled={true}>Paused</button></h4>
                                    </div>
                                )
                            }
                        })()}

                    </div>
                </div>

            </div>
        </>
    )
}
export default withRouter(GetPausedStatus);
