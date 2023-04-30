import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import imageLogo from '../../assets/images/logo-main.png';
import authService from '../../services/authService';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('login')
    if (token) {
      // navigate('/')
    }
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      "email": event.target.email.value,
      "password": event.target.password.value
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

  const errorMessage = (error) => {
    console.log(error);
  };


  const responseMessage = (response) => {
    console.log(response);
    var res = response.profileObj;
    console.log(res);
    this.signup(response);
  }
  const signup = async (res) => {
    const googleresponse = {
      token: res.credential,
      ProviderId: 'Google',
    };
    const response = await authService.loginWithGoogle(googleresponse);
    if (!response.errorCode && !response.data.errorCode) {
      localStorage.setItem("token", response.data.data.jwt);
      localStorage.setItem("userRole", this.setRole(response.data.data.roles));
      localStorage.setItem("isLoggedIn", true);
      setError("Đăng nhập thành công")
      window.location.href = '/';
    } else {
      setError("Email hoặc mật khẩu sai")
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
              <h4>Hello! let's get started</h4>
              <h6 className="font-weight-light">Sign in to continue.</h6>
              <Form className="pt-3 text-left" onSubmit={handleSubmit}>
                <Form.Group className="d-flex search-field">
                  <Form.Control type="email" name='email' placeholder="Username" size="lg" className="h-auto" />
                </Form.Group>
                <Form.Group className="d-flex search-field">
                  <Form.Control type="password" name='password' placeholder="Password" size="lg" className="h-auto" />
                </Form.Group>
                <div className="mt-3">
                  <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" type='submit'>SIGN IN</button>
                </div>
                <div className="my-2 d-flex justify-content-between align-items-center">
                  <div className="form-check">
                    <label className="form-check-label text-muted">
                      <input type="checkbox" className="form-check-input" />
                      <i className="input-helper"></i>
                      Keep me signed in
                    </label>
                  </div>
                  <Link className="auth-link text-muted nav-link" to={'/user-pages/forgot-password'}>Forgot password?</Link>
                </div>
                <div className="mb-2">
                  <button type="button" className="btn btn-block auth-form-btn">
                  <meta name="referrer" content="no-referrer-when-downgrade" />
                    <GoogleLogin width="319px" locale='en'
                      onSuccess={responseMessage} onError={errorMessage} />
                  </button>
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

export default Login
