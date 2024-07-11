import React from 'react';
import { Link, Outlet } from "react-router-dom";
import axios from 'axios';

const DashboardWrapper = () => {

 
    
   
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/dashboard">URL Shortener</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="shorten">Shorten Url</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="urls">Url List</Link>
                            </li>
                           
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet />
        </div>
    )
}

export default DashboardWrapper;
