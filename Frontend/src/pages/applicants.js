import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import image from '../images/minimal-job-vacancy-banner-for-social-media-post-we-are-hring-background-with-scribble-magnifying-glass-vector.jpg';

function JobApplicants() {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    const fetchJobApplications = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await fetch(`https://employease-3yl4.onrender.com/api/jobDetails/${jobId}/applications`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setApplications(data.applications || []);
        } else {
          console.error('Failed to fetch job applications');
        }
      } catch (error) {
        console.error('Error fetching job applications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobApplications();
  }, [jobId]);

  const updateApplicationStatus = async (applicationId, newStatus) => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`https://employease-3yl4.onrender.com/api/jobDetails/${jobId}/applications/${applicationId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const updatedApplications = applications.map(app =>
          app._id === applicationId ? { ...app, status: newStatus } : app
        );
        setApplications(updatedApplications);
        if (selectedApplication?._id === applicationId) {
          setSelectedApplication(prev => ({ ...prev, status: newStatus }));
        }
      } else {
        console.error('Failed to update application status');
      }
    } catch (error) {
      console.error('Error updating application status:', error);
    }
  };

  const handleViewClick = (applicationId) => {
    const application = applications.find(app => app._id === applicationId);
    setSelectedApplication(application);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="find-job-container" style={{minHeight:'80vh'}}>
      <h1>Job Applications</h1>

      {applications.length === 0 ? (
        <center>
          <p style={{ fontSize: '5rem', fontWeight: '900', marginTop: '10rem' }}>No applications received yet...</p>
        </center>
      ) : (
        <div className="job">
          <div className="job-list">
            {applications.map((application) => (
              <div key={application._id} className="job-box">
                <div className='top'>
                  <p><img src={image} alt="Applicant" />{application.user.username}</p>
                  <button onClick={() => handleViewClick(application._id)} style={{ color: 'white', backgroundColor: 'gray', border: 'white', borderRadius: '5px' }}>
                    <i className="bi bi-binoculars-fill"></i>
                  </button>
                </div>
                <hr />
                <div className="top">
                  <p>Status: {application.status}</p>
                  <div>
                    <button onClick={() => updateApplicationStatus(application._id, 'accepted')} style={{ color: 'white', backgroundColor: 'green', border: 'white', borderRadius: '5px', marginRight: '10px' }}>
                      <i className="bi bi-check-circle"></i> Accept
                    </button>
                    <button onClick={() => updateApplicationStatus(application._id, 'rejected')} style={{ color: 'white', backgroundColor: 'red', border: 'white', borderRadius: '5px' }}>
                      <i className="bi bi-x-circle"></i> Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="job-details">
            {selectedApplication ? (
              <div>
                <h2>Application Details</h2>
                <p><strong>Applicant:</strong> {selectedApplication.user.username}</p>
                <p><strong>Status:</strong> {selectedApplication.status}</p>
                <p><strong>Application ID:</strong> {selectedApplication._id}</p>
                <a href={`https://employease-3yl4.onrender.com/${selectedApplication.resume.replace(/\\/g, '/')}`} target="_blank" rel="noopener noreferrer">
                  View Resume
                </a>
                <p><strong>CV:</strong> {selectedApplication.cv}</p>

              </div>
            ) : (
              <p>Select an application to view details</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default JobApplicants;

