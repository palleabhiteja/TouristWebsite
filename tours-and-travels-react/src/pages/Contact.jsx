// import { useState } from 'react';
// import Header from '../components/common/Header';
// import Footer from '../components/common/Footer';
// import ContactHero from '../components/contact/ContactHero';
// import ContactForm from '../components/contact/ContactForm';
// // import './global.css'  // Add this line

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     mobile: '',
//     email: '',
//     message: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Validate form
//     if (!formData.name || !formData.mobile || !formData.email || !formData.message) {
//       alert('Please fill in all fields');
//       return;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       alert('Please enter a valid email address');
//       return;
//     }

//     const mobileRegex = /^\d{10}$/;
//     if (!mobileRegex.test(formData.mobile.replace(/\D/g, ''))) {
//       alert('Please enter a valid 10-digit mobile number');
//       return;
//     }

//     // Submit form (you would typically send this to your backend)
//     alert('Thank you for your message! We will get back to you soon.');
//     setFormData({
//       name: '',
//       mobile: '',
//       email: '',
//       message: ''
//     });
//   };

//   return (
//     <>
//       <Header />
//       <main className="main-content">
//         <ContactHero />
//         <div className="contact-container">
//           <div className="contact-info">
//             <h2>Get in Touch</h2>
//             <p>
//               Welcome to our Tours and Travels contact page. We are dedicated to providing exceptional 
//               travel experiences across India. Whether you're planning a family vacation, a romantic 
//               getaway, or an adventure tour, our team is here to help you create unforgettable memories.
//             </p>
            
//             <p>
//               Our experienced travel consultants are available to answer your questions, provide detailed 
//               information about our tour packages, and assist with customizing your travel itinerary to 
//               meet your specific needs and preferences.
//             </p>
            
//             <div className="contact-details">
//               <h3>Contact Information</h3>
//               <ul>
//                 <li>
//                   <i className="fas fa-map-marker-alt"></i>
//                   <span>123 Tourism Street, New Delhi, India - 110001</span>
//                 </li>
//                 <li>
//                   <i className="fas fa-phone"></i>
//                   <span>+91 98765 43210</span>
//                 </li>
//                 <li>
//                   <i className="fas fa-envelope"></i>
//                   <span>info@toursandtravels.com</span>
//                 </li>
//                 <li>
//                   <i className="fas fa-clock"></i>
//                   <span>Monday - Saturday: 9:00 AM - 6:00 PM</span>
//                 </li>
//               </ul>
//             </div>
//           </div>
          
//           <ContactForm 
//             formData={formData} 
//             onChange={handleChange} 
//             onSubmit={handleSubmit} 
//           />
//         </div>
//       </main>
//       <Footer />
//     </>
//   );
// };

// export default Contact;

import { useState } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import ContactHero from '../components/contact/ContactHero';
import ContactForm from '../components/contact/ContactForm';
import { submitContactForm } from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^\d{10}$/;

    if (!formData.name || !formData.mobile || !formData.email || !formData.message) {
      alert('Please fill in all fields');
      return;
    }

    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }

    if (!mobileRegex.test(formData.mobile.replace(/\D/g, ''))) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }

    try {
      await submitContactForm(formData);
      alert('Thank you for your message! We will contact you soon.');
      setFormData({
        name: '',
        mobile: '',
        email: '',
        message: ''
      });
    } catch (error) {
      console.error(error);
      alert('Failed to submit form. Please try again.');
    }
  };

  return (
    <>
      <Header />
      <main className="main-content">
        <ContactHero />
        <div className="contact-container">
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <p>
              Welcome to our Tours and Travels contact page. We are dedicated to providing exceptional 
              travel experiences across India. Whether you're planning a family vacation, a romantic 
              getaway, or an adventure tour, our team is here to help you create unforgettable memories.
            </p>
            
            <p>
              Our experienced travel consultants are available to answer your questions, provide detailed 
              information about our tour packages, and assist with customizing your travel itinerary to 
              meet your specific needs and preferences.
            </p>
            
            <div className="contact-details">
              <h3>Contact Information</h3>
              <ul>
                <li>
                  <i className="fas fa-map-marker-alt"></i>
                  <span>123 Tourism Street, New Delhi, India - 110001</span>
                </li>
                <li>
                  <i className="fas fa-phone"></i>
                  <span>+91 98765 43210</span>
                </li>
                <li>
                  <i className="fas fa-envelope"></i>
                  <span>info@toursandtravels.com</span>
                </li>
                <li>
                  <i className="fas fa-clock"></i>
                  <span>Monday - Saturday: 9:00 AM - 6:00 PM</span>
                </li>
              </ul>
            </div>
          </div>

          <ContactForm 
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
