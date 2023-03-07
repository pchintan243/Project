import React from 'react';
import logo from "../images/adit.jpg";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container m-0">
                    <img src={logo} alt="" width="80" height="80" />
                </div>

                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="navbar-brand h1" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="navbar-brand h1" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="navbar-brand h1" to="/register">Registration</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="navbar-brand h1" to="/adminlogin">Admin</Link>
                            </li>
                        </ul>
                    </div>
                </div>

            </nav>
        </>
    )
}

export default Navbar