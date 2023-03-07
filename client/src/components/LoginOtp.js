import React from 'react'

const LoginOtp = () => {
    return (
        <>
            <div className="container">

                <div className="container mt-5 text-center">
                    <h1 className="brand"><span>Welcome User </span> Sign-up</h1>
                </div>


                <form className="row g-3 needs-validation" method="POST" action="/verify">
                    <h1>Enter OTP</h1>
                    <input type="text" className="form-control input-sm" name="otp" required />
                    <div className="col-12">
                        <button className="btn btn-danger" type="submit" name="button">Submit</button>
                    </div>
                </form>
            </div>
            <div className="container">
                <form method="POST" action="/resend">
                    <div className="col-12">
                        <button className="btn btn-danger" type="submit" name="button">Resend OTP</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default LoginOtp