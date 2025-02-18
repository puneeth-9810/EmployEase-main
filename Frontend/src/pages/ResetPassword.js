import React, { useState } from 'react';
import { resetPassword } from '../store/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await resetPassword({ code, newPassword });

    if (response.ok) {
      toast.success('Password updated successfully');
      navigate('/signin'); 
    } else {
      toast.warn(response.msg || 'Failed to reset password');
    }
  };

  return (
    <div style={{minHeight:'90vh',paddingTop:'40vh'}}>
    <center>
    <form onSubmit={handleSubmit} className='slide-content'>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter reset code"
        required
        style={{width:'40vh',minHeight:'2.5rem',fontSize:'1.5rem'}}

      />
      <br></br>
      <hr></hr>
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="New password"
        required
        style={{width:'40vh',minHeight:'2.5rem',fontSize:'1.5rem'}}
      />
      <br></br>
      <hr></hr>
      <button type="submit">Reset Password</button>
    </form>
    </center>
    </div>
  );
};

export default ResetPassword;

