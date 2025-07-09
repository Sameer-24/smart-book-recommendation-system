import React, { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showSignupOption, setShowSignupOption] = useState(false);

  const validatePassword = (pwd) => {
    const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
    return pwd.length >= 6 && symbolRegex.test(pwd);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setShowSignupOption(false);

    if (!email || !password) {
      setErrorMsg('Email and password cannot be empty.');
      return;
    }

    if (!validatePassword(password)) {
      setErrorMsg('Password must be at least 6 characters and contain at least one symbol.');
      return;
    }

    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/login',
        { email, password },
        { withCredentials: true }
      );

      if (res.status === 200) {
        const meRes = await axios.get('http://localhost:5000/api/auth/me', {
          withCredentials: true,
        });
        login(meRes.data);
        navigate('/');
      }
    } catch (err) {
      if (err.response?.data?.message === 'User not found') {
        setShowSignupOption(true);
        setErrorMsg('User not found. Would you like to sign up instead?');
      } else if (err.response?.data?.message) {
        setErrorMsg(err.response.data.message);
      } else {
        setErrorMsg('Login failed. Please try again later.');
      }
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="mb-4 text-center">Login to SmartGuide</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingEmail"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="floatingEmail">Email address</label>
          </div>

          <div className="mb-3 position-relative">
            <div className="form-floating">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control custom-password"
                id="floatingPassword"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="eye-icon"
            >
              <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
            </span>
          </div>

          {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

          <button type="submit" className="btn btn-primary w-100">
            Sign In
          </button>
        </form>

        {showSignupOption && (
          <div className="text-center mt-3">
            <button
              className="btn btn-outline-success"
              onClick={() => navigate('/signup')}
            >
              Sign Up Instead
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
