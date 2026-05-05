import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import UserProfileSidebar from './UserProfileSidebar';
import { FaMapMarkerAlt, FaSearch, FaShoppingCart, FaChevronDown, FaCrown } from 'react-icons/fa';

const Navbar = ({ cartCount, isLoggedIn, userName, userRole, onLogout }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Bhopal"); // Default to your base
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    // City sync from LocalStorage
    const city = localStorage.getItem('rentEaseLocation');
    if (city) setSelectedCity(city);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav style={{
        ...styles.nav,
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : '#ffffff',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        height: scrolled ? '70px' : '85px',
        boxShadow: scrolled ? '0 10px 30px rgba(0,0,0,0.05)' : 'none'
      }}>
        
        {/* 1. Logo & City Picker (RentoMojo Style) */}
        <div style={styles.leftSection}>
          <Link to="/" style={styles.logoLink}>
            <span style={styles.logoAccent}>Rent</span>Ease
          </Link>
          
          <div style={styles.locationBox} onClick={() => {
            const newCity = prompt("Enter City (Indore / Bhopal):", selectedCity);
            if(newCity) {
              localStorage.setItem('rentEaseLocation', newCity);
              setSelectedCity(newCity);
            }
          }}>
            <FaMapMarkerAlt style={styles.locIcon} />
            <span style={styles.locText}>{selectedCity}</span>
            <FaChevronDown style={styles.locArrow} />
          </div>
        </div>

        {/* 2. Smart Search (Centralized) */}
        <div style={styles.searchSection}>
          <div style={styles.searchBar}>
            <FaSearch style={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search furniture, AC, beds..." 
              style={styles.searchInput}
            />
          </div>
        </div>

        {/* 3. Actions & User Profile */}
        <div style={styles.rightSection}>
          <div style={styles.navLinks}>
            <NavLink to="/faq" style={styles.link}>Offers</NavLink>
            {/* Admin Quick Link if logged in as admin */}
            {isLoggedIn && userRole === 'admin' && (
              <Link to="/admin" style={styles.adminBadge}>
                <FaCrown /> Admin
              </Link>
            )}
          </div>

          <Link to="/cart" style={styles.cartContainer}>
            <FaShoppingCart style={styles.cartIcon} />
            {cartCount > 0 && <span style={styles.badge}>{cartCount}</span>}
          </Link>

          {isLoggedIn ? (
            <div style={styles.userProfile} onClick={() => setSidebarOpen(true)}>
              <div style={styles.userInfo}>
                <span style={styles.userName}>Hi, {userName?.split(' ')[0]}</span>
                <span style={styles.userSub}>My Account</span>
              </div>
              <div style={styles.avatar}>
                {userName ? userName[0].toUpperCase() : 'U'}
              </div>
            </div>
          ) : (
            <div style={styles.authGroup}>
              <Link to="/login" style={styles.loginBtn}>Login / Signup</Link>
            </div>
          )}
        </div>
      </nav>

      {isSidebarOpen && (
        <UserProfileSidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
          userName={userName} 
          userRole={userRole}
          onLogout={onLogout} 
        />
      )}

      {/* Animation for Navbar */}
      <style>{`
        nav { transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
      `}</style>
    </>
  );
};

const styles = {
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 5%', position: 'sticky', top: 0, zIndex: 1000, borderBottom: '1px solid #f1f5f9' },
  leftSection: { display: 'flex', alignItems: 'center', gap: '25px' },
  logoLink: { fontSize: '26px', fontWeight: '900', color: '#1e293b', textDecoration: 'none', letterSpacing: '-1px' },
  logoAccent: { color: '#007bff' },
  
  locationBox: { display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: '8px 14px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' },
  locIcon: { color: '#007bff', fontSize: '14px' },
  locText: { fontSize: '13px', fontWeight: '700', color: '#475569' },
  locArrow: { fontSize: '10px', color: '#94a3b8' },

  searchSection: { flex: 1, margin: '0 50px', maxWidth: '450px' },
  searchBar: { position: 'relative', display: 'flex', alignItems: 'center', background: '#f1f5f9', borderRadius: '14px', padding: '0 18px', border: '1px solid transparent', transition: '0.3s' },
  searchIcon: { color: '#94a3b8', fontSize: '14px' },
  searchInput: { width: '100%', border: 'none', background: 'transparent', padding: '12px', outline: 'none', fontSize: '14px', color: '#1e293b' },

  rightSection: { display: 'flex', alignItems: 'center', gap: '25px' },
  navLinks: { display: 'flex', alignItems: 'center', gap: '20px' },
  link: { color: '#64748b', textDecoration: 'none', fontSize: '14px', fontWeight: '700', transition: '0.2s' },
  adminBadge: { background: '#fff7ed', color: '#c2410c', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '800', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', border: '1px solid #ffedd5' },

  cartContainer: { position: 'relative', cursor: 'pointer', display: 'flex', alignItems: 'center' },
  cartIcon: { fontSize: '22px', color: '#1e293b' },
  badge: { position: 'absolute', top: '-10px', right: '-10px', background: '#ef4444', color: '#fff', fontSize: '10px', fontWeight: '900', width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' },

  userProfile: { display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', padding: '5px', borderRadius: '12px', transition: '0.2s' },
  userInfo: { display: 'flex', flexDirection: 'column', textAlign: 'right' },
  userName: { fontSize: '14px', fontWeight: '800', color: '#1e293b', lineHeight: '1.2' },
  userSub: { fontSize: '10px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase' },
  avatar: { width: '38px', height: '38px', background: 'linear-gradient(135deg, #007bff, #00d4ff)', borderRadius: '12px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', boxShadow: '0 4px 12px rgba(0,123,255,0.2)' },
  
  loginBtn: { background: '#1e293b', color: '#fff', padding: '12px 24px', borderRadius: '14px', textDecoration: 'none', fontSize: '14px', fontWeight: '800', transition: '0.3s' }
};

export default Navbar;