import { useState } from 'react';
import { FaEnvelope, FaLock, FaUser, FaPhone } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { login, signup } from '../../services/auth';
import './LoginForm.css';

// import styles from './public';
// import './global.css'  // Add this line

const LoginForm = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: ''
  });
  const [error, setError] = useState('');

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { token } = await login(loginData.email, loginData.password);
      localStorage.setItem('token', token);
      onClose();
      alert("Sucessfully Loggin");
      // You might want to add a state update here to reflect the logged-in status
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signup({
        email: registerData.email,
        password: registerData.password,
        firstName: registerData.firstName,
        lastName: registerData.lastName,
        phone: registerData.phone
      });
      // Switch to login tab after successful registration
      setActiveTab('login');
      setLoginData({ email: registerData.email, password: '' });
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="login-form-container" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="close-form" onClick={onClose}>&times;</div>
      <div className="login-form">
        <div className="login-tabs">
          <div 
            className={`login-tab ${activeTab === 'login' ? 'active' : ''}`} 
            onClick={() => setActiveTab('login')}
          >
            Login
          </div>
          <div 
            className={`login-tab ${activeTab === 'register' ? 'active' : ''}`} 
            onClick={() => setActiveTab('register')}
          >
            Register
          </div>
        </div>
        
        {error && <div className="error-message" style={{ color: 'red', textAlign: 'center', marginBottom: '15px' }}>{error}</div>}
        
        {activeTab === 'login' && (
          <form className="login-content active" onSubmit={handleLoginSubmit}>
            <h2>Login</h2>
            <div className="form-group">
              <FaEnvelope />
              <input 
                type="email" 
                name="email"
                placeholder="Email Address" 
                required 
                value={loginData.email}
                onChange={handleLoginChange}
              />
            </div>
            <div className="form-group">
              <FaLock />
              <input 
                type="password" 
                name="password"
                placeholder="Password" 
                required 
                value={loginData.password}
                onChange={handleLoginChange}
              />
            </div>
            <div className="forgot-password">
              <a href="#">Forgot Password?</a>
            </div>
            <button type="submit" className="login-btn">Login</button>
            
            {/* <div className="social-login">
              <p>Or Login With</p>
              <div className="social-login-buttons">
                <button type="button" className="social-btn google-btn">
                  <FcGoogle /> Google
                </button>
                <button type="button" className="social-btn facebook-btn">
                  <FaFacebook /> Facebook
                </button>
              </div>
            </div> */}
          </form>
        )}
        
        {activeTab === 'register' && (
          <form className="register-content active" onSubmit={handleRegisterSubmit}>
            <h2>Create Account</h2>
            <div className="form-group">
              <FaUser />
              <input 
                type="text" 
                name="firstName"
                placeholder="First Name" 
                required 
                value={registerData.firstName}
                onChange={handleRegisterChange}
              />
            </div>
            <div className="form-group">
              <FaUser />
              <input 
                type="text" 
                name="lastName"
                placeholder="Last Name" 
                required 
                value={registerData.lastName}
                onChange={handleRegisterChange}
              />
            </div>
            <div className="form-group">
              <FaEnvelope />
              <input 
                type="email" 
                name="email"
                placeholder="Email Address" 
                required 
                value={registerData.email}
                onChange={handleRegisterChange}
              />
            </div>
            <div className="form-group">
              <FaPhone />
              <input 
                type="tel" 
                name="phone"
                placeholder="Phone Number" 
                required 
                value={registerData.phone}
                onChange={handleRegisterChange}
              />
            </div>
            <div className="form-group">
              <FaLock />
              <input 
                type="password" 
                name="password"
                placeholder="Password" 
                required 
                value={registerData.password}
                onChange={handleRegisterChange}
              />
            </div>
            <button type="submit" className="register-btn">Register</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginForm;