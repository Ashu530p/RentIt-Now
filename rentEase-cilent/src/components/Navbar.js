import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import UserProfileSidebar from './UserProfileSidebar';
import { FaMapMarkerAlt, FaSearch, FaShoppingCart, FaChevronDown, FaCrown, FaTimes } from 'react-icons/fa';

const Navbar = ({ cartCount, isLoggedIn, userName, userRole, onLogout }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showCityModal, setShowCityModal] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Indore"); 

  // India ki top cities ki list (All India feel ke liye)
  const cities = ["Indore", "Bhopal", "Mumbai", "Delhi", "Bangalore", "Pune", "Hyderabad", "Ahmedabad"];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    const city = localStorage.getItem('rentEaseLocation');
    if (city) setSelectedCity(city);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCitySelect = (city) => {
    localStorage.setItem('rentEaseLocation', city);
    setSelectedCity(city);
    setShowCityModal(false);
    // Yahan tum window.location.reload() bhi kar sakte ho agar products update karne ho
  };

  return (
    <>
      <nav style={{
        ...styles.nav,
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.98)' : '#ffffff',
        height: scrolled ? '65px' : '80px',
        boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.08)' : 'none'
      }}>
        
        {/* Logo & City Selector */}
        <div style={styles.leftSection}>
          <Link to="/" style={styles.logoLink}>
            <span style={styles.logoAccent}>Rent</span>Ease
          </Link>
          
          <div style={styles.locationBox} onClick={() => setShowCityModal(true)}>
            <FaMapMarkerAlt style={styles.locIcon} />
            <div style={styles.locContent}>
              <span style={styles.locLabel}>City</span>
              <span style={styles.locText}>{selectedCity}</span>
            </div>
            <FaChevronDown style={styles.locArrow} />
          </div>
        </div>

        {/* Centralized Search - Pure Navbar mein sirf EK search bar */}
        <div style={styles.searchSection}>
          <div style={styles.searchBar}>
            <FaSearch style={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search furniture, AC, appliances..." 
              style={styles.searchInput}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div style={styles.rightSection}>
          <div style={styles.navLinks}>
            <NavLink to="/offers" style={styles.link}>Offers</NavLink>
            {isLoggedIn && userRole === 'admin' && (
              <Link to="/admin" style={styles.adminBadge}><FaCrown /> Admin</Link>
            )}
          </div>

          <Link to="/cart" style={styles.cartContainer}>
            <FaShoppingCart style={styles.cartIcon} />
            {cartCount > 0 && <span style={styles.badge}>{cartCount}</span>}
          </Link>

          {isLoggedIn ? (
            <div style={styles.userProfile} onClick={() => setSidebarOpen(true)}>
              <div style={styles.userInfo}>
                <span style={styles.userName}>{userName?.split(' ')[0]}</span>
                <span style={styles.userSub}>Account</span>
              </div>
              <div style={styles.avatar}>{userName ? userName[0].toUpperCase() : 'U'}</div>
            </div>
          ) : (
            <Link to="/login" style={styles.loginBtn}>Login</Link>
          )}
        </div>
      </nav>

      {/* Modern City Selection Modal */}
      {showCityModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h3>Choose your city</h3>
              <FaTimes onClick={() => setShowCityModal(false)} style={{cursor: 'pointer'}} />
            </div>
            <div style={styles.cityGrid}>
              {cities.map(city => (
                <div 
                  key={city} 
                  style={{...styles.cityItem, border: selectedCity === city ? '2px solid #007bff' : '1px solid #e2e8f0'}}
                  onClick={() => handleCitySelect(city)}
                >
                  {city}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {isSidebarOpen && (
        <UserProfileSidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
          userName={userName} 
          userRole={userRole}
          onLogout={onLogout} 
        />
      )}
    </>
  );
};

const styles = {
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 4%', position: 'sticky', top: 0, zIndex: 1000, transition: 'all 0.3s ease', borderBottom: '1px solid #eee' },
  leftSection: { display: 'flex', alignItems: 'center', gap: '30px' },
  logoLink: { fontSize: '24px', fontWeight: '800', color: '#1e293b', textDecoration: 'none' },
  logoAccent: { color: '#007bff' },
  
  locationBox: { display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '6px 12px', borderRadius: '10px', transition: '0.2s', border: '1px solid #f0f0f0' },
  locContent: { display: 'flex', flexDirection: 'column' },
  locLabel: { fontSize: '10px', color: '#94a3b8', fontWeight: '600' },
  locText: { fontSize: '13px', fontWeight: '700', color: '#334155' },
  locIcon: { color: '#007bff' },
  locArrow: { fontSize: '10px', color: '#cbd5e1' },

  searchSection: { flex: 1, maxWidth: '400px', margin: '0 30px' },
  searchBar: { display: 'flex', alignItems: 'center', background: '#f8fafc', borderRadius: '10px', padding: '0 15px', border: '1px solid #e2e8f0' },
  searchIcon: { color: '#94a3b8' },
  searchInput: { width: '100%', border: 'none', background: 'transparent', padding: '10px', outline: 'none', fontSize: '14px' },

  rightSection: { display: 'flex', alignItems: 'center', gap: '20px' },
  navLinks: { display: 'flex', gap: '15px' },
  link: { color: '#475569', textDecoration: 'none', fontSize: '14px', fontWeight: '600' },
  adminBadge: { background: '#fff7ed', color: '#c2410c', padding: '5px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '5px' },

  cartContainer: { position: 'relative' },
  cartIcon: { fontSize: '20px', color: '#334155' },
  badge: { position: 'absolute', top: '-8px', right: '-8px', background: '#007bff', color: '#fff', fontSize: '10px', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' },

  userProfile: { display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' },
  userInfo: { display: 'flex', flexDirection: 'column', textAlign: 'right' },
  userName: { fontSize: '13px', fontWeight: '700', color: '#1e293b' },
  userSub: { fontSize: '10px', color: '#94a3b8' },
  avatar: { width: '35px', height: '35px', background: '#007bff', borderRadius: '8px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700' },
  
  loginBtn: { background: '#1e293b', color: '#fff', padding: '10px 20px', borderRadius: '10px', textDecoration: 'none', fontSize: '14px', fontWeight: '700' },

  // Modal Styles
  modalOverlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000 },
  modalContent: { background: '#fff', padding: '25px', borderRadius: '20px', width: '90%', maxWidth: '500px' },
  modalHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontWeight: '700' },
  cityGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' },
  cityItem: { padding: '12px', textAlign: 'center', borderRadius: '10px', cursor: 'pointer', fontSize: '14px', transition: '0.2s', fontWeight: '600' }
};

export default Navbar;