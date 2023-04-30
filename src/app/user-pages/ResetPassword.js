import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import imageLogo from '../../assets/images/logo-main.png';
import authService from '../../services/authService';

const ResetPassword = () => {
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            "email": event.target.email.value,
        };
        try {
            const res = await authService.login(data)
            if (res.data.message === "Login success" && res.data.data.roles.includes("ADMIN")) {
                localStorage.setItem('login', res.data.data.jwt)
                setError("Đăng nhập thành công")
                await new Promise(resolve => setTimeout(resolve, 1000))
                window.location.href = '/'

            }
            else {
                setError("Email hoặc mật khẩu sai")
            }
            console.log(res)
        } catch (error) {
            setError(error.message)
        }
    };


    return (
        <div>
            <div className="d-flex align-items-center auth px-0">
                <div className="row w-100 mx-0">
                    <div className="col-lg-4 mx-auto">
                        <div className="card  py-5 px-4 px-sm-5">
                            <div className="brand-logo text-center">
                                <img src={imageLogo} alt="logo" />
                            </div>
                            <h4>Reset password</h4>
                            <h6 className="font-weight-light">Enter your email to reset your password.</h6>
                            <Form className="pt-3 text-left" onSubmit={handleSubmit}>
                                <Form.Group className="d-flex search-field">
                                    <Form.Control type="email" name='email' placeholder="Email" size="lg" className="h-auto" />
                                </Form.Group>
                                <div className="mt-3">
                                    <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" type='submit'>SEND</button>
                                </div>
                                <div className="my-2 d-flex justify-content-between align-items-center">
                                    <div className="">
                                    </div>
                                    <Link className="auth-link text-muted nav-link" to={'/login'}>Login here?</Link>
                                </div>
                                <div className="text-center mt-4 font-weight-light">
                                    {error}
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword
