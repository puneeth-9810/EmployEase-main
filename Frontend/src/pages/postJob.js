import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PostJob = () => {
  const [jobDetails, setJobDetails] = useState({
    jobRole: '',
    jobType: '',
    industry: '',
    minSalary: '',
    maxSalary: '',
    sections: [{ name: '', description: '' }],
    location: '',
    company: '',
    applicationDeadline: '',
  });
  const [posting, setPosting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (posting) {
      const timer = setTimeout(() => {
        window.location.href = '/myjobs';
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [posting, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails({ ...jobDetails, [name]: value });
  };

  const handleSectionChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSections = jobDetails.sections.map((section, i) =>
      i === index ? { ...section, [name]: value } : section
    );
    setJobDetails({ ...jobDetails, sections: updatedSections });
  };

  const addSection = () => {
    setJobDetails({ ...jobDetails, sections: [...jobDetails.sections, { name: '', description: '' }] });
  };

  const deleteSection = (index) => {
    const updatedSections = jobDetails.sections.filter((_, i) => i !== index);
    setJobDetails({ ...jobDetails, sections: updatedSections });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('https://employease-3yl4.onrender.com/api/jobDetails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jobDetails)
      });

      if (response.ok) {
        toast.success('Job posted successfully');
        setPosting(true);
      } else {
        toast.error('Failed to post job');
      }
    } catch (error) {
      toast.error('Error posting job:', error);
    }
  };

  if (posting) {
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
            Loading, please wait...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div style={{minHeight:'80vh',marginTop:'10vh'}}>
      <h1>Post a Job</h1>
      <form onSubmit={handleSubmit} className='apply-form' style={{gap:'10px'}}>
        <input type="text" name="jobRole" placeholder="Job Role" value={jobDetails.jobRole} onChange={handleChange} required />
        <input type="text" name="jobType" placeholder="Job Type" value={jobDetails.jobType} onChange={handleChange} required />
        <input type="text" name="industry" placeholder="Industry" value={jobDetails.industry} onChange={handleChange} required />
        <input type="text" name="minSalary" placeholder="Min Salary" value={jobDetails.minSalary} onChange={handleChange} required />
        <input type="text" name="maxSalary" placeholder="Max Salary" value={jobDetails.maxSalary} onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" value={jobDetails.location} onChange={handleChange} required />
        <input type="text" name="company" placeholder="Company" value={jobDetails.company} onChange={handleChange} required />
        <input type="date" name="applicationDeadline" placeholder="Application Deadline" value={jobDetails.applicationDeadline} onChange={handleChange} required />
        
        {jobDetails.sections.map((section, index) => (
          <div key={index}>
            <input type="text" name="name" placeholder="Section Name" value={section.name} onChange={(e) => handleSectionChange(index, e)} required />
            <textarea name="description" placeholder="Section Description" value={section.description} onChange={(e) => handleSectionChange(index, e)} required rows="10" cols="70"/>
            <button type="button" onClick={() => deleteSection(index)} style={{backgroundColor:'red',color:'white',height:'2rem',borderRadius:'10%',width:'6rem'}}>Delete Section</button>
          </div>
        ))}
        <br></br>
        <button type="button" onClick={addSection} style={{backgroundColor:'blue',color:'white',height:'2rem',borderRadius:'10%',width:'6rem'}}>Add Section</button>
        <br></br>
        <button type="submit" style={{backgroundColor:'green',color:'white',height:'2rem',borderRadius:'10%',width:'6rem'}}>Post Job</button>
      </form>
    </div>
  );
};

export default PostJob;
