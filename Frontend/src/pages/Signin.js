import React, { useEffect, useState } from 'react';
import './pagestyles.css';
import { useNavigate } from 'react-router-dom';
import { auth, provider1, provider2 } from './config';
import { signInWithPopup } from 'firebase/auth';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';


function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [employee, setEmployee] = useState(false);
  const navigate = useNavigate();
  const { isEmployee,storeTokenInLS, isLoggedIn } = useAuth();

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://employease-3yl4.onrender.com/api/auth/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password , employee }),
      });

      if (response.ok) {
        const res_data = await response.json();
        storeTokenInLS(res_data.token);
        toast.success('Successfully signed in');
        if (employee) {
          navigate('/employeedashboard');
        }
        else{
          navigate('/dashboard');
        }

      } else {
        const errorData = await response.json();
        console.error('Login error:', errorData);
        toast.warn(errorData.msg || 'Login failed');

      }
    } catch (error) {
      console.error('Error signing in:', error);
      toast.warning('Failed to sign in');
    }
  };

  const handleSocialLogin = async (provider) => {
    try {
      const data = await signInWithPopup(auth, provider);
      const token = await data.user.getIdToken();
      const response = await fetch('https://employease-3yl4.onrender.com/api/firebase/social-login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });
      if (response.ok) {
        const res_data = await response.json();
        storeTokenInLS(res_data.token);
        toast.success('Successfully signed in with social account');
        if (res_data.user && !res_data.user.personalDetails) {
          navigate('/Info');
        } else {
          navigate('/dashboard');
        }
      } else {
        toast.warning('Failed to sign in with social account');
      }
    } catch (error) {
      console.error('Error with social login:', error);
      toast.warning('Failed to sign in with social account');
    }
  };


  return (
    <div className='signin'>
      <div className="signin-container">
        <div className="signin-box">
          <div className="signin-header">
            <h2>EmployEase</h2>
            <hr></hr>
          </div>
          <form onSubmit={handleSignIn}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                className="form-control" 
                id="email" 
                placeholder="akshay@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select 
                className="form-control" 
                id="role" 
                value={employee} 
                onChange={(e) => setEmployee(e.target.value === 'true')}
                required
              >
                <option value="false">Job Seeker</option>
                <option value="true">Employee</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-group">
                <input 
                  type="password" 
                  className="form-control" 
                  id="password" 
                  placeholder="***********" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                  required
                />
              </div>
            </div>
            <div className="form-check">
              <a href="/forgot" className="forgot-password">Forgot Password?</a>
            </div>
            <button type="submit" className="btn btn-primary btn-block">Sign In</button>
          </form>
          <div className="or-use">
            <span>OR USE</span>
          </div>
          <div className="social-login">
            <button className="btn btn-outline-secondary" onClick={() => handleSocialLogin(provider1)}><i className="fa fa-google"></i></button>
            {/* <button className="btn btn-outline-secondary" onClick={() => handleSocialLogin(provider3)}><i className="fa fa-facebook"></i></button> */}
            {/* <button className="btn btn-outline-secondary" onClick={() => handleSocialLogin(provider2)}><i className="fa fa-github"></i></button> */}
          </div>
          <span>No Account?</span>
          <button type="submit" className="btn btn-primary btn-block" onClick={handleSignUpClick}>Register now</button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
