import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/main-logo-white-transparent.png';
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';
import image from '../images/bin/OIP (1).jpg'

export default function Navbar() {
  const navigate = useNavigate();
  const { user,isEmployee,LogoutUser,isLoggedIn } = useAuth();

  const handleSigninClick = () => {
    navigate('/signin');
  };
  const handleSignupClick = () => {
    navigate('/signup');
  };
  const handleLogoutClick = () => {
    LogoutUser();
    toast('Successfully logged out');
    navigate('/signin');
  };
  return (
    <div>
    
      <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary" data-bs-theme="dark" >
      <div className="container-fluid" >
        <a className="navbar-brand" href="/">
        <img src={logo} alt="Logo" style={{height:'5vh',width:'20vh',objectFit:'cover'}} />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          {isLoggedIn?(<>
            { isEmployee ?(
            <>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/employeedashboard">
              Dashboard
            </a>
          </li>
          <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/findcandidate">
            Find Candidates
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/myjobs">
            My jobs
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/applications">
            Applications
          </a>
        </li>
        </>
          ):(
            <>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
              Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/dashboard">
              Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/findjob">
              Find Jobs
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/findemployee">
              Find Employers
              </a>
            </li>
            </>
            
          )}
          </>):(
            <>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
              Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/contactus">
              Contact Us
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/FAQ">
              FAQS
              </a>
            </li>
            </>
          )}
          </ul>
          <form className="d-flex">
            {isLoggedIn ?(
              <>
              <button className=" btn btn-outline-success custom-btn" type="submit" onClick={handleLogoutClick}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Logout&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </button> 
              {/* <p style={{color:'white',fontWeight:'500',marginTop:'0.9rem',marginLeft:'1rem'}}>{user?.username}</p> */}
              <img src={image} alt='profile' style={{width:'1.5cm',height: '1.5cm',borderRadius:'50%',objectFit:'fill',marginLeft:'0.7rem'}}></img>
              </>
            ):(
            <>
            <button className=" btn btn-outline-success custom-btn" type="submit" onClick={handleSigninClick}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SignIn&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </button>
            <button className=" btn btn-outline-success custom-btn" type="submit" onClick={handleSignupClick}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SignUp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </button>
            </>
          )}
          
          </form>
        </div>
      </div>
    </nav>
    
    </div>
  );
}
