import React, { useState,useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import './styles.css';
import { useAuth } from "../store/auth";

export default function Info() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [swiper, setSwiper] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [isuser,setUser]=useState(user);
  useEffect(() => {
    setUser(!user);
    if (!user) {
      const timer = setTimeout(() => {
        window.location.reload();
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [user, navigate]);

  
  const [personalDetails, setPersonalDetails] = useState({
    firstName: '',
    lastName: '',
    professionalEmail: '',
    employmentStatus: '',
    jobTitle: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
  });

  const [employeeDetails, setEmployeeDetails] = useState({
    firstName: '',
    lastName: '',
    professionalEmail: '',
    jobTitle: '',
    phone: '',
    company: '',
    website: '',
    headquarters: '',
    type: '',
    size: ''
  });

  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setPersonalDetails({
      ...personalDetails,
      [name]: value
    });
  };

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setEmployeeDetails({
      ...employeeDetails,
      [name]: value
    });
  };

  if (isuser) {
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
            Refresh the page
          </h2>
        </div>
      </div>
    );
  }

  const handleLogoUpload = (event) => {
    setLogoFile(event.target.files[0]);
  };

  const handleImageUpload = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleBannerUpload = (event) => {
    setBannerFile(event.target.files[0]);
  };

  const handleNext = async () => {
    if (currentSlide === 1) {
      if (user.employee === false) {
        const requiredFields = ['firstName', 'lastName', 'professionalEmail', 'employmentStatus', 'jobTitle', 'phone', 'location'];
        for (let field of requiredFields) {
          if (!personalDetails[field]) {
            toast.warning('Please fill in all required fields.');
            return;
          }
        }
      } else if (user.employee === true) {
        const requiredFields = ['firstName', 'lastName', 'professionalEmail', 'jobTitle', 'phone', 'company', 'website', 'headquarters', 'type', 'size'];
        for (let field of requiredFields) {
          if (!employeeDetails[field]) {
            toast.warning('Please fill in all required fields.');
            return;
          }
        }
      } else {
        toast.warning('User type is not defined.');
        return;
      }
    }
  
    const token = localStorage.getItem('token');
    if (currentSlide < slides.length - 1) {
      swiper.slideNext();
    } else {
      try {
        let response;
        if (user.employee) {
          const formData = new FormData();
          Object.entries(employeeDetails).forEach(([key, value]) => formData.append(key, value));
          formData.append('logo', logoFile);
          formData.append('banner', bannerFile);
          
          response = await fetch('https://employease-3yl4.onrender.com/api/employeeDetails', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData
          });
        } else {
          response = await fetch('https://employease-3yl4.onrender.com/api/personalDetails', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(personalDetails)
          });
        }
  
        if (!response.ok) {
          const text = await response.text();
          throw new Error(text);
        }
  
        if (response.ok) {
          toast.success('Welcome');
          user.employee ? navigate('/employeedashboard') : <></>;
          !user.employee ? navigate('/dashboard') : <></>;
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('An error occurred while saving your details.');
      }
    }
  };
  
  

  const slides = [
    {
      title: "Welcome to EmployEase",
      content: "We're excited to have you on board! Let's get you set up.",
      button: "Next",
    },
    {
      title: "Tell Us About Yourself",
      content: "We'd love to know more about you. Please fill in your personal details to get started.",
      button: "Next",
    },
    {
      title: "You're All Set!",
      content: "Start your journey with EmployEase",
      button: "Go to Dashboard",
    }
  ];

  return (
    <div style={{minHeight:'60vh'}}>
      <Swiper
        className="mySwiper"
        onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
        onSwiper={setSwiper}
        style={{ height: '130vh' }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="slide-content" style={{minHeight:'60vh'}}>
              <h1>{slide.title}</h1>
              <p>{slide.content}</p>
              {index === 1 && user ? (
                user.employee === false ? (
                  <form>
                    {/* <label>Upload Profile
                    <input type="file" accept="image/*" onChange={handleImageUpload} />
                    {imageFile && <img src={URL.createObjectURL(imageFile)} alt="Uploaded" style={{ width: '2in' }} />}</label> */}
                    <label>
                      First Name*:
                      <input type="text" name="firstName" value={personalDetails.firstName} onChange={handleChange1} required />
                    </label>
                    <label>
                      Last Name*:
                      <input type="text" name="lastName" value={personalDetails.lastName} onChange={handleChange1} required />
                    </label>
                    <label>
                      Professional Email*:
                      <input type="email" name="professionalEmail" value={personalDetails.professionalEmail} onChange={handleChange1} required />
                    </label>
                    <label>
                      Employment Status*:
                      <input type="text" name="employmentStatus" value={personalDetails.employmentStatus} onChange={handleChange1} required />
                    </label>
                    <label>
                      Job Title*:
                      <input type="text" name="jobTitle" value={personalDetails.jobTitle} onChange={handleChange1} required />
                    </label>
                    <label>
                      Phone*:
                      <input type="tel" name="phone" value={personalDetails.phone} onChange={handleChange1} required />
                    </label>
                    <label>
                      Location*:
                      <input type="text" name="location" value={personalDetails.location} onChange={handleChange1} required />
                    </label>
                    <label>
                      LinkedIn Link:
                      <input type="text" name="linkedin" value={personalDetails.linkedin} onChange={handleChange1} />
                    </label>
                    <label>
                      GitHub Link:
                      <input type="text" name="github" value={personalDetails.github} onChange={handleChange1} />
                    </label>
                    <br></br>
                    <button type="button" style={{ width: '2in', alignSelf: 'center' }} onClick={handleNext}>
                      {slide.button}
                    </button>
                  </form>
                ) : (
                  <form>
                    <label>
                      First Name*:
                      <input type="text" name="firstName" value={employeeDetails.firstName} onChange={handleChange2} required />
                    </label>
                    <label>
                      Last Name*:
                      <input type="text" name="lastName" value={employeeDetails.lastName} onChange={handleChange2} required />
                    </label>
                    <label>
                      Professional Email*:
                      <input type="email" name="professionalEmail" value={employeeDetails.professionalEmail} onChange={handleChange2} required />
                    </label>
                    <label>
                      Job Title*:
                      <input type="text" name="jobTitle" value={employeeDetails.jobTitle} onChange={handleChange2} required />
                    </label>
                    <label>
                      Phone*:
                      <input type="tel" name="phone" value={employeeDetails.phone} onChange={handleChange2} required />
                    </label>
                    <label>Upload Logo
                    <input type="file" accept="image/*" onChange={handleLogoUpload} />
                    {logoFile && <img src={URL.createObjectURL(logoFile)} alt="Uploaded" style={{ width: '2in' }} />}</label>
                    <label>Upload Banner
                    <input type="file" accept="image/*" onChange={handleBannerUpload} />
                    {bannerFile && <img src={URL.createObjectURL(bannerFile)} alt="Uploaded" style={{ width: '4in', height: '2in' }} />}</label>
                    <label>
                      Company*:
                      <input type="text" name="company" value={employeeDetails.company} onChange={handleChange2} required />
                    </label>
                    <label>
                      Website*:
                      <input type="text" name="website" value={employeeDetails.website} onChange={handleChange2} required />
                    </label>
                    <label>
                      Headquarters*:
                      <input type="text" name="headquarters" value={employeeDetails.headquarters} onChange={handleChange2} required />
                    </label>
                    <label>
                      Type*:
                      <input type="text" name="type" value={employeeDetails.type} onChange={handleChange2} required />
                    </label>
                    <label>
                      Size*:
                      <input type="text" name="size" value={employeeDetails.size} onChange={handleChange2} required />
                    </label>
                    <br></br>
                    <button type="button" style={{ width: '6rem' }} onClick={handleNext}>
                      {slide.button}
                    </button>
                  </form>
                )
              ) : (
                <button onClick={handleNext}>{slide.button}</button>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
