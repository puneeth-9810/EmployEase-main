import React, { useEffect, useState } from "react";
import "./pagestyles.css";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import image from '../images/download2.png';
import company from '../images/company.jpeg'

function Dashboard() {
  const navigate = useNavigate();
  const { user, loading, isLoggedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(loading);
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [jobStats, setJobStats] = useState({
    totalJobsPosted: 0,
    activeJobs: 0,
    inactiveJobs: 0,
    totalApplicants: 0,
  });
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    setIsLoading(loading);
    if (loading) {
      const timer = setTimeout(() => {
        window.location.reload();
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [loading, isLoggedIn, navigate]);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await fetch(
          `https://employease-3yl4.onrender.com/api/employeeDetails/${user.employeeDetails}`
        );
        const data = await response.json();
        setEmployeeDetails(data);
      } catch (error) {
      }
    };

    const fetchJobStats = async () => {
      try {
        const jobDetails = await Promise.all(
          user.jobdetails.map(async (jobId) => {
            const response = await fetch(
              `https://employease-3yl4.onrender.com/api/jobDetails/${jobId}`
            );
            return response.json();
          })
        );

        const totalJobsPosted = jobDetails.length;
        const activeJobs = jobDetails.filter(
          (job) => new Date(job.applicationDeadline) > new Date()
        ).length;
        const inactiveJobs = totalJobsPosted - activeJobs;
        const totalApplicants = jobDetails.reduce(
          (acc, job) => acc + job.applications.length,
          0
        );

        setJobStats({
          totalJobsPosted,
          activeJobs,
          inactiveJobs,
          totalApplicants,
        });
        setJobs(jobDetails);
      } catch (error) {
        toast.error("Failed to fetch job statistics");
      }
    };

    if (user) {
      fetchEmployeeDetails();
      fetchJobStats();
    }
  }, [user]);

  if (isLoading || !employeeDetails ) {
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
            Loading! Refresh the page...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="Dashboard">
      <div className="container-fluid1">
        <div className="header1">
          <h1>Employee Dashboard</h1>
        </div>
        {employeeDetails && (
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
            src={employeeDetails.banner ? `https://employease-3yl4.onrender.com/${employeeDetails.banner.replace(/\\/g, '/')}` : company}
            alt="Company Banner"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <img
            src={employeeDetails.logo ? `https://employease-3yl4.onrender.com/${employeeDetails.logo.replace(/\\/g, '/')}` : image}
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
        )};
      <div className="main-content">
      <div>
            {employeeDetails && (
              
              <div className="employee-details">
                <p>
                  <strong>First Name:</strong> {employeeDetails.firstName}
                </p>
                <p>
                  <strong>Last Name:</strong> {employeeDetails.lastName}
                </p>
                <p>
                  <strong>Professional Email:</strong>{" "}
                  {employeeDetails.professionalEmail}
                </p>
                <p>
                  <strong>Company:</strong> {employeeDetails.company}
                </p>
                <p>
                  <strong>Job Title:</strong> {employeeDetails.jobTitle}
                </p>
                <p>
                  <strong>Phone:</strong> {employeeDetails.phone}
                </p>
                <p>
                  <strong>Website:</strong> {employeeDetails.website}
                </p>
                <p>
                  <strong>Headquarters:</strong> {employeeDetails.headquaters}
                </p>
                <p>
                  <strong>Company Type:</strong> {employeeDetails.type}
                </p>
                <p>
                  <strong>Company Size:</strong> {employeeDetails.size}
                </p>
              </div>
            )}
          </div>
          <h3>Job Statistics:</h3>
          <div className="job-stats">
            <p>
              <strong>Total Jobs Posted:</strong> <hr></hr>
              {jobStats.totalJobsPosted}
            </p>
            <p>
              <strong>Active Jobs:</strong> <hr></hr> {jobStats.activeJobs}
            </p>
            <p>
              <strong>Inactive Jobs:</strong>  <hr></hr> {jobStats.inactiveJobs}
            </p>
            <p>
              <strong>Total Applicants:</strong>  <hr></hr>{jobStats.totalApplicants}
            </p>
          </div>
        </div>
        {/* <div className="job-container">
        <div className="job">
        <div className="job-list">
          {jobs.map((job) => (
            <div key={job._id} className="job-box">
              <p>
                <strong>Job Role:</strong> {job.jobRole}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {new Date(job.applicationDeadline) > new Date()
                  ? "Active"
                  : "Inactive"}
              </p>
              <p>
                <strong>Application Deadline:</strong>{" "}
                {new Date(job.applicationDeadline).toLocaleDateString()}
              </p>
              <p>
                <strong>Number of Applicants:</strong> {job.applications.length}
              </p>
              <Link to={`/${job._id}/applicants`}>View Applicants</Link>
            </div>
          ))}
        </div>
        </div>
        </div> */}
      </div>
    </div>
  );
}

export default Dashboard;
