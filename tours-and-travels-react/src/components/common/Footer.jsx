import './Footer.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { FaCcVisa, FaCcMastercard, FaMobileAlt, FaWallet, FaMoneyBillWave } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <h3>Company Information</h3>
        <ul>
          <li><a href="/about">About Us</a></li>
          <li><a href="/contact">Contact Us</a></li>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms & Conditions</a></li>
        </ul>
      </div>
      <div>
        <h3>Quick Links</h3>
        <ul>
          <li><a href="#">Refund Policy</a></li>
          <li><a href="#">FAQs</a></li>
          <li><a href="#">Customer Support</a></li>
        </ul>
      </div>
      <div>
        <h3>Accepted Payment Methods</h3>
        <div className="payments">
          <FaCcVisa />
          <FaCcMastercard />
          <FaMobileAlt />
          <FaWallet />
          <FaMoneyBillWave />
        </div>
      </div>
      <div>
        <h3>Customer Support</h3>
        <p>Email: support@example.com</p>
        <p>Phone: +123 456 7890</p>
        <div className="social-icons">
          <a href="#"><FaFacebookF /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaLinkedinIn /></a>
          <a href="#"><FaYoutube /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
