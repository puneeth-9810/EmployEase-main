import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../store/auth';

function JobList() {
  const [jobs, setJobs] = useState([]);
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

  return (
    <div className="find-job-container" style={{minHeight:'80vh'}}>
      <h1>Available Jobs</h1>
      <ul className='job' style={{justifyContent:'space-between', flexDirection:'row', flexWrap:'wrap'}}>
        {jobs.map((job) => (
          <li className='job-box' key={job._id} style={{width:'30%', marginBottom:'2rem'}}>
            <div className='top'>
              <h2>{job.jobRole}</h2>
              <p style={new Date(job.applicationDeadline) > new Date() ? {color: 'green'} : {color: 'red'}}>
                {new Date(job.applicationDeadline) > new Date() ? <span>Active</span> : <span>InActive</span>}
              </p> 
            </div>
            <hr />
            <div className='down'>
              <p>Application Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}</p>
              <p>Posted Date: {new Date(job.postedDate).toLocaleDateString()}</p>
              <Link to={`/${job._id}/applicants`}>View Applicants</Link>
            </div>
          </li>
        ))}
      </ul>
      {jobs.length> 0 ?(<></>):(<center>
          <p style={{ fontSize: '5rem', fontWeight: '900', marginTop: '10rem' }}>NO JOBS POSTED YET...</p>
        </center>)}
    </div>
  );
}

export default JobList;
