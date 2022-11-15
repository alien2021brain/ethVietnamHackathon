import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useSignMessage, useNetwork, useDisconnect } from 'wagmi'

export default function TopBarAdmin() {
    const navigate = useHistory()
    const { isConnected, address } = useAccount();
    const UserName = localStorage.getItem("FirstName");

    const handleLogOut = async () => {
        // sessionStorage.clear();
        localStorage.removeItem('id')
        navigate.push('/');
        //window.localStorage.clear();

    }

    useEffect(() => {
        if(!isConnected){
            handleLogOut();
        }
        // if ( isConnected == true) {
        //     console.log('isConnected');
        //     //console.log("tst1__",isConnected);
        //     //handleAuth()
        //    // navigate.push('/dashboard')
    
        // } else {
        //     handleLogOut();
        //     console.log('disConnected');
        //     //navigate.push('/signin')
        //    // console.log("you are not connected");
        // }
      });
    
    return (
        <>
            {/* <!-- Topbar Search --> */}
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">


                {/* <!-- Topbar Navbar --> */}
                <ul className="navbar-nav ml-auto">
                    <div className="topbar-divider d-none d-sm-block"></div>

                    {/* <!-- Nav Item - User Information -->  */}
                    <div className="mt-3">
                        <ConnectButton label="Login With MetaMask" chainStatus="icon" accountStatus="avatar"
                            showBalance={{
                                smallScreen: false,
                                largeScreen: true,
                            }}
                        />
                    </div>
                </ul>

            </nav>
        </>
    )
}
