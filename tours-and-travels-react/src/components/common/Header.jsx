// import { useState } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { FaSearch, FaUser, FaSignOutAlt } from 'react-icons/fa';
// import styles from './Header.module.css';
// import SearchForm from './SearchForm';
// import LoginForm from './LoginForm';
// import { logout } from "../../services/auth"; // ✅

// const Header = () => {
//   const [showSearchForm, setShowSearchForm] = useState(false);
//   const [showLoginForm, setShowLoginForm] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const token = localStorage.getItem('token');
//   const userRole = localStorage.getItem('userRole');

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//     window.location.reload();
//   };

//   return (
//     <header className={styles.header}>
//       <Link to="/">
//         <img src="/assets/images/big-logo1.png" alt="Tours and Travels Logo" />
//       </Link>
      
//       <nav className={styles.nav}>
//         <div className={styles.navLinks}>
//           <Link 
//             to="/" 
//             className={location.pathname === '/' ? styles.navLinkActive : styles.navLink}
//           >
//             Home
//           </Link>
//           <Link 
//             to="/about" 
//             className={location.pathname === '/about' ? styles.navLinkActive : styles.navLink}
//           >
//             About Us
//           </Link>
//           <Link 
//             to="/#hotels" 
//             className={location.pathname === '/hotels' ? styles.navLinkActive : styles.navLink}
//           >
//             Hotels
//           </Link>
//           <Link 
//             to="/#packages" 
//             className={location.pathname === '/packages' ? styles.navLinkActive : styles.navLink}
//           >
//             Tour Packages
//           </Link>
//           {userRole === 'ADMIN' && (
//             <Link 
//               to="/admin" 
//               className={location.pathname === '/admin' ? styles.navLinkActive : styles.navLink}
//             >
//               Admin
//             </Link>
//           )}
//         </div>
//         <div className={styles.navIcons}>
//           <Link to="/contact" className={styles.contactLink}>Contact Us</Link>
//           <FaSearch 
//             className={styles.searchIcon} 
//             onClick={() => setShowSearchForm(true)} 
//           />
//           {token ? (
//             <FaSignOutAlt 
//               className={styles.loginIcon} 
//               onClick={handleLogout}
//             />
//           ) : (
//             <FaUser 
//               className={styles.loginIcon} 
//               onClick={() => setShowLoginForm(true)} 
//             />
//           )}
//         </div>
//       </nav>

//       {showSearchForm && <SearchForm onClose={() => setShowSearchForm(false)} />}
//       {showLoginForm && <LoginForm onClose={() => setShowLoginForm(false)} />}
//     </header>
//   );
// };

// export default Header;
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaSearch, FaUser, FaSignOutAlt, FaBookOpen } from 'react-icons/fa';
import styles from './Header.module.css';
import SearchForm from './SearchForm';
import LoginForm from './LoginForm';
import { logout } from "../../services/auth";

const Header = () => {
  const [showSearchForm, setShowSearchForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  const handleLogout = () => {
    logout();
    navigate('/');
    window.location.reload();
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className={styles.header}>
      <Link to="/">
        <img src="/assets/images/big-logo1.png" alt="Tours and Travels Logo" />
      </Link>

      <nav className={styles.nav}>
        <div className={styles.navLinks}>
          <Link
            to="/"
            className={isActive('/') ? styles.navLinkActive : styles.navLink}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={isActive('/about') ? styles.navLinkActive : styles.navLink}
          >
            About Us
          </Link>

          {userRole !== 'ADMIN' && (
            <>
              <Link
                to="/hotels"
                className={isActive('/hotels') ? styles.navLinkActive : styles.navLink}
              >
                Hotels
              </Link>
              <Link
                to="/tours"
                className={isActive('/tours') ? styles.navLinkActive : styles.navLink}
              >
                Tour Packages
              </Link>
            </>
          )}

          <Link
            to="/contact"
            className={isActive('/contact') ? styles.navLinkActive : styles.navLink}
          >
            Contact Us
          </Link>

          {token && userRole !== 'ADMIN' && (
            <Link
              to="/my-bookings"
              className={isActive('/bookings') ? styles.navLinkActive : styles.navLink}
            >
              <FaBookOpen style={{ marginRight: '5px' }} />
              My Bookings
            </Link>
          )}

          {userRole === 'ADMIN' && (
            <Link
              to="/admin"
              className={isActive('/admin') ? styles.navLinkActive : styles.navLink}
            >
              Admin Dashboard
            </Link>
          )}
        </div>

        <div className={styles.navIcons}>
          <FaSearch
            className={styles.searchIcon}
            onClick={() => setShowSearchForm(true)}
          />
          {token ? (
            <FaSignOutAlt
              className={styles.loginIcon}
              onClick={handleLogout}
            />
          ) : (
            <FaUser
              className={styles.loginIcon}
              onClick={() => setShowLoginForm(true)}
            />
          )}
        </div>
      </nav>

      {showSearchForm && <SearchForm onClose={() => setShowSearchForm(false)} />}
      {showLoginForm && <LoginForm onClose={() => setShowLoginForm(false)} />}
    </header>
  );
};

export default Header;