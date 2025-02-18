
import React, { useState } from 'react';
import { sendResetCode } from '../store/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await sendResetCode(email);
    if(response.ok){
      toast.success('code send sucessfully to your mail');
      navigate('/reset');
    }else{
      toast.warn(response.msg || 'Failed to send code'); // Show the specific error message
    }
  };

  return (
    <div style={{minHeight:'90vh',paddingTop:'40vh'}}>
    <center>
    <form onSubmit={handleSubmit} className='slide-content'>
      <h4>Enter you Email here:</h4>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        style={{width:'50vh',minHeight:'3rem',fontSize:'1.5rem'}}
      />
      <br></br>
      <hr></hr>
      <button type="submit" >Send Reset Code</button>
    </form>
    </center>
    </div>
  );
};

export default ForgotPassword;

