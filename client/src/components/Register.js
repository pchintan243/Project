import React, { useState } from 'react'

const Register = () => {

    const [user, setUser] = useState({
        Firstname: "",
        Lastname: "",
        Email: "",
        Department: "",
        Query: "",
        OtherQuery: "",
        Computer: "",
        Phone: "",
        Note: ""
    });

    // To get the user data
    // Also you can see on browser to inspect an element after components
    let name, value;
    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;

        // Get all the value using the target
        setUser({ ...user, [name]: value })
    }

    const PostData = async (e) => {
        e.preventDefault();
        const { Firstname, Lastname, Email, Department, Query, OtherQuery, Computer, Phone, Note } = user;


        // It navigate to directly our /register post method from app.js file
        const res = await fetch("/registerComplaint", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                // Get all the data from the user
                Firstname, Lastname, Email, Department, Query, OtherQuery, Computer, Phone, Note
            })
        });
    }

    const check = () => {
        // Function for selecting Computer related query
        if (user.Query === "Computer") {
            document.getElementById("ifY").style.display = "block";
        } else {
            document.getElementById("ifY").style.display = "none";
        }

        // Function for selecting other query
        if (user.Query === "OtherQuery") {
            document.getElementById("ifYes").style.display = "block";
        } else {
            document.getElementById("ifYes").style.display = "none";
        }
    }
    return (
        <>
            <div className="container mt-5 text-center">
                <h1>Complaint Form</h1>
            </div>
            <div className="container mt-5">
                <form className="row g-3 needs-validation" method="post">

                    {/* First Name Section */}
                    <div className="col-md-6">
                        <label htmlFor="firstname" className="form-label h5">First name</label>
                        <input type="text" className="form-control" id="validationCustom01" name="Firstname" value={user.Firstname} onChange={handleInputs} />
                    </div>

                    {/* last Name Section */}
                    <div className="col-md-6">
                        <label htmlFor="lastname" className="form-label h5">Last name</label>
                        <input type="text" className="form-control" id="validationCustom02" name="Lastname" value={user.Lastname} onChange={handleInputs} />
                    </div>

                    {/* Email Section */}
                    <div className="col-md-12">
                        <label htmlFor="email" className="form-label h5">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            name="Email" value={user.Email} onChange={handleInputs} />
                    </div>

                    {/* Phone Section */}
                    <div className="col-md-12">
                        <label htmlFor="phone" className="form-label h5">Phone</label>
                        <input type="tel" className="form-control" id="validationCustom03" name="Phone"
                            placeholder="eg:- 1234567890" pattern="[0-9]{10}" value={user.Phone} onChange={handleInputs} />
                    </div>

                    {/* Department Section */}
                    <select className="form-select" aria-label="Default select example" name="Department" value={user.Department} onChange={handleInputs} >
                        <option value="">Select Department</option>
                        <option value="Information Technology">Information Technology</option>
                        <option value="Computer Engineering">Computer Engineering</option>
                        <option value="Mechanical Engineering">Mechanical Engineering</option>
                        <option value="Artifical Intelligence">Artifical Intelligence</option>
                        <option value="Civil Engineering">Civil Engineering</option>
                        <option value="Electronic & Communication">Electronic & Communication</option>
                        <option value="Electrical Engineering">Electrical Engineering</option>
                        <option value="Food Processing and Technology">Food Processing and Technology</option>
                        <option value="Automobile Engineering">Automobile Engineering</option>
                    </select>

                    {/* Query Section */}
                    <select className="form-select" aria-label="Default select example" name="Query" onChange={handleInputs} onClick={check}>
                        <option value="">Select Query</option>
                        <option value="Computer">Computer</option>
                        <option value="Plumbing">Plumbing</option>
                        <option value="Carpentering">Carpentering</option>
                        <option value="Electrical">Electrical</option>
                        <option value="Civil Work">Civil Work</option>
                        <option value="OtherQuery">Other</option>
                    </select>
                    <div id="ifYes" style={{ display: "none" }}>
                        <label htmlFor="other" className="h5">Enter Other Query</label>
                        <input type="text" name="OtherQuery" value={user.OtherQuery} onChange={handleInputs} />
                    </div>
                    <div id="ifY" style={{ display: "none" }}>
                        <label htmlFor="computer" className="h5">Computer IP</label>
                        <input type="text" name="Computer" value={user.Computer} onChange={handleInputs} />
                    </div>

                    {/* Note section */}
                    <label htmlFor="floatingTextarea2" className="h5">Note</label>
                    <div className="form-floating">
                        <textarea className="form-control" id="floatingTextarea2" name="Note" style={{ height: "100px" }} value={user.Note} onChange={handleInputs}></textarea>
                    </div>

                    {/* Button */}
                    <div className="col-12">
                        <button className="btn btn-primary m-1" type="button" name="button" onClick={PostData}>Submit</button>
                        <button className="btn btn-danger m-1" type="rest" name="button">Reset</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register