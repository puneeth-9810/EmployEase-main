import React, { useState, useEffect } from 'react';
import './pagestyles.css';
import image from '../images/download2.png';
import company from '../images/company.jpeg';

function FindEmployee() {
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [filters, setFilters] = useState({
    jobRole: '',
    company: '',
    companyType: '',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [employeesData, setEmployeesData] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    fetch('https://employease-3yl4.onrender.com/api/employeeDetails')
      .then((response) => response.json())
      .then((data) => {
        setEmployeesData(data);
        setFilteredEmployees(data);
        if (data.length > 0) {
          setSelectedEmployee(data[0]);
        }
      })
      .catch((error) => {
        console.error('Error fetching employee data:', error);
      });
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    const filtered = employeesData.filter((employee) => {
      const matchesJobRole = filters.jobRole ? employee.jobTitle.toLowerCase().includes(filters.jobRole.toLowerCase()) : true;
      const matchesCompany = filters.company ? employee.company.toLowerCase().includes(filters.company.toLowerCase()) : true;
      const matchesCompanyType = filters.companyType ? employee.type.toLowerCase() === filters.companyType.toLowerCase() : true;
      const matchesSearch = search ? (
        (employee.firstName && employee.firstName.toLowerCase().includes(search.toLowerCase())) ||
        (employee.lastName && employee.lastName.toLowerCase().includes(search.toLowerCase()))
      ) : true;
      const matchesLocation = location ? (employee.headquaters && employee.headquaters.toLowerCase().includes(location.toLowerCase())) : true;

      return matchesJobRole && matchesCompany && matchesCompanyType && matchesSearch && matchesLocation;
    });

    setFilteredEmployees(filtered);
  };

  const handleViewClick = (employeeId) => {
    const employee = employeesData.find(emp => emp._id === employeeId);
    setSelectedEmployee(employee);
  };

  return (
    <div className="find-job-container" style={{ minHeight: "80vh" }}>
      <h1>Find an Employee</h1>

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
            <label>Job Role:</label>
            <input
              type="text"
              name="jobRole"
              placeholder="Job Role"
              value={filters.jobRole}
              onChange={handleFilterChange}
            />
          </div>
          <div>
            <label>Company:</label>
            <input
              type="text"
              name="company"
              placeholder="Company"
              value={filters.company}
              onChange={handleFilterChange}
            />
          </div>
          <div>
            <label>Company Type:</label>
            <select name="companyType" onChange={handleFilterChange}>
              <option value="">Select Company Type</option>
              <option value="Private">Private</option>
              <option value="Public">Public</option>
            </select>
          </div>
        </div>
      )}
      <hr />
      <div className="job-container">
        <div className="job">
          <ul className="job-list">
            {filteredEmployees.map((employee) => (
              <li key={employee._id} className="job-box">
                <div className='top'>
                  <p><img src={employee.logo ? `https://employease-3yl4.onrender.com/${employee.logo.replace(/\\/g, '/')}` : image} alt="" />{employee.firstName} {employee.lastName}</p>
                  <button onClick={() => handleViewClick(employee._id)} style={{ color: 'white', backgroundColor: 'gray', border: 'white', borderRadius: '5px' }}>
                    <i className="bi bi-binoculars-fill"></i>
                  </button>
                </div>
                <hr />
                <div className='down'>
                  <p>{employee.jobTitle} at {employee.company}</p>
                  <p>Location: {employee.headquaters}</p>
                  <p>Company Type: {employee.type}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="job-details">
            {selectedEmployee ? (
              <>
                <div
                  className="banner"
                  style={{
                    position: 'relative',
                    height: '40vh',
                    width: '100%',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={selectedEmployee.banner ? `https://employease-3yl4.onrender.com/${selectedEmployee.banner.replace(/\\/g, '/')}` : company}
                    alt="Company Banner"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  <img
                    src={selectedEmployee.logo ? `https://employease-3yl4.onrender.com/${selectedEmployee.logo.replace(/\\/g, '/')}` : image}
                    alt="Company Logo"
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      left: '10px',
                      height: '20vh',
                      width: '20vh',
                      borderRadius: '50%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
                <center><h2 style={{ fontWeight: '900' }}>ABOUT US</h2></center>
                <hr />
                <div className='details'>
                  <div>
                    <p><strong>Employee Name:</strong> {selectedEmployee.firstName} {selectedEmployee.lastName}</p>
                    <p><strong>Company:</strong> {selectedEmployee.company}</p>
                    <p><strong>Company Type:</strong> {selectedEmployee.type}</p>
                    <p><strong>Website:</strong> {selectedEmployee.website}</p>
                    <p><strong>Mail:</strong> {selectedEmployee.professionalEmail}</p>
                  </div>
                  <div>
                    <p><strong>Job Title:</strong> {selectedEmployee.jobTitle}</p>
                    <p><strong>Location:</strong> {selectedEmployee.headquaters}</p>
                    <p><strong>Size:</strong> {selectedEmployee.size}</p>
                    <p><strong>Phone:</strong> {selectedEmployee.phone}</p>
                  </div>
                </div>
              </>
            ) : (
              <p>Select an employee to view details</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FindEmployee;
