import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserEdit, FaTimes, FaEnvelope, FaPhoneAlt, FaMapPin, FaIdCard, FaCalendarCheck } from 'react-icons/fa';

const MyProfile = () => {
  const navigate = useNavigate();
  
  // 1. Toast State for Modern Notification
  const [toast, setToast] = useState({ show: false, message: '' });

  // 2. Profile Details State
  const [profile, setProfile] = useState({
    fullName: localStorage.getItem('userName') || 'Aashish',
    email: 'aashish@example.com',
    phone: '9876543210',
    altPhone: '9123456789',
    pincode: '452001',
    address: 'Indore, Madhya Pradesh',
    memberSince: 'Jan 2026'
  });

  // 3. Save Function with Custom Notification (No Alert!)
  const handleSave = (e) => {
    e.preventDefault();
    
    // Save to LocalStorage
    localStorage.setItem('userName', profile.fullName);

    // Show Custom Toast
    setToast({ show: true, message: `Profile updated for ${profile.fullName}! 🎉` });

    // Auto Hide after 3 seconds
    setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 3000);
  };

  return (
    <div style={styles.background}>
      
      {/* 🚀 CUSTOM PREMIUM TOAST */}
      {toast.show && (
        <div style={styles.toast}>
          <div style={styles.toastProgress}></div>
          <span style={{marginRight: '12px'}}>✅</span> {toast.message}
        </div>
      )}

      <div style={styles.profileCard}>
        
        {/* 🔙 BACK BUTTON */}
        <button style={styles.closeBtn} onClick={() => navigate('/')} title="Back to Home">
          <FaTimes />
        </button>

        <div style={styles.header}>
          <div style={styles.avatar}>{profile.fullName[0].toUpperCase()}</div>
          <h2 style={styles.title}>Account Settings</h2>
          <div style={styles.badgeRow}>
            <span style={styles.verifyBadge}><FaIdCard /> KYC Verified</span>
            <span style={styles.memberBadge}><FaCalendarCheck /> Since {profile.memberSince}</span>
          </div>
        </div>

        <form onSubmit={handleSave}>
          <div style={styles.infoGrid}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>FULL NAME</label>
              <input 
                style={styles.input} 
                value={profile.fullName} 
                onChange={(e) => setProfile({...profile, fullName: e.target.value})}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>EMAIL ADDRESS <FaEnvelope size={10}/></label>
              <input 
                style={styles.input} 
                type="email"
                value={profile.email} 
                onChange={(e) => setProfile({...profile, email: e.target.value})}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>PRIMARY PHONE <FaPhoneAlt size={10}/></label>
              <input 
                style={styles.input} 
                value={profile.phone} 
                onChange={(e) => setProfile({...profile, phone: e.target.value})}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>SECONDARY PHONE</label>
              <input 
                style={styles.input} 
                value={profile.altPhone} 
                onChange={(e) => setProfile({...profile, altPhone: e.target.value})}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>PINCODE <FaMapPin size={10}/></label>
              <input 
                style={styles.input} 
                value={profile.pincode} 
                onChange={(e) => setProfile({...profile, pincode: e.target.value})}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>KYC STATUS</label>
              <div style={styles.kycBox}>Verified ✓</div>
            </div>

            <div style={{...styles.inputGroup, gridColumn: '1 / -1'}}>
              <label style={styles.label}>DELIVERY ADDRESS</label>
              <textarea 
                style={{...styles.input, height: '80px', paddingTop: '12px', resize: 'none'}} 
                value={profile.address} 
                onChange={(e) => setProfile({...profile, address: e.target.value})}
              />
            </div>
          </div>

          <button type="submit" style={styles.saveBtn}>
            <FaUserEdit style={{marginRight: '8px'}} /> Save Changes
          </button>
        </form>
      </div>

      {/* Animations for Toast */}
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

const styles = {
  background: { 
    minHeight: '100vh', width: '100%', 
    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600")', 
    backgroundSize: 'cover', backgroundPosition: 'center', 
    display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '60px 20px' 
  },
  profileCard: { 
    background: 'rgba(255, 255, 255, 0.95)', padding: '40px', borderRadius: '30px', 
    boxShadow: '0 25px 50px rgba(0,0,0,0.2)', width: '100%', maxWidth: '750px', 
    position: 'relative', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)' 
  },
  toast: {
    position: 'fixed', top: '100px', right: '30px', background: '#1e293b', color: '#fff', 
    padding: '16px 25px', borderRadius: '12px', zIndex: 9999, fontWeight: 'bold',
    animation: 'slideIn 0.4s ease-out', display: 'flex', alignItems: 'center', overflow: 'hidden'
  },
  toastProgress: {
    position: 'absolute', bottom: 0, left: 0, height: '4px', background: '#10b981', 
    animation: 'shrink 3s linear forwards'
  },
  closeBtn: { position: 'absolute', top: '25px', right: '25px', background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '35px', height: '35px', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  header: { textAlign: 'center', marginBottom: '30px' },
  avatar: { width: '80px', height: '80px', background: 'linear-gradient(135deg, #007bff, #00d4ff)', borderRadius: '50%', color: '#fff', fontSize: '32px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', boxShadow: '0 8px 15px rgba(0,123,255,0.3)' },
  title: { fontSize: '26px', fontWeight: '800', color: '#1e293b', marginBottom: '8px' },
  badgeRow: { display: 'flex', justifyContent: 'center', gap: '10px' },
  verifyBadge: { background: '#ecfdf5', color: '#10b981', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' },
  memberBadge: { background: '#eff6ff', color: '#1d4ed8', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' },
  infoGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '30px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '11px', fontWeight: '800', color: '#475569', letterSpacing: '0.8px' },
  input: { padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#fff', fontSize: '14px', color: '#334155', outline: 'none' },
  kycBox: { padding: '12px 16px', borderRadius: '12px', color: '#10b981', fontWeight: 'bold', background: '#ecfdf5', border: '1px solid #10b981', fontSize: '14px' },
  saveBtn: { width: '100%', padding: '16px', background: '#1e293b', color: '#fff', border: 'none', borderRadius: '14px', fontWeight: '800', fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }
};

export default MyProfile;