import React, { useState, useEffect } from 'react';
import './pagestyles.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';

function SignUp() {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [employee, setEmployee] = useState(false);
  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  useEffect(() => {
    if (password && confirmPassword) {
      setPasswordMatch(password === confirmPassword);
    } else {
      setPasswordMatch(true);
    }
  }, [password, confirmPassword]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (passwordMatch) {
      try {
        const response = await fetch('https://employease-3yl4.onrender.com/api/auth/register', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password, employee }),
        });

        if (response.ok) {
          const res_data = await response.json();
          storeTokenInLS(res_data.token);
          toast.success('Successfully signed up');
          navigate('/Info');
        } else {
          toast.warning('Failed to sign up');
        }
      } catch (error) {
        console.error('Error signing up:', error);
        toast.warning('Failed to sign up');
      }
    } else {
      toast.warning('Passwords do not match');
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
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">User Name</label>
              <input 
                type="text" 
                className="form-control" 
                id="username" 
                placeholder="akshay" 
                value={username}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
                placeholder='select role'
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
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-group">
                <input 
                  type="password" 
                  className="form-control" 
                  id="confirmPassword" 
                  placeholder="***********" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              {!passwordMatch && (
                <span style={{ color: 'red' }}>Passwords do not match</span>
              )}
            </div>
            
            <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
