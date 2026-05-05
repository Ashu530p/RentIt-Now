import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaChartLine, FaBox, FaRupeeSign, FaClipboardList, FaTools, FaPowerOff, FaShieldAlt } from 'react-icons/fa';

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  // Logic: Professional Menu Structure with React-Icons
  const menuItems = [
    { section: 'ANALYTICS', items: [
      { to: '/admin', icon: <FaChartLine />, label: 'Dashboard', end: true },
    ]},
    { section: 'MANAGEMENT', items: [
      { to: '/admin/inventory', icon: <FaBox />, label: 'Inventory' },
      { to: '/admin/pricing', icon: <FaRupeeSign />, label: 'Pricing Plans' },
      { to: '/admin/orders', icon: <FaClipboardList />, label: 'All Orders' },
      { to: '/admin/maintenance', icon: <FaTools />, label: 'Maintenance' },
    ]}
  ];

  return (
    <aside style={{
      ...styles.sidebar,
      transform: isOpen ? 'translateX(0)' : 'translateX(-100%)', 
    }}>
      {/* Brand Header */}
      <div style={styles.brand}>
        <div style={styles.logoGroup}>
          <div style={styles.logoBox}>RE</div>
          <h2 style={styles.logoText}>RentEase <span style={styles.proBadge}>ADMIN</span></h2>
        </div>
        {/* Mobile Close Only */}
        <button onClick={toggleSidebar} style={styles.mobileCloseBtn} className="hide-on-desktop">✕</button>
      </div>

      {/* Navigation Groups */}
      <nav style={styles.navScroll}>
        {menuItems.map((group, idx) => (
          <div key={idx} style={styles.menuGroup}>
            <p style={styles.groupLabel}>{group.section}</p>
            {group.items.map((item) => (
              <NavLink 
                key={item.label}
                to={item.to} 
                end={item.end} 
                onClick={window.innerWidth < 1024 ? toggleSidebar : null} 
                className="nav-link"
                style={({ isActive }) => ({
                  ...styles.link,
                  ...(isActive ? styles.activeLink : {})
                })}
              >
                <span className="icon-box" style={styles.icon}>{item.icon}</span> 
                <span style={styles.label}>{item.label}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* Admin Profile & Logout */}
      <div style={styles.footer}>
        <div style={styles.adminCard}>
          <div style={styles.avatar}>A</div>
          <div style={styles.adminInfo}>
            <span style={styles.name}>Admin_Ashish</span>
            <span style={styles.role}><FaShieldAlt size={10}/> Root Access</span>
          </div>
          <button 
            onClick={() => { localStorage.clear(); window.location.href='/login'; }} 
            style={styles.powerBtn}
            title="Logout Session"
          >
            <FaPowerOff />
          </button>
        </div>
      </div>

      <style>{`
        .nav-link:hover { background: rgba(255,255,255,0.05); color: #fff !important; transform: translateX(5px); }
        .nav-link:hover .icon-box { color: #00d4ff; }
        @media (min-width: 1025px) { .hide-on-desktop { display: none !important; } }
      `}</style>
    </aside>
  );
};

const styles = {
  sidebar: {
    width: '280px', height: '100vh', background: '#0f172a', // Slate-900 for modern deep feel
    color: '#fff', position: 'fixed', top: 0, left: 0, zIndex: 1002,
    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)', padding: '30px 20px',
    display: 'flex', flexDirection: 'column', borderRight: '1px solid rgba(255,255,255,0.05)'
  },
  brand: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', padding: '0 10px' },
  logoGroup: { display: 'flex', alignItems: 'center', gap: '15px' },
  logoBox: { width: '35px', height: '35px', background: 'linear-gradient(135deg, #00d4ff, #007bff)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '14px', boxShadow: '0 4px 10px rgba(0,212,255,0.3)' },
  logoText: { fontSize: '18px', fontWeight: '800', margin: 0, letterSpacing: '0.5px' },
  proBadge: { fontSize: '9px', color: '#00d4ff', border: '1px solid rgba(0,212,255,0.3)', padding: '2px 6px', borderRadius: '4px', marginLeft: '5px' },
  mobileCloseBtn: { background: 'none', border: 'none', color: '#64748b', fontSize: '20px', cursor: 'pointer' },
  
  navScroll: { flex: 1, overflowY: 'auto', paddingRight: '5px' },
  menuGroup: { marginBottom: '25px' },
  groupLabel: { fontSize: '10px', fontWeight: '800', color: '#475569', letterSpacing: '1.5px', marginBottom: '12px', paddingLeft: '15px' },
  
  link: { 
    color: '#94a3b8', textDecoration: 'none', fontSize: '14px', padding: '12px 15px', 
    borderRadius: '12px', display: 'flex', alignItems: 'center', transition: '0.3s all', marginBottom: '4px'
  },
  activeLink: { 
    background: 'linear-gradient(90deg, rgba(0,212,255,0.1) 0%, rgba(0,212,255,0) 100%)',
    color: '#00d4ff', fontWeight: '700', borderLeft: '3px solid #00d4ff', borderRadius: '0 12px 12px 0'
  },
  icon: { marginRight: '15px', fontSize: '18px', display: 'flex' },
  
  footer: { marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)' },
  adminCard: { background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '15px', display: 'flex', alignItems: 'center', gap: '12px' },
  avatar: { width: '35px', height: '35px', background: '#1e293b', border: '1px solid #334155', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#00d4ff' },
  adminInfo: { flex: 1, display: 'flex', flexDirection: 'column' },
  name: { fontSize: '13px', fontWeight: '700', color: '#f1f5f9' },
  role: { fontSize: '10px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' },
  powerBtn: { background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '16px', padding: '8px', transition: '0.2s' }
};

export default AdminSidebar;