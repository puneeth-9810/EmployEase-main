import React, { useEffect, useState } from "react";
import "./pagestyles.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import image from "../images/download4.jpeg";

function Dashboard() {
  const navigate = useNavigate();
  const { user, loading, isLoggedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(loading);
  const [personalDetails, setPersonalDetails] = useState(null)

  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);

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
    if (user?._id) {
      const token = localStorage.getItem("token");
      const userId = user._id;

      // Fetch personal details
      fetch(
        `https://employease-3yl4.onrender.com/api/personalDetails/${user.personalDetails}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setPersonalDetails(data);
        })
        .catch((error) => {
          toast.error("Error fetching personal details");
          console.error("Error fetching personal details:", error);
        });

      // Fetch saved jobs
      fetch(`https://employease-3yl4.onrender.com/api/savedJobs/${userId}/saved`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setSavedJobs(data);
        })
        .catch((error) => {
          toast.error("Error fetching saved jobs");
          console.error("Error fetching saved jobs:", error);
        });

      setAppliedJobs(user.appliedJobs);
    }
  }, [user?._id,personalDetails]);

  if (isLoading ) {
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
    <div className="dashboard" style={{ minHeight: "80vh" }}>
      <div className="container-fluid1">
        <div className="header1">
          <h1>Seeker Dashboard</h1>
        </div>
        {personalDetails?.firstName ?
        <div className="personal-details">
          <img
            src={
              personalDetails?.image
                ? `https://employease-3yl4.onrender.com/${personalDetails.image.replace(
                    /\\/g,
                    "/"
                  )}`
                : image
            }
            alt="Profile"
            style={{ width: "2in" }}
            className="job-list"
          />
          <div className="details">
            <p>
              <strong>First Name:</strong> {personalDetails?.firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {personalDetails?.lastName}
            </p>
            <p>
              <strong>Employment Status:</strong>{" "}
              {personalDetails?.employmentStatus}
            </p>
            <p>
              <strong> Job Title:</strong> {personalDetails?.jobTitle}
            </p>
          </div>
          <div className="details">
            <p>
              <strong>Email:</strong> {personalDetails?.professionalEmail}
            </p>
            <p>
              <strong>Phone:</strong> {personalDetails?.phone}
            </p>
            <p>
              <strong>Address:</strong> {personalDetails?.location}
            </p>
            <p>
              <strong>LinkedIn:</strong> {personalDetails?.linkedin}
            </p>
            <p>
              <strong>Github:</strong> {personalDetails?.github}
            </p>
          </div>
        </div>
        :<>
        <h1>PAGE DID'NT LOADED, REFRESH THE PAGE!!!</h1>

        </>
        }
        <div className="job-container">
          <div className="job">
            <ul className="job-details">
              <h2>Saved Jobs:</h2>
              {savedJobs.map((job) => (
                <li key={job._id} className="job-box" >
                  <h3>{job.jobRole}</h3>
                  <p>{job.company}</p>
                  <button onClick={() => navigate(`/findjob`)}>
                    View Job
                  </button>
                </li>
              ))}
            </ul>
          <div className="job-details">
          <h2>Applied Jobs:</h2>
          <ul>
            {appliedJobs.map((job) => (
              <li key={job._id} className="job-box">
                <h3>{job.jobRole}</h3>
                <p>{job.company}</p>
                <p>Status: {job.status}</p>
                <button onClick={() => navigate(`/findjob`)}>
                  View Job
                </button>
              </li>
            ))}
          </ul>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
