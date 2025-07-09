// src/components/Signup.jsx
import React, { useState } from 'react';
import './signup.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: false,
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const isStrongPassword = (pwd) =>
    pwd.length >= 6 && /[!@#$%^&*(),.?":{}|<>]/.test(pwd);

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      return setErrorMsg('All fields are required.');
    }

    if (!isValidEmail(form.email)) {
      return setErrorMsg('Please enter a valid email address.');
    }

    if (!isStrongPassword(form.password)) {
      return setErrorMsg('Password must be at least 6 characters and contain a symbol.');
    }

    if (form.password !== form.confirmPassword) {
      return setErrorMsg('Passwords do not match.');
    }

    if (!form.agree) {
      return setErrorMsg('You must agree to the terms and conditions.');
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/signup',
        {
          name: form.name,
          email: form.email,
          password: form.password,
        },
        { withCredentials: true }
      );

      if (response.status === 201 && response.data.user?.id) {
        setSuccessMsg('Signup successful! Proceeding to onboarding...');
        setTimeout(() => {
          navigate('/favorite-onboarding', {
            state: { id: response.data.user.id },
          });
        }, 1000);
      } else {
        setErrorMsg('Unexpected response. Please try again.');
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-card">
        <h2 className="mb-4 text-center">Sign Up for SmartGuide</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingName"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <label htmlFor="floatingName">Full Name</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingEmail"
              name="email"
              placeholder="name@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="floatingEmail">Email address</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingConfirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
            <label htmlFor="floatingConfirmPassword">Confirm Password</label>
          </div>

          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              name="agree"
              id="terms"
              checked={form.agree}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="terms">
              I agree to the <a href="/Terms">terms and conditions</a>
            </label>
          </div>

          {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
          {successMsg && <div className="alert alert-success">{successMsg}</div>}

          <button type="submit" className="btn btn-primary w-100 mb-2">
            Continue
          </button>

          <div className="text-center">
            <span>Already have an account?</span>
            <button
              type="button"
              className="btn btn-link"
              onClick={() => navigate('/login')}
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
