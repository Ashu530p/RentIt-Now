import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserProfileSidebar = ({ isOpen, onClose, userName, onLogout }) => {
  const navigate = useNavigate();

  // Agar sidebar open nahi hai toh kuch mat dikhao
  if (!isOpen) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.sidebar} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button onClick={onClose} style={styles.closeBtn}>&times;</button>

        {/* Profile Header */}
        <div style={styles.header}>
          <div style={styles.avatarLarge}>{userName ? userName[0].toUpperCase() : 'A'}</div>
          <h2 style={styles.title}>Hi, {userName}!</h2>
          <p style={styles.subtitle}>Welcome to RentEase</p>
        </div>

        {/* Vertical Menu Buttons */}
        <div style={styles.menuContainer}>
          {/* 🆕 Yeh button ab seedha naye page par le jayega */}
          <button 
            style={styles.menuBtn} 
            onClick={() => { 
              navigate('/profile'); 
              onClose(); 
            }}
          >
            <span style={styles.icon}>👤</span> Personal Information
          </button>
          
          <button 
            style={styles.menuBtn} 
            onClick={() => { 
              navigate('/orders'); 
              onClose(); 
            }}
          >
            <span style={styles.icon}>📦</span> Order History
          </button>

          <button style={styles.logoutBtn} onClick={onLogout}>
            <span style={styles.icon}>🚪</span> Logout
          </button>
        </div>

        <div style={styles.footer}>
          <p style={styles.footerText}>RentEase v1.0</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: { 
    position: 'fixed', 
    top: 0, 
    left: 0, 
    width: '100%', 
    height: '100%', 
    background: 'rgba(0,0,0,0.6)', 
    zIndex: 2000, 
    display: 'flex', 
    justifyContent: 'flex-end' 
  },
  sidebar: { 
    width: '350px', 
    height: '100%', 
    background: '#fff', 
    padding: '40px 25px', 
    boxShadow: '-5px 0 15px rgba(0,0,0,0.2)', 
    position: 'relative',
    display: 'flex',
    flexDirection: 'column'
  },
  closeBtn: { 
    position: 'absolute', 
    top: '20px', 
    right: '20px', 
    fontSize: '30px', 
    border: 'none', 
    background: 'none', 
    cursor: 'pointer', 
    color: '#888' 
  },
  header: { textAlign: 'center', marginBottom: '40px' },
  avatarLarge: { 
    width: '90px', 
    height: '90px', 
    background: 'linear-gradient(135deg, #007bff, #00d4ff)', 
    color: '#fff', 
    borderRadius: '50%', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    fontSize: '36px', 
    fontWeight: 'bold', 
    margin: '0 auto 15px', 
    boxShadow: '0 4px 10px rgba(0,123,255,0.3)' 
  },
  title: { fontSize: '22px', margin: '0', color: '#1e293b', fontWeight: '800' },
  subtitle: { fontSize: '14px', color: '#64748b', marginTop: '5px' },
  menuContainer: { display: 'flex', flexDirection: 'column', gap: '15px' },
  menuBtn: { 
    padding: '16px', 
    textAlign: 'left', 
    background: '#f8fafc', 
    border: '1px solid #f1f5f9', 
    borderRadius: '12px', 
    cursor: 'pointer', 
    fontSize: '15px', 
    fontWeight: '600', 
    color: '#475569',
    transition: '0.3s',
    display: 'flex',
    alignItems: 'center'
  },
  icon: { marginRight: '12px' },
  logoutBtn: { 
    padding: '16px', 
    textAlign: 'left', 
    background: 'none', 
    border: 'none', 
    color: '#ef4444', 
    cursor: 'pointer', 
    fontSize: '15px', 
    fontWeight: 'bold',
    marginTop: '10px'
  },
  footer: { marginTop: 'auto', textAlign: 'center' },
  footerText: { fontSize: '12px', color: '#cbd5e1' }
};

export default UserProfileSidebar;