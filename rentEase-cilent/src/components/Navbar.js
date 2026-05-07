import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaSearch, FaShoppingCart, FaChevronDown, FaCrown, FaTimes } from 'react-icons/fa';

const Navbar = ({ cartCount, isLoggedIn, userName, userRole, onLogout }) => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [showCityModal, setShowCityModal] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Indore"); 

  const cities = ["Indore", "Bhopal", "Mumbai", "Delhi", "Bangalore", "Pune", "Hyderabad", "Ahmedabad"];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoutAction = () => {
    localStorage.clear();
    if (onLogout) onLogout();
    navigate('/login');
    window.location.reload();
  };

  return (
    <nav style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 4%', 
      position: 'sticky', top: 0, zIndex: 1000, height: scrolled ? '65px' : '80px',
      backgroundColor: '#ffffff', borderBottom: '1px solid #eee'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Link to="/" style={{ fontSize: '22px', fontWeight: '800', color: '#1e293b', textDecoration: 'none' }}>
          <span style={{ color: '#007bff' }}>Rent</span>Ease
        </Link>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <Link to="/cart" style={{ position: 'relative', color: '#334155' }}>
          <FaShoppingCart size={20} />
          {cartCount > 0 && <span style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#007bff', color: '#fff', fontSize: '10px', borderRadius: '50%', padding: '2px 5px' }}>{cartCount}</span>}
        </Link>

        {isLoggedIn ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '13px', fontWeight: '700' }}>{userName}</span>
            <button onClick={handleLogoutAction} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '12px' }}>Logout</button>
          </div>
        ) : (
          <Link to="/login" style={{ background: '#1e293b', color: '#fff', padding: '8px 16px', borderRadius: '8px', textDecoration: 'none' }}>Login</Link>
        )}
      </div>
    </nav>
  );
};

// --- YEH LINE SABSE ZAROORI HAI ---
export default Navbar;