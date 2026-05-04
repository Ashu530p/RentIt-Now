import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaTimes, FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('customer');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup Data:", { ...formData, role });
    alert("Account Created Successfully! 🎉 Please Login.");
    navigate('/login');
  };

  return (
    <div style={styles.background}>
      <div style={styles.signupCard}>
        
        {/* 🔙 BACK / CROSS BUTTON */}
        <button 
          style={styles.closeBtn} 
          onClick={() => navigate('/')} 
          title="Back to Home"
        >
          <FaTimes />
        </button>

        <div style={styles.header}>
          <h2 style={styles.title}>Create Account ✨</h2>
          <p style={styles.subtitle}>Join RentEase and start upgrading your lifestyle.</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <div style={styles.inputWrapper}>
              <FaUser style={styles.icon} />
              <input 
                type="text" 
                placeholder="Aashish Parmar" 
                style={styles.input} 
                required 
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <div style={styles.inputWrapper}>
              <FaEnvelope style={styles.icon} />
              <input 
                type="email" 
                placeholder="aashish@example.com" 
                style={styles.input} 
                required 
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.inputWrapper}>
              <FaLock style={styles.icon} />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••" 
                style={styles.input} 
                required 
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              <div 
                style={styles.eyeIcon} 
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>I am a...</label>
            <select 
              style={styles.select} 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="customer">Customer (Rent Items)</option>
              <option value="admin">Admin (Manage Inventory)</option>
            </select>
          </div>

          <button type="submit" style={styles.signupBtn}>Sign Up</button>
        </form>

        <p style={styles.footerText}>
          Already have an account? <Link to="/login" style={styles.loginLink}>Login</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  background: { 
    height: '100vh', 
    width: '100%', 
    // 🏠 SAME RENT THEME BACKGROUND AS LOGIN
    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1600")', 
    backgroundSize: 'cover', 
    backgroundPosition: 'center', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    padding: '20px'
  },
  signupCard: { 
    background: 'rgba(255, 255, 255, 0.95)', 
    padding: '40px', 
    borderRadius: '24px', 
    boxShadow: '0 20px 50px rgba(0,0,0,0.3)', 
    width: '100%', 
    maxWidth: '480px', 
    position: 'relative',
    backdropFilter: 'blur(10px)'
  },
  closeBtn: { 
    position: 'absolute', 
    top: '20px', 
    right: '20px', 
    width: '35px', 
    height: '35px', 
    borderRadius: '50%', 
    background: '#f1f5f9', 
    border: 'none', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    fontSize: '18px', 
    color: '#64748b', 
    cursor: 'pointer', 
    transition: '0.3s' 
  },
  header: { textAlign: 'center', marginBottom: '25px' },
  title: { fontSize: '26px', fontWeight: '800', color: '#1e293b', margin: '0' },
  subtitle: { fontSize: '14px', color: '#64748b', marginTop: '8px' },
  form: { display: 'flex', flexDirection: 'column', gap: '18px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '13px', fontWeight: '700', color: '#475569' },
  inputWrapper: { position: 'relative', display: 'flex', alignItems: 'center' },
  icon: { position: 'absolute', left: '15px', color: '#94a3b8' },
  input: { 
    width: '100%', 
    padding: '12px 15px 12px 45px', 
    borderRadius: '12px', 
    border: '1px solid #e2e8f0', 
    fontSize: '15px', 
    outline: 'none',
    boxSizing: 'border-box',
    background: '#fff'
  },
  select: {
    width: '100%', 
    padding: '12px', 
    borderRadius: '12px', 
    border: '1px solid #e2e8f0', 
    fontSize: '15px', 
    background: '#fff',
    outline: 'none',
    cursor: 'pointer'
  },
  eyeIcon: { position: 'absolute', right: '15px', color: '#94a3b8', cursor: 'pointer' },
  signupBtn: { 
    padding: '16px', 
    background: '#007bff', 
    color: '#fff', 
    border: 'none', 
    borderRadius: '12px', 
    fontWeight: '800', 
    fontSize: '16px', 
    cursor: 'pointer', 
    boxShadow: '0 10px 20px rgba(0,123,255,0.2)', 
    marginTop: '10px' 
  },
  footerText: { textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#64748b' },
  loginLink: { color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }
};

export default Signup;