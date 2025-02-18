import React from 'react';
import './cont.css';
import Image from '../images/minimal-job-vacancy-banner-for-social-media-post-we-are-hring-background-with-scribble-magnifying-glass-vector.jpg';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';

const About = () => {

  const navigate = useNavigate();
  const { isLoggedIn,isEmployee } = useAuth();

  const handleCreate = () => {

    {isLoggedIn ? (
      isEmployee ?
      navigate('/myjobs'):
      navigate('/findjob')
    ):(navigate('/signin'))}
  };
  return (
    <div className="resume-builder-container">
      <div className="resume-builder-content">
        <h1>Connecting Top Talent with Leading Employers</h1>
        <p>
        Join our <span style={{fontWeight:'700'}}>EmployEase</span> platform to access a vast network of job opportunities and qualified candidates.
         Whether you're a job seeker aiming to take the next step in your career or an employer seeking the ideal candidate to fill your positions, our platform offers 
        the tools and resources to make it happen. Streamline your job search or hiring process with us.  
        </p>
        <button className="aboutbutton" onClick={handleCreate}>Get Started Now</button>
      </div>
      <div className="resume-builder-image" style={{width:'80vh'}}>
        <img src={Image} alt="Man holding resume" />
      </div>
    </div>
  );
};

export default About;
