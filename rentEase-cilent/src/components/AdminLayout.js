import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div style={styles.layout}>
      {/* Sidebar ko control karne ke liye state pass ki */}
      <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div style={styles.mainContent}>
        {/* Mobile/Edge style button agar Navbar upar hai */}
        <button onClick={toggleSidebar} style={styles.menuBtn}>
          {isSidebarOpen ? '✖ Close' : '☰ Admin Menu'}
        </button>
        
        <div style={styles.pageContainer}>
          <Outlet />
        </div>
      </div>

      {/* Overlay: Jab sidebar khulega toh peeche ka area dark ho jayega */}
      {isSidebarOpen && <div onClick={toggleSidebar} style={styles.overlay}></div>}
    </div>
  );
};

const styles = {
  layout: { display: 'flex', minHeight: '100vh', background: '#f4f7f6', position: 'relative' },
  mainContent: { flex: 1, padding: '20px' },
  menuBtn: { 
    position: 'fixed', top: '85px', left: '20px', zIndex: 999, 
    padding: '10px 15px', background: '#00d4ff', color: '#fff', 
    border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' 
  },
  pageContainer: { marginTop: '60px' },
  overlay: { 
    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
    background: 'rgba(0,0,0,0.3)', zIndex: 1001 
  }
};

export default AdminLayout;