import React from "react";
import { Link, NavLink } from 'react-router-dom'
import image from './Admin/Logo.png';
import img_icon from './../icon_img.png';
export default function Sidebar() {
    return (
        <>
        <div className="container">
            <div className="siderbar">
                <div className="row">
                    <div className="col im">
                    <img src={image} height={140} width={110} />
                    </div>
                </div>
                <div className="row">
                    <div className="col h">
                    </div>
                </div>
                <div className="row">
                    <div className="col im">
                    {/* <img src={img_icon} /> */}
                  
                    </div>
                </div>
            </div>
        </div>
        
        </>
    )
}
