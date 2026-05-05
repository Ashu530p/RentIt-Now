import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { FaBars, FaTimes, FaChevronRight } from 'react-icons/fa';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);
  const location = useLocation();

  // Logic: Screen resize hone par sidebar adjust karna
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) setIsSidebarOpen(true);
      else setIsSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Logic: Mobile par link click karte hi sidebar band ho jaye
  useEffect(() => {
    if (window.innerWidth <= 1024) setIsSidebarOpen(false);
  }, [location]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div style={styles.layout}>
      {/* Sidebar Component */}
      <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div style={{
        ...styles.mainContent,
        marginLeft: window.innerWidth > 1024 && isSidebarOpen ? '280px' : '0'
      }}>
        
        {/* Modern Top Header (Better than floating button) */}
        <header style={styles.topHeader}>
          <div style={styles.headerLeft}>
            <button onClick={toggleSidebar} style={styles.menuToggle}>
              {isSidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
            <div style={styles.breadcrumb}>
              <span style={styles.breadBase}>Admin</span> 
              <FaChevronRight size={10} color="#cbd5e1" /> 
              <span style={styles.breadCurrent}>
                {location.pathname.split('/').pop().toUpperCase() || 'DASHBOARD'}
              </span>
            </div>
          </div>
          
          <div style={styles.headerRight}>
            <div style={styles.adminBadge}>Control Panel v2.0</div>
          </div>
        </header>
        
        {/* Page Content Area */}
        <main style={styles.pageContainer}>
          <Outlet />
        </main>
      </div>

      {/* Mobile Overlay with Blur */}
      {isSidebarOpen && window.innerWidth <= 1024 && (
        <div onClick={toggleSidebar} style={styles.overlay}></div>
      )}
    </div>
  );
};

const styles = {
  layout: { 
    display: 'flex', 
    minHeight: '100vh', 
    background: '#f8fafc', // Modern off-white background
    fontFamily: "'Poppins', sans-serif"
  },
  mainContent: { 
    flex: 1, 
    transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'flex',
    flexDirection: 'column'
  },
  topHeader: {
    height: '70px',
    background: '#fff',
    borderBottom: '1px solid #e2e8f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 30px',
    position: 'sticky',
    top: 0,
    zIndex: 900
  },
  headerLeft: { display: 'flex', alignItems: 'center', gap: '20px' },
  menuToggle: {
    background: '#f1f5f9',
    border: 'none',
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    cursor: 'pointer',
    color: '#64748b',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    transition: '0.2s'
  },
  breadcrumb: { display: 'flex', alignItems: 'center', gap: '10px' },
  breadBase: { fontSize: '13px', fontWeight: '600', color: '#94a3b8' },
  breadCurrent: { fontSize: '13px', fontWeight: '800', color: '#1e293b', letterSpacing: '0.5px' },
  
  headerRight: { display: 'flex', alignItems: 'center' },
  adminBadge: { 
    fontSize: '11px', fontWeight: '700', color: '#007bff', 
    background: '#e0f2fe', padding: '5px 12px', borderRadius: '50px' 
  },

  pageContainer: { 
    padding: '40px',
    maxWidth: '1200px',
    width: '100%',
    margin: '0 auto'
  },
  overlay: { 
    position: 'fixed', 
    top: 0, 
    left: 0, 
    width: '100%', 
    height: '100%', 
    background: 'rgba(15, 23, 42, 0.3)', // Slate-900 tint
    backdropFilter: 'blur(4px)',
    zIndex: 1001 
  }
};

export default AdminLayout;