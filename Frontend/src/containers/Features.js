import React from 'react';
import './cont.css';
import Images from './Images'; 

export default function Features() {
  return (
    <section>
      <div className='feature-component'>

        <div className='fea'>
          <center>
          <h2>EMPLOYEASE'S TWO-SIDED MARKETPLACE BRINGS UNIQUE CANDIDATES AND EMPLOYERS TOGETHER</h2>
          <h2 >POST YOUR JOBS OR SEARCH YOUR DREAM JOB</h2>
          </center>
        </div>

       
        <div className='feature'>
          <div className='left'>
            <img src={Images.logoImage1} alt="Post Jobs for Free" style={{objectFit:'cover'}}/>
          </div>
          <div className="right">
            <h3>Post Jobs for Free</h3>
            <p>Easily post job openings for free on EmployEase, reaching a broad audience of potential candidates with our intuitive job listing platform. Maximize your hiring potential without any financial commitment.</p>
          </div>
        </div>

        <div className='feature'>
          <div className='left'>
            <img src={Images.logoImage2} alt="Detailed Job Listings" />
          </div>
          <div className="right">
            <h3>Detailed Job Listings</h3>
            <p>Employers can create detailed job listings with comprehensive information about job roles, responsibilities, required qualifications, and company details.</p>
          </div>
        </div>

        <div className='feature'>
          <div className='left'>
            <img src={Images.logoImage3} alt="Advanced Search Filters" />
          </div>
          <div className="right">
            <h3>Advanced Search Filters</h3>
            <p>Job seekers can use advanced search filters including job type, location, industry, and salary range to find the perfect job opportunities tailored to their preferences.</p>
          </div>
        </div>

        <div className='feature'>
          <div className='left'>
            <img src={Images.logoImage4} alt="Profile Management" />
          </div>
          <div className="right">
            <h3>Profile Management</h3>
            <p>Create and manage profiles with ease. Job seekers can upload resumes, update personal information, and track application statuses all in one place.</p>
          </div>
        </div>

        <div className='feature'>
          <div className='left'>
            <img src={Images.logoImage5} alt="Real-Time Notifications" />
          </div>
          <div className="right">
            <h3>Real-Time Notifications</h3>
            <p>Stay updated with real-time notifications for new job listings, application statuses, and messages from potential employers.</p>
          </div>
        </div>

        <div className='feature'>
          <div className='left'>
            <img src={Images.logoImage6} alt="Secure Data Storage" />
          </div>
          <div className="right">
            <h3>Secure Data Storage</h3>
            <p>All user data is securely stored and protected, ensuring privacy and security for both job seekers and employers.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
