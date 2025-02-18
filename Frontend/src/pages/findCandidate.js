import React, { useState, useEffect } from 'react';
import image from '../images/minimal-job-vacancy-banner-for-social-media-post-we-are-hring-background-with-scribble-magnifying-glass-vector.jpg';
import './pagestyles.css';
function FindCandidate() {
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [filters, setFilters] = useState({
    employmentStatus: '',
    jobRoleTitle: '',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [candidatesData, setCandidatesData] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  useEffect(() => {
    fetch('https://employease-3yl4.onrender.com/api/personalDetails')
      .then((response) => response.json())
      .then((data) => {
        setCandidatesData(data);
        setFilteredCandidates(data);
        if (data.length > 0) {
          setSelectedCandidate(data[0]);
        }
      })
      .catch((error) => {
        console.error('Error fetching candidate data:', error);
      });
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleSearch = () => {
    const filtered = candidatesData.filter((candidate) => {
      const matchesEmploymentStatus = filters.employmentStatus 
        ? candidate.employmentStatus && candidate.employmentStatus.toLowerCase() === filters.employmentStatus.toLowerCase() 
        : true;
      const matchesJobRoleTitle = filters.jobRoleTitle 
        ? candidate.jobRoleTitle && candidate.jobRoleTitle.toLowerCase().includes(filters.jobRoleTitle.toLowerCase()) 
        : true;

      return (
        (candidate.firstName && candidate.firstName.toLowerCase().includes(search.toLowerCase()) || 
         candidate.lastName && candidate.lastName.toLowerCase().includes(search.toLowerCase())) &&
        (candidate.location && candidate.location.toLowerCase().includes(location.toLowerCase())) &&
        matchesEmploymentStatus &&
        matchesJobRoleTitle
      );
    });

    setFilteredCandidates(filtered);
  };

  const handleViewClick = (candidateId) => {
    const candidate = candidatesData.find(cand => cand._id === candidateId);
    setSelectedCandidate(candidate);
  };

  return (
    <div className="find-job-container" style={{minHeight:'80vh'}}>
      <h1>Find a Candidate</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="👤 Name"
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
            <label>Employment Status:</label>
            <select name="employmentStatus" onChange={handleFilterChange}>
              <option value="">Select Employment Status</option>
              <option value="Employed">Employed</option>
              <option value="Unemployed">Unemployed</option>
              <option value="Student">Student</option>
            </select>
          </div>
          <div>
            <label>Job Role Title:</label>
            <input
              type="text"
              name="jobRoleTitle"
              placeholder="Job Role Title"
              value={filters.jobRoleTitle}
              onChange={handleFilterChange}
            />
          </div>
        </div>
      )}

      <div className="job-container">
        <div className="job">
          <div className="job-list">
            {filteredCandidates.map((candidate) => (
              <div key={candidate._id} className="job-box">
                <div className='top'>
                  <p><img src={candidate.image ? `https://employease-3yl4.onrender.com/${candidate.image.replace(/\\/g, '/')}`:(image)}  alt="Candidate" />{candidate.firstName} {candidate.lastName}</p>
                  <button onClick={() => handleViewClick(candidate._id)} style={{color:'white',backgroundColor:'gray',border:'white',borderRadius:'5px'}}>
                    <i className="bi bi-binoculars-fill"></i>
                  </button>
                </div>
                <hr></hr>
                <div className='down'>
                  <p>{candidate.jobTitle}</p>
                  <p>Location: {candidate.location}</p>
                  <p>Employment Status: {candidate.employmentStatus}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="job-details">
            {selectedCandidate ? (
              <>
              <div className='banner' style={{height:'20vh',display:'flex',flexDirection:'row'}}>
                 <img src={selectedCandidate.image ? `https://employease-3yl4.onrender.com/${selectedCandidate.image.replace(/\\/g, '/')}`:(image)} alt="Company Logo" 
                style={{
                  height:'20vh',
                  width:'20vh',
                  backgroundSize: 'cover',
                  borderRadius:'50%',
                  backgroundPosition: 'center',
                }}/>
                <h2 style={{marginTop:'13vh'}}>{selectedCandidate.firstName} {selectedCandidate.lastName}</h2>
              </div>
              <hr></hr>
                <div >
                <p><strong>Job Title:</strong> {selectedCandidate.jobTitle}</p>
                <p><strong>Location:</strong> {selectedCandidate.location}</p>
                <p><strong>Employment Status:</strong> {selectedCandidate.employmentStatus}</p>
                <p><strong>Professional Email:</strong> {selectedCandidate.professionalEmail}</p>
                <p><strong>Phone:</strong> {selectedCandidate.phone}</p>
                <p><strong>LinkedIn:</strong> {selectedCandidate.linkedin}</p>
                <p><strong>github:</strong> {selectedCandidate.github}</p>
                </div>
                </>
            ) : (
              <p>Select a candidate to view details</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FindCandidate;
