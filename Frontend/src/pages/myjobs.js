
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';

function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchJobs = async () => {
      const token = localStorage.getItem('token'); 

      try {
        const response = await fetch('https://employease-3yl4.onrender.com/api/jobDetails', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          const userJobs = data.filter(job => user.jobdetails.includes(job._id));
          setJobs(userJobs);
        } else {
          console.error('Failed to fetch jobs');
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    if (user) {
      fetchJobs();
    }
  }, [user]);

  const handleViewClick = (jobId) => {
    const job = jobs.find(job => job._id === jobId);
    setSelectedJob(job);
  };

  const handlePostJobs = () => {
    navigate('/postjobs');
  }


  return (
    <div className="find-job-container" style={{minHeight:'80vh'}}>
      <h1>My Posted Jobs</h1>
      <button onClick={handlePostJobs} style={{ backgroundColor: 'green', height: '2.5rem', color: 'white', fontWeight: '700', borderRadius: '5px', marginBottom: '1rem', marginLeft: '95%' }}>
        Post Jobs
      </button>
      {jobs.length === 0 ? (
        <center>
        <p style={{ fontSize: '5rem', fontWeight: '900', marginTop: '10rem' }}>No jobs posted yet...</p>
        </center>
      ) : (
        <div className="job">
          <div className="job-list">
            {jobs.map((job) => (
              <div key={job._id} className="job-box">
                <div className='top'>
                  <h3>{job.jobRole}</h3>
                  <button onClick={() => handleViewClick(job._id)} style={{ color: 'white', backgroundColor: 'gray', border: 'white', borderRadius: '5px' }}>
                    <i className="bi bi-binoculars-fill"></i>
                  </button>
                </div>
                <hr />
                <div className='down'>
                  <p style={new Date(job.applicationDeadline) > new Date() ? { color: 'green' } : { color: 'red' }}>
                    {new Date(job.applicationDeadline) > new Date() ? <span>Active</span> : <span>InActive</span>}
                  </p>
                  <p>Application Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}</p>
                  <p>Posted Date: {new Date(job.postedDate).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="job-details">
            {selectedJob ? (
              <div>
                <h2>{selectedJob.jobRole}</h2>
                <p><strong>Company:</strong> {selectedJob.company}</p>
                <p><strong>Location:</strong> {selectedJob.location}</p>
                <p><strong>Industry:</strong> {selectedJob.industry}</p>
                <p><strong>Job Type:</strong> {selectedJob.jobType}</p>
                <p><strong>Salary Range:</strong> ${selectedJob.minSalary} - ${selectedJob.maxSalary}</p>
                <p><strong>Application Deadline:</strong> {new Date(selectedJob.applicationDeadline).toLocaleDateString()}</p>
                {selectedJob.sections.map((section, index) => (
                  <div key={index}>
                    <h3>{section.name}</h3>
                    <p>{section.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>Select a job to view details</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default MyJobs;
