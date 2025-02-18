import React from 'react';
import './cont.css'; 
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';

const Trybox = () => {
  const navigate = useNavigate();
  const { isLoggedIn, isEmployee } = useAuth();

  const handleCreate = () => {
    {isLoggedIn ? (isEmployee ? navigate('/myjobs'):navigate('/findjob')):(navigate('/signin'))}
  };
  return (
    <section>
      <div className="try">
      <h2>whether you're looking to hire the best talent or land your dream job</h2>
      <h3>Sign up today to start posting jobs, applying for positions, and connecting with top talent and employers</h3>
      <button onClick={handleCreate}>Get Started Now</button>
    </div>
    </section>
  );
};

export default Trybox;
