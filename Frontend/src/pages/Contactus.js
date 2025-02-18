import React from 'react';
import './pagestyles.css';
import { useAuth } from '../store/auth';
const Contactus = () => {
  const {user} =useAuth();
  return (
    <div className="contact-container">
        <div className='contactus'>
      <div className="contact-left">
        <h2>Contact Us</h2>
        <p>EmployEase</p>
        <form>
          <div className="form-group">
            <label>Name</label>
            <input type="text" placeholder= "yourname" value={user?.username} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Your Email" value={user?.email} />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea placeholder="Your Message"></textarea>
          </div>
          <button type="submit" className='contactus-button'>Send Message</button>
        </form>
      </div>
      <div className="contact-right">
        <h3>INFO</h3>
        <div className="info-item">
          <p><i class="bi bi-geo-alt-fill"></i> Hyderabad, Telangana, India</p>
        </div>
        <div className="info-item">
          <p><i class="bi bi-telephone-outbound-fill"></i> +91-8897009748</p>
        </div>
        <div className="info-item">
          <p><i class="bi bi-envelope-fill"></i> tejaakshaykumar970@gmail.com</p>
        </div>
        <div class="social-icons">
        <a href="https://www.facebook.com" target="_blank" aria-label="Facebook">
          <i class="bi bi-facebook"></i>
        </a>
        <a href="https://www.instagram.com" target="_blank" aria-label="Instagram">
          <i class="bi bi-instagram"></i>
        </a>
        <a href="https://www.pinterest.com" target="_blank" aria-label="Pinterest">
          <i class="bi bi-pinterest"></i>
        </a>
        <a href="https://www.youtube.com" target="_blank" aria-label="YouTube">
          <i class="bi bi-youtube"></i>
        </a>
        <a href="https://www.linkedin.com" target="_blank" aria-label="LinkedIn">
          <i class="bi bi-linkedin"></i>
        </a>
        <a href="https://www.twitter.com" target="_blank" aria-label="Twitter">
          <i class="bi bi-twitter"></i>
        </a>
      </div>
      </div>
      </div>
    </div>
  );
}

export default Contactus;