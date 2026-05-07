// ... baaki imports wahi rahenge
import { useNavigate } from 'react-router-dom';

const Navbar = ({ cartCount, isLoggedIn, userName, userRole, onLogout }) => {
  const navigate = useNavigate();
  // ... baaki states (isSidebarOpen, scrolled, etc.)

  // --- LOGOUT LOGIC ---
  const handleLogoutAction = () => {
    localStorage.removeItem('user'); // User data saaf karein
    if (onLogout) onLogout(); // Parent state (App.js) ko batayein
    setSidebarOpen(false); // Sidebar band karein
    navigate('/login'); // Login par redirect karein
    window.location.reload(); // App state reset karne ke liye
  };

  return (
    <>
      <nav style={{ /* ... styles ... */ }}>
        {/* ... Left Section & Search ... */}

        <div style={styles.rightSection}>
          {/* ... Admin Badge & Cart ... */}

          {isLoggedIn ? (
            <div style={styles.userProfile} onClick={() => setSidebarOpen(true)}>
              <div style={styles.userInfo}>
                <span style={styles.userName}>{userName?.split(' ')[0]}</span>
                <span style={styles.userSub}>Account</span>
              </div>
              {/* Profile Avatar */}
              <div style={styles.avatar}>
                {userName ? userName[0].toUpperCase() : 'U'}
              </div>
            </div>
          ) : (
            <Link to="/login" style={styles.loginBtn}>Login</Link>
          )}
        </div>
      </nav>

      {/* Sidebar - Yahan handleLogoutAction pass karein */}
      {isSidebarOpen && (
        <UserProfileSidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
          userName={userName} 
          userRole={userRole}
          onLogout={handleLogoutAction} // Updated prop
        />
      )}
      
      {/* ... City Modal ... */}
    </>
  );
};