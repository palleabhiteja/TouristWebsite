import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
// import './global.css'  // Add this line

const ContactForm = ({ formData, onChange, onSubmit }) => {
  return (
    <div className="contact-form-container">
      <div className="contact-form-card">
        <h2>Contact Form</h2>
        <form id="contact-form" onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              placeholder="Enter your full name" 
              required 
              value={formData.name}
              onChange={onChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="mobile">Mobile Number</label>
            <input 
              type="tel" 
              id="mobile" 
              name="mobile" 
              placeholder="Enter your mobile number" 
              required 
              value={formData.mobile}
              onChange={onChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="Enter your email address" 
              required 
              value={formData.email}
              onChange={onChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea 
              id="message" 
              name="message" 
              placeholder="How can we help you?" 
              required 
              value={formData.message}
              onChange={onChange}
            ></textarea>
          </div>
          
          <button type="submit" className="submit-btn">Submit</button>
        </form>
        
        <div className="social-links">
          <a href="#"><FaFacebookF /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaLinkedinIn /></a>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;