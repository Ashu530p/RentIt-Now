import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserProfileSidebar = ({ isOpen, onClose, userName, onLogout }) => {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  // Logic: Sidebar slide-in animation trigger
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setAnimate(true), 10);
    } else {
      setAnimate(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNav = (path) => {
    setAnimate(false);
    setTimeout(() => {
      navigate(path);
      onClose();
    }, 300); // Wait for slide-out animation
  };

  return (
    <div style={{...styles.overlay, opacity: animate ? 1 : 0}} onClick={onClose}>
      <div 
        style={{
          ...styles.sidebar, 
          transform: animate ? 'translateX(0)' : 'translateX(100%)'
        }} 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Section */}
        <div style={styles.header}>
          <button onClick={onClose} style={styles.closeBtn}>
            <i className="fa fa-times"></i>
          </button>
          <div style={styles.avatarLarge}>
            {userName ? userName[0].toUpperCase() : 'A'}
          </div>
          <h2 style={styles.title}>{userName || 'Guest User'}</h2>
          <div style={styles.verifiedBadge}>
            <i className="fa fa-check-circle"></i> Verified Profile
          </div>
        </div>

        {/* Menu Items Logic */}
        <div style={styles.menuContainer}>
          <p style={styles.sectionLabel}>MY ACCOUNT</p>
          
          <button style={styles.menuBtn} onClick={() => handleNav('/profile')}>
            <i className="fa fa-user" style={styles.icon}></i> Personal Information
          </button>
          
          <button style={styles.menuBtn} onClick={() => handleNav('/orders')}>
            <i className="fa fa-box-open" style={styles.icon}></i> My Rentals / Orders
          </button>

          <button style={styles.menuBtn} onClick={() => handleNav('/credits')}>
            <i className="fa fa-wallet" style={styles.icon}></i> RentEase Credits
          </button>

          <div style={styles.divider}></div>
          <p style={styles.sectionLabel}>SUPPORT & LEGAL</p>

          <button style={styles.menuBtn} onClick={() => handleNav('/support')}>
            <i className="fa fa-headset" style={styles.icon}></i> Help & Support
          </button>

          <button style={styles.logoutBtn} onClick={onLogout}>
            <i className="fa fa-sign-out-alt" style={styles.icon}></i> Logout
          </button>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <p style={styles.footerText}>RentEase – Everything on Rent.</p>
          <span style={styles.version}>v2.0.4 Premium</span>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: { 
    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
    background: 'rgba(0,0,0,0.4)', zIndex: 9999, transition: '0.3s ease-in-out',
    backdropFilter: 'blur(4px)'
  },
  sidebar: { 
    position: 'absolute', right: 0, width: '320px', height: '100%', 
    background: '#fff', boxShadow: '-10px 0 30px rgba(0,0,0,0.1)', 
    transition: '0.4s cubic-bezier(0.4, 0, 0.2, 1)', display: 'flex', flexDirection: 'column'
  },
  header: { 
    padding: '40px 25px', background: '#f8fafc', textAlign: 'center', 
    borderBottom: '1px solid #f1f5f9', position: 'relative' 
  },
  closeBtn: { 
    position: 'absolute', top: '20px', left: '20px', background: 'none', 
    border: 'none', fontSize: '18px', cursor: 'pointer', color: '#64748b' 
  },
  avatarLarge: { 
    width: '70px', height: '70px', background: '#007bff', color: '#fff', 
    borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', 
    fontSize: '28px', fontWeight: 'bold', margin: '0 auto 15px', 
    boxShadow: '0 8px 16px rgba(0,123,255,0.2)' 
  },
  title: { fontSize: '20px', margin: 0, color: '#1e293b', fontWeight: '700' },
  verifiedBadge: { fontSize: '11px', color: '#10b981', marginTop: '5px', fontWeight: '600' },
  
  menuContainer: { padding: '25px', flex: 1 },
  sectionLabel: { fontSize: '11px', fontWeight: '700', color: '#94a3b8', letterSpacing: '1px', marginBottom: '15px' },
  menuBtn: { 
    width: '100%', padding: '14px 0', textAlign: 'left', background: 'none', 
    border: 'none', cursor: 'pointer', fontSize: '15px', fontWeight: '600', 
    color: '#475569', display: 'flex', alignItems: 'center', transition: '0.2s'
  },
  icon: { width: '25px', marginRight: '15px', color: '#64748b', fontSize: '16px' },
  divider: { height: '1px', background: '#f1f5f9', margin: '20px 0' },
  
  logoutBtn: { 
    width: '100%', padding: '14px 0', textAlign: 'left', background: 'none', 
    border: 'none', cursor: 'pointer', fontSize: '15px', fontWeight: '700', 
    color: '#ef4444', display: 'flex', alignItems: 'center' 
  },
  
  footer: { padding: '25px', borderTop: '1px solid #f1f5f9', textAlign: 'center' },
  footerText: { fontSize: '13px', fontWeight: '600', color: '#1e293b', margin: 0 },
  version: { fontSize: '10px', color: '#94a3b8' }
};

export default UserProfileSidebar;