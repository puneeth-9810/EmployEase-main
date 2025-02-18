import React, { useState, useEffect } from 'react';
import './pagestyles.css';
import image from '../images/minimal-job-vacancy-banner-for-social-media-post-we-are-hring-background-with-scribble-magnifying-glass-vector.jpg';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';

function FindJob() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const { userID, user } = useAuth();
  const [filters, setFilters] = useState({
    industry: '',
    jobType: '',
    salaryRange: [0, 100000],
  });
  const [showFilters, setShowFilters] = useState(false);
  const [jobsData, setJobsData] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    // Fetch job details and saved jobs
    const fetchJobData = async () => {
      try {
        const jobResponse = await fetch('https://employease-3yl4.onrender.com/api/jobDetails');
        const jobData = await jobResponse.json();
        console.log('Fetched job data:', jobData);
        setJobsData(jobData);
        setFilteredJobs(jobData);
        if (jobData.length > 0) {
          fetchJobDetail(jobData[0]._id); // Fetch details of the first job by default
        }
      } catch (error) {
        console.error('Error fetching job data:', error);
      }
    };

    const fetchSavedJobs = async () => {
      try {
        const token = localStorage.getItem('token');
        const savedJobsResponse = await fetch(`https://employease-3yl4.onrender.com/api/savedJobs/${userID}/saved`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const savedJobsData = await savedJobsResponse.json();
        console.log('Fetched saved jobs:', savedJobsData);
        setSavedJobs(savedJobsData.savedJobs || []); // assuming the API returns a list of saved job IDs
      } catch (error) {
        console.error('Error fetching saved jobs:', error);
      }
    };

    fetchJobData();
    fetchSavedJobs();
  }, [userID]);
  
  

  const fetchJobDetail = async (jobId) => {
    try {
      const response = await fetch(`https://employease-3yl4.onrender.com/api/jobDetails/${jobId}`);
      const data = await response.json();
      console.log('Fetched job detail:', data);
      setSelectedJob(data);
    } catch (error) {
      console.error('Error fetching job detail:', error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const apply = (jobId) => {
    navigate(`/${jobId}/apply`);
  };

  const handleSearch = () => {
    const minSalaryFilter = filters.salaryRange[0];
    const maxSalaryFilter = filters.salaryRange[1];
  
    const filtered = jobsData.filter((job) => {
      const jobMinSalary = parseInt(job.minSalary, 10);
    const jobMaxSalary = parseInt(job.maxSalary, 10);

    const withinSalaryRange =
      jobMinSalary >= minSalaryFilter && jobMaxSalary <= maxSalaryFilter;
      const matchesIndustry = filters.industry ? job.industry === filters.industry : true;
      const matchesJobType = filters.jobType ? job.jobType === filters.jobType : true;
      const matchesLocation = location ? job.location.toLowerCase().includes(location.toLowerCase()) : true;
      const matchesSearch = search ? (
        (job.jobRole && job.jobRole.toLowerCase().includes(search.toLowerCase())) ||
        (job.company && job.company.toLowerCase().includes(search.toLowerCase()))
      ) : true;
      return (
        withinSalaryRange &&
        matchesIndustry &&
        matchesJobType &&
        matchesLocation &&
        matchesSearch
      );
    });
  
    setFilteredJobs(filtered);
  };
  
  

  const handleSaveClick = async (jobId) => {
    const isJobSaved = savedJobs.includes(jobId);
    setSavedJobs((prevSavedJobs) =>
      isJobSaved ? prevSavedJobs.filter((id) => id !== jobId) : [...prevSavedJobs, jobId]
    );

    const method = isJobSaved ? 'DELETE' : 'POST';
    const endpoint = isJobSaved ? 'remove' : 'save';
    const token = localStorage.getItem('token');
    const userId = user._id;

    try {
      const response = await fetch(`https://employease-3yl4.onrender.com/api/savedJobs/${endpoint}`, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, jobId }),
      });
      const data = await response.json();
      console.log(`Job ${isJobSaved ? 'unsaved' : 'saved'}:`, data);
    } catch (error) {
      console.error(`Error ${isJobSaved ? 'unsaving' : 'saving'} job:`, error);
    }
  };

  const handleViewClick = (jobId) => {
    fetchJobDetail(jobId);
  };

  return (
    <div className="find-job-container" style={{ minHeight: "80vh" }}>
      <h1>Find a Job</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="👤 Job title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="text"
          placeholder="🌍 Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={handleSearch}><i className="bi bi-search"></i> Search</button>
        <button onClick={() => setShowFilters(!showFilters)}><i className="bi bi-funnel-fill"></i> 
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {showFilters && (
        <div className="filters">
          <h2>Filters</h2>
          <div>
            <label>Industry:</label>
            <select name="industry" onChange={handleFilterChange}>
              <option value="">Select Industry</option>
              <option value="Finance">Finance & Accounting</option>
              <option value="IT">IT & Software</option>
              <option value="Design">Design</option>
            </select>
          </div>
          <div>
            <label>Job Type:</label>
            <select name="jobType" onChange={handleFilterChange}>
              <option value="">Select Job Type</option>
              <option value="Full-time">Full-Time</option>
              <option value="part-time">Part-Time</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
          <div>
            <label>Salary Range:</label>
            <input
              type="number"
              placeholder="Min Salary"
              value={filters.salaryRange[0]}
              onChange={(e) => setFilters({ ...filters, salaryRange: [e.target.value, filters.salaryRange[1]] })}
            />
            <input
              type="number"
              placeholder="Max Salary"
              value={filters.salaryRange[1]}
              onChange={(e) => setFilters({ ...filters, salaryRange: [filters.salaryRange[0], e.target.value] })}
            />
          </div>
        </div>
      )}
      <hr></hr>
      <div className="job-container">
        <div className="job">
          <ul className="job-list">
            {filteredJobs.map((job) => (
              <li key={job._id} className="job-box">
                <div className="top">
                  <p><img src={image} alt="Company logo"/>{job.company}</p>
                  <div>
                    <button onClick={() => handleViewClick(job._id)} style={{backgroundColor:"black",color:'white',fontWeight:'500',marginRight:'1rem'}}>View</button>
                    <button onClick={() => handleSaveClick(job._id)}>
                      {savedJobs.includes(job._id) ? (
                        <i className="bi bi-bookmarks-fill"></i>
                      ) : (
                        <i className="bi bi-bookmarks"></i>
                      )}
                    </button>
                  </div>
                </div>
                <hr />
                <div className="down">
                  <h3>{job.jobRole}</h3>
                  <p style={new Date(job.applicationDeadline) > new Date() ? {color: 'green'} : {color: 'red'}}>
                    {new Date(job.applicationDeadline) > new Date() ? <span>Active</span> : <span>Inactive</span>}
                  </p>
                  <p>Application Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}</p>
                  <p>Location: {job.location}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="job-details">
            {selectedJob ? (
              <div>
                <h2>{selectedJob.jobRole}</h2>
                <button onClick={() => apply(selectedJob._id)} style={{backgroundColor:'black',height:'2.5rem',color:'white',fontWeight:'700',borderRadius:'5px',marginBottom:'1rem',marginLeft:'95%'}}>Apply</button>
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
      </div>
    </div>
  );
}
export default FindJob;