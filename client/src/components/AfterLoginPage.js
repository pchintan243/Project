import React from 'react'

const AfterLoginPage = () => {

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <h2>Register Your Complaint Here &nbsp</h2>
                        <ul className="navbar-nav list-group text-light">
                            <li className="nav-item bg-danger rounded-3">
                                <a className="nav-link active" href="/register"><strong>Complaint Form</strong></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <nav className="navbar navbar-expand-lg navbar-dark">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <h2>To See Your Complaints &nbsp</h2>
                        <ul className="navbar-nav list-group text-light">
                            <li className="nav-item bg-danger rounded-3">
                                <button className="btn btn-danger"><strong>Your Complaints</strong></button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default AfterLoginPage