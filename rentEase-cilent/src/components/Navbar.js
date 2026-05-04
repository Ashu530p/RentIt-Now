import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import UserProfileSidebar from './UserProfileSidebar'; // Ensure ye file aapne banayi hai

const Navbar = ({ cartCount, isLoggedIn, userName, userRole, onLogout }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <nav style={styles.nav}>
        {/* Left Side: Logo */}
        <div style={styles.logoSection}>
          <Link to="/" style={styles.logoLink}>
            <span style={styles.logoAccent}>Rent</span>Ease
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <div style={styles.navLinks}>
          <NavLink 
            to="/" 
            style={({ isActive }) => isActive ? {...styles.link, ...styles.activeLink} : styles.link}
          >
            Furniture
          </NavLink>
          <NavLink 
            to="/appliances" 
            style={({ isActive }) => isActive ? {...styles.link, ...styles.activeLink} : styles.link}
          >
            Appliances
          </NavLink>
          
          {/* Admin Badge: Only for Admins */}
          {isLoggedIn && userRole === 'admin' && (
            <Link to="/admin" style={styles.adminLink}>
              Admin Panel 🛠️
            </Link>
          )}
        </div>

        {/* Right Side: Actions */}
        <div style={styles.rightSection}>
          {/* Cart Icon with Dynamic Badge */}
          <Link to="/cart" style={styles.cartContainer}>
            <span style={styles.cartIcon}>🛒</span>
            <span style={styles.badge}>{cartCount}</span>
          </Link>

          {/* User UI Logic */}
          {isLoggedIn ? (
            <div 
              style={styles.userProfile} 
              onClick={() => setSidebarOpen(true)}
              title="Open Profile Menu"
            >
              <div style={styles.userInfo}>
                <span style={styles.userName}>Hi, {userName || 'User'}</span>
              </div>
              <div style={styles.avatar}>
                {userName ? userName[0].toUpperCase() : 'U'}
              </div>
            </div>
          ) : (
            <div style={styles.authGroup}>
              <Link to="/login" style={styles.loginBtn}>Login</Link>
              <Link to="/signup" style={styles.signupBtn}>Sign Up</Link>
            </div>
          )}
        </div>
      </nav>

      {/* Sidebar Trigger - Ensure is file me Order History/Profile links hon */}
      {isSidebarOpen && (
        <UserProfileSidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
          userName={userName} 
          onLogout={onLogout} 
        />
      )}
    </>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 6%',
    height: '75px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  logoSection: { display: 'flex', alignItems: 'center' },
  logoLink: { 
    fontSize: '24px', 
    fontWeight: '800', 
    color: '#1a1a1a', 
    textDecoration: 'none',
    letterSpacing: '-0.5px'
  },
  logoAccent: { color: '#007bff' },
  navLinks: { display: 'flex', gap: '30px', alignItems: 'center' },
  link: { 
    color: '#444', 
    textDecoration: 'none', 
    fontSize: '15px', 
    fontWeight: '500',
    transition: '0.3s hover',
  },
  activeLink: { color: '#007bff', fontWeight: '700' },
  adminLink: { 
    color: '#d97706', 
    textDecoration: 'none', 
    fontWeight: '600', 
    fontSize: '13px',
    background: '#fef3c7',
    padding: '6px 14px',
    borderRadius: '20px',
  },
  rightSection: { display: 'flex', alignItems: 'center', gap: '25px' },
  cartContainer: { position: 'relative', textDecoration: 'none', display: 'flex', alignItems: 'center' },
  cartIcon: { fontSize: '22px' },
  badge: { 
    position: 'absolute', 
    top: '-8px', 
    right: '-10px', 
    background: '#ff4d4d', // 🔴 Red for attention
    color: '#fff', 
    fontSize: '10px', 
    padding: '2px 6px', 
    borderRadius: '50%',
    fontWeight: 'bold',
    border: '2px solid #fff'
  },
  userProfile: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '12px', 
    cursor: 'pointer',
    padding: '5px 5px 5px 15px',
    borderRadius: '30px',
    backgroundColor: '#f8f9fa',
    border: '1px solid #e9ecef',
    transition: '0.3s'
  },
  userName: { fontSize: '14px', fontWeight: '600', color: '#333' },
  avatar: { 
    width: '35px', 
    height: '35px', 
    background: 'linear-gradient(135deg, #007bff, #00d4ff)', 
    borderRadius: '50%', 
    color: '#fff', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    fontWeight: 'bold',
    boxShadow: '0 2px 8px rgba(0,123,255,0.3)'
  },
  authGroup: { display: 'flex', gap: '10px' },
  loginBtn: { color: '#007bff', textDecoration: 'none', fontWeight: '600', fontSize: '14px', padding: '10px 15px' },
  signupBtn: { 
    background: '#007bff', 
    color: '#fff', 
    padding: '10px 22px', 
    borderRadius: '12px', 
    textDecoration: 'none', 
    fontWeight: '600', 
    fontSize: '14px' 
  }
};

export default Navbar;