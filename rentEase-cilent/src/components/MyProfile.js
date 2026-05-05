import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserEdit, FaTimes, FaEnvelope, FaPhoneAlt, FaMapPin, FaIdCard, FaCalendarCheck, FaShieldAlt, FaCamera } from 'react-icons/fa';

const MyProfile = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState({ show: false, message: '' });

  const [profile, setProfile] = useState({
    fullName: localStorage.getItem('userName') || 'Aashish Parmar',
    email: 'aashish@example.com',
    phone: '9876543210',
    altPhone: '9123456789',
    pincode: '452001',
    address: 'Indore, Madhya Pradesh',
    memberSince: 'Jan 2026',
    KYCProgress: 100 // Visual indicator logic
  });

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('userName', profile.fullName);
    setToast({ show: true, message: `Profile updated successfully! 🚀` });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  return (
    <div style={styles.background}>
      
      {/* 🚀 PREMIUM TOAST */}
      {toast.show && (
        <div style={styles.toast}>
          <div style={styles.toastProgress}></div>
          <span style={{marginRight: '10px'}}>✨</span> {toast.message}
        </div>
      )}

      <div style={styles.profileCard} className="slide-up">
        
        <button style={styles.closeBtn} onClick={() => navigate('/')}>
          <FaTimes />
        </button>

        {/* Profile Header with Completion Tracker */}
        <div style={styles.header}>
          <div style={styles.avatarWrapper}>
            <div style={styles.avatar}>{profile.fullName[0].toUpperCase()}</div>
            <div style={styles.cameraIcon} title="Change Photo"><FaCamera size={12}/></div>
          </div>
          <h2 style={styles.title}>{profile.fullName}</h2>
          <div style={styles.badgeRow}>
            <span style={styles.verifyBadge}><FaIdCard /> KYC Verified</span>
            <span style={styles.memberBadge}><FaCalendarCheck /> {profile.memberSince}</span>
          </div>
          
          <div style={styles.progressSection}>
             <div style={styles.progressHeader}>
                <span>Profile Completion</span>
                <span>{profile.KYCProgress}%</span>
             </div>
             <div style={styles.progressBar}><div style={{...styles.progressFill, width: `${profile.KYCProgress}%`}}></div></div>
          </div>
        </div>

        <form onSubmit={handleSave}>
          <div style={styles.infoGrid}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>FULL NAME</label>
              <div style={styles.inputWrapper}>
                <input style={styles.input} value={profile.fullName} onChange={(e) => setProfile({...profile, fullName: e.target.value})} />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>EMAIL ADDRESS</label>
              <div style={styles.inputWrapper}>
                <input style={styles.input} type="email" value={profile.email} readOnly />
                <span style={styles.lockIcon}><FaShieldAlt size={12}/></span>
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>PRIMARY PHONE</label>
              <input style={styles.input} value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>PINCODE</label>
              <input style={styles.input} value={profile.pincode} onChange={(e) => setProfile({...profile, pincode: e.target.value})} />
            </div>

            <div style={{...styles.inputGroup, gridColumn: '1 / -1'}}>
              <label style={styles.label}>DELIVERY ADDRESS <FaMapPin size={10}/></label>
              <textarea 
                style={{...styles.input, height: '70px', paddingTop: '12px', resize: 'none'}} 
                value={profile.address} 
                onChange={(e) => setProfile({...profile, address: e.target.value})}
              />
            </div>
          </div>

          <div style={styles.btnRow}>
             <button type="submit" style={styles.saveBtn}>Update Account</button>
             <button type="button" style={styles.securityBtn} onClick={() => navigate('/forgot-password')}>Security Settings</button>
          </div>
        </form>
      </div>

      <style>{`
        .slide-up { animation: slideUp 0.5s ease-out; }
        @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes shrink { from { width: 100%; } to { width: 0%; } }
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
        input:focus, textarea:focus { border-color: #007bff !important; background: #fff !important; box-shadow: 0 0 0 4px rgba(0,123,255,0.05); }
      `}</style>
    </div>
  );
};

const styles = {
  background: { minHeight: '100vh', width: '100%', backgroundColor: '#f8fafc', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '60px 20px' },
  profileCard: { background: '#fff', padding: '40px', borderRadius: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', width: '100%', maxWidth: '700px', position: 'relative', border: '1px solid #f1f5f9' },
  
  toast: { position: 'fixed', top: '40px', right: '30px', background: '#1e293b', color: '#fff', padding: '16px 25px', borderRadius: '15px', zIndex: 9999, fontWeight: '700', animation: 'slideIn 0.4s ease-out', display: 'flex', alignItems: 'center', overflow: 'hidden', boxShadow: '0 15px 30px rgba(0,0,0,0.2)' },
  toastProgress: { position: 'absolute', bottom: 0, left: 0, height: '3px', background: '#10b981', animation: 'shrink 3s linear forwards' },
  
  closeBtn: { position: 'absolute', top: '30px', right: '30px', background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '35px', height: '35px', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  
  header: { textAlign: 'center', marginBottom: '35px' },
  avatarWrapper: { position: 'relative', width: '90px', margin: '0 auto 15px' },
  avatar: { width: '90px', height: '90px', background: 'linear-gradient(135deg, #007bff, #00d4ff)', borderRadius: '30px', color: '#fff', fontSize: '36px', fontWeight: '900', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px rgba(0,123,255,0.2)' },
  cameraIcon: { position: 'absolute', bottom: '-5px', right: '-5px', background: '#1e293b', color: '#fff', padding: '8px', borderRadius: '50%', border: '3px solid #fff', cursor: 'pointer' },
  
  title: { fontSize: '24px', fontWeight: '800', color: '#1e293b', margin: '0 0 10px' },
  badgeRow: { display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '25px' },
  verifyBadge: { background: '#ecfdf5', color: '#10b981', padding: '5px 12px', borderRadius: '50px', fontSize: '11px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '5px' },
  memberBadge: { background: '#f8fafc', color: '#64748b', padding: '5px 12px', borderRadius: '50px', fontSize: '11px', fontWeight: '800', border: '1px solid #e2e8f0' },
  
  progressSection: { maxWidth: '300px', margin: '0 auto' },
  progressHeader: { display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '700', color: '#94a3b8', marginBottom: '8px', textTransform: 'uppercase' },
  progressBar: { height: '6px', background: '#f1f5f9', borderRadius: '10px', overflow: 'hidden' },
  progressFill: { height: '100%', background: '#10b981', borderRadius: '10px', transition: '1s ease' },

  infoGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px', marginBottom: '35px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { fontSize: '11px', fontWeight: '800', color: '#64748b', letterSpacing: '0.5px' },
  inputWrapper: { position: 'relative' },
  input: { width: '100%', padding: '14px 18px', borderRadius: '15px', border: '2px solid #f1f5f9', background: '#f8fafc', fontSize: '14px', color: '#1e293b', outline: 'none', transition: '0.3s', boxSizing: 'border-box' },
  lockIcon: { position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', color: '#cbd5e1' },

  btnRow: { display: 'flex', gap: '15px' },
  saveBtn: { flex: 1.5, padding: '18px', background: '#1e293b', color: '#fff', border: 'none', borderRadius: '16px', fontWeight: '800', fontSize: '16px', cursor: 'pointer', transition: '0.3s' },
  securityBtn: { flex: 1, padding: '18px', background: '#fff', color: '#64748b', border: '2px solid #f1f5f9', borderRadius: '16px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }
};

export default MyProfile;