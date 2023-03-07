import React from 'react'

const Login = () => {
  
  
  return (
    <>
      <div className="container mt-5 text-center">
        <h1>Login</h1>
      </div>
      <div className="container mt-5">
        <form className="row g-3" id="tmp" action="/send" method="post">
          <div>
            <label htmlFor="email" className="form-label h5">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
              name="Email" required />
          </div>
          <div className="col-12">
            <button className="btn btn-danger m-1" type="submit">SEND OTP</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login