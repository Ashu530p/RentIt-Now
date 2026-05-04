import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  // Menu items list including the new Maintenance feature
  const menuItems = [
    { to: '/admin', icon: '📊', label: 'Dashboard', end: true },
    { to: '/admin/inventory', icon: '📦', label: 'Inventory' },
    { to: '/admin/pricing', icon: '💰', label: 'Pricing' },
    { to: '/admin/orders', icon: '📋', label: 'Orders' },
    { to: '/admin/maintenance', icon: '🔧', label: 'Maintenance' }, // 🆕 Added for PRD compliance
  ];

  return (
    <div style={{
      ...styles.sidebar,
      transform: isOpen ? 'translateX(0)' : 'translateX(-100%)', 
    }}>
      <div style={styles.brand}>
        <div style={styles.logoGroup}>
          <div style={styles.logoCircle}>R</div>
          <h2 style={styles.logoText}>RentEase <span style={styles.proTag}>PRO</span></h2>
        </div>
        <button onClick={toggleSidebar} style={styles.closeBtn}>✕</button>
      </div>

      <nav style={styles.nav}>
        {menuItems.map((item) => (
          <NavLink 
            key={item.label}
            to={item.to} 
            end={item.end} 
            onClick={toggleSidebar} 
            style={({ isActive }) => ({
              ...styles.link,
              ...(isActive ? styles.activeLink : {})
            })}
          >
            <span style={styles.icon}>{item.icon}</span> {item.label}
          </NavLink>
        ))}
      </nav>

      <div style={styles.footer}>
        <p style={styles.adminName}>Admin: <strong>asjhuuu</strong></p>
        <button 
          onClick={() => { localStorage.clear(); window.location.href='/login'; }} 
          style={styles.logoutBtn}
        >
          🚪 Logout Session
        </button>
      </div>
    </div>
  );
};

const styles = {
  sidebar: {
    width: '280px', 
    height: '100vh', 
    background: 'linear-gradient(180deg, #111827 0%, #000000 100%)', // Deep dark gradient
    color: '#fff',
    position: 'fixed', 
    top: 0, 
    left: 0, 
    zIndex: 1002,
    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)', 
    padding: '40px 20px', 
    display: 'flex', 
    flexDirection: 'column',
    boxShadow: '10px 0 30px rgba(0,0,0,0.5)'
  },
  brand: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' },
  logoGroup: { display: 'flex', alignItems: 'center', gap: '12px' },
  logoCircle: { width: '32px', height: '32px', background: '#00d4ff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' },
  logoText: { fontSize: '20px', margin: 0, letterSpacing: '1px' },
  proTag: { fontSize: '10px', background: 'rgba(0,212,255,0.2)', color: '#00d4ff', padding: '2px 6px', borderRadius: '4px' },
  closeBtn: { background: 'none', border: 'none', color: '#64748b', fontSize: '24px', cursor: 'pointer' },
  nav: { display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 },
  link: { 
    color: '#94a3b8', 
    textDecoration: 'none', 
    fontSize: '16px', 
    padding: '14px 18px', 
    borderRadius: '12px', 
    display: 'flex', 
    alignItems: 'center',
    transition: '0.3s all'
  },
  activeLink: { 
    background: 'rgba(0, 212, 255, 0.1)', 
    color: '#00d4ff', 
    fontWeight: 'bold',
    boxShadow: 'inset 0 0 0 1px rgba(0, 212, 255, 0.3)'
  },
  icon: { marginRight: '15px', fontSize: '20px' },
  footer: { borderTop: '1px solid #1f2937', paddingTop: '20px' },
  adminName: { fontSize: '12px', color: '#64748b', marginBottom: '10px' },
  logoutBtn: { 
    width: '100%', padding: '12px', borderRadius: '10px', background: '#dc2626', 
    color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' 
  }
};

export default AdminSidebar;