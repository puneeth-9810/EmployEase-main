import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../store/auth';

const ApplyJob = () => {
  const { jobId } = useParams();
  const [resume, setResume] = useState(null);
  const [cv, setCv] = useState('');
  const [personalDetails, setPersonalDetails] = useState({});
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      const timer = setTimeout(() => {
        window.location.reload();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [user]);

  useEffect(() => {
    const fetchPersonalDetails = async () => {
      if (user?.personalDetails) {
        try {
          const response = await fetch(`https://employease-3yl4.onrender.com/api/personalDetails/${user.personalDetails}`);
          if (response.ok) {
            const data = await response.json();
            setPersonalDetails(data); // Access the personal details from the response
          } else {
            console.error('Failed to fetch personal details');
          }
        } catch (error) {
          console.error('Error fetching personal details:', error);
        }
      }
    };

    fetchPersonalDetails();
  }, [user]);

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleCvChange = (e) => {
    setCv(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formData = new FormData();
    if (resume) formData.append('resume', resume);
    formData.append('userId', user._id);
    formData.append('cv', cv);

    try {
      const response = await fetch(`https://employease-3yl4.onrender.com/api/jobDetails/${jobId}/apply`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        toast.success('Application submitted successfully');
        navigate('/findjob');
      } else {
        const errorText = await response.text();
        toast.error(`Failed to submit application: ${errorText}`);
      }
    } catch (error) {
      toast.error('Error submitting application');
      console.error('Error:', error);
    }
  };

  if (!user) {
    return (
      <div>
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <iframe
            src="https://lottie.host/embed/e573adcc-c17c-417d-a59b-68815ef11c83/2xqVlTWA48.json"
            title="Loading animation"
            width="900"
            height="700"
            style={{ border: "none" }}
          />
          <h2 style={{ fontFamily: "serif", paddingBottom: "50px" }}>
            Refresh the page
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div style={{minHeight:'80vh',marginTop:'10vh'}}>
      <form onSubmit={handleSubmit} className='apply-form'>
      <div>
      {personalDetails && (
        <div>
          <h5>Personal Details:</h5>
          <p>First Name: {personalDetails.firstName}</p>
          <p>Last Name: {personalDetails.lastName}</p>
          <p>Professional Email: {personalDetails.professionalEmail}</p>
          <p>Employment Status: {personalDetails.employmentStatus}</p>
          <p>Phone: {personalDetails.phone}</p>
          <p>Location: {personalDetails.location}</p>
          <p>LinkedIn: <a href={personalDetails.linkedin} target="_blank" rel="noopener noreferrer">linkedin-clickHere</a></p>
          <p>GitHub: <a href={personalDetails.github} target="_blank" rel="noopener noreferrer">github-clickHere</a></p>
        </div>
      )}
      </div>
      <div>
      <label >
          <h5>Enter Your CV:</h5>
          <textarea placeholder="Enter your CV" value={cv} onChange={handleCvChange} required rows="10" cols="70"></textarea>
        </label>
      </div>
      <div>
      <label>
          <h5><strong>Upload Resume:</strong><span style={{color:"red",fontSize:'1rem'}}> accepted:*.pdf,*.jpg,*.jpeg,*.png</span></h5>
          <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} required />
        </label>
      </div>
      <button type="submit" style={{backgroundColor:'green',color:'white',height:'2rem',borderRadius:'10%',width:'6rem'}}>Apply</button>
      </form>
    </div>
  );
};

export default ApplyJob;

