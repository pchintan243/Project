import React from 'react'

const AdminLogin = () => {
  return (
    <>
      <div className="container mt-5 text-center">
        <h1>Admin Login</h1>
      </div>
      <div className="container mt-5">
        <form className="row g-3 needs-validation" action="/adminlogin" method="post">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
              name="Email" required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" name="Password"
              autoComplete="off" />
          </div>

          <div className="col-12">
            <button className="btn btn-danger m-1" id="hii" type="submit" name="button">Submit</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default AdminLogin