import React from "react";
import "./pagestyles.css";
import aboutImage from "../images/wallpaper-moon-moon-phases.jpg";

const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="about-top">
        <img src={aboutImage} alt="About" className="about-image" />
        <div className="about-content">
          <h1>About Me: Empowering Your Job Search with EmployEase</h1>
          <p>Hey everyone!</p>
          <p>
            I'm <span style={{fontWeight:'bolder',fontSize:'1.3rem'}}>Teja Akshay Kumar</span>, a student passionate about making the job
            search process smoother for everyone.
          </p>
          <p>
            I created EmployEase because, let's be honest, finding a job can be a real challenge. It's stressful, time-consuming, and often leaves
            you feeling overwhelmed.
          </p>
          <p>
            That's why I designed EmployEase specifically for job seekers and employers. I want to help you connect with opportunities that match your skills and aspirations, making the job search process easier and more efficient.
          </p>
        </div>
      </div>
      <div className="about-bottom">
        <h2>
          Want to stay connected? Follow me on social media!
        </h2>
        <h3>Instagram: <a href='https://www.instagram.com' style={{textDecoration:'none'}}>teja_akshay_kumar</a></h3>
        <h3>Facebook: <a href='https://www.facebook.com' style={{textDecoration:'none'}}>teja akshay kumar</a></h3>
      
        <h1>
          Let's transform your job search experience together! Sign up for a free account on
          EmployEase today.
        </h1>
      </div>
    </div>
  );
};

export default AboutUs;
