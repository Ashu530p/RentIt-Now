import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaTimes, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy login logic for RentEase
    if (email && password) {
      const role = email.includes('admin') ? 'admin' : 'user';
      onLoginSuccess({ name: 'Aashish', role: role });
      navigate(role === 'admin' ? '/admin' : '/');
    }
  };

  return (
    <div style={styles.background}>
      <div style={styles.loginCard}>
        
        {/* 🔙 BACK / CROSS BUTTON */}
        <button 
          style={styles.closeBtn} 
          onClick={() => navigate('/')} 
          title="Back to Home"
        >
          <FaTimes />
        </button>

        <div style={styles.header}>
          <h2 style={styles.title}>Login to RentEase 🔐</h2>
          <p style={styles.subtitle}>Welcome back! Please enter your details.</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <div style={styles.inputWrapper}>
              <FaEnvelope style={styles.icon} />
              <input 
                type="email" 
                placeholder="aashish@example.com" 
                style={styles.input} 
                required 
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
              />
              <div 
                style={styles.eyeIcon} 
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>

          <button type="submit" style={styles.loginBtn}>Login</button>
        </form>

        <p style={styles.footerText}>
          Don't have an account? <Link to="/signup" style={styles.signupLink}>Signup</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  background: { 
    height: '100vh', 
    width: '100%', 
    // 🏠 RENT WEBSITE BACKGROUND
    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600")', 
    backgroundSize: 'cover', 
    backgroundPosition: 'center', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  loginCard: { 
    background: 'rgba(255, 255, 255, 0.95)', 
    padding: '50px 40px', 
    borderRadius: '24px', 
    boxShadow: '0 20px 40px rgba(0,0,0,0.3)', 
    width: '100%', 
    maxWidth: '450px', 
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
  header: { textAlign: 'center', marginBottom: '30px' },
  title: { fontSize: '24px', fontWeight: '800', color: '#1e293b', margin: '0' },
  subtitle: { fontSize: '14px', color: '#64748b', marginTop: '8px' },
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { fontSize: '13px', fontWeight: '700', color: '#475569' },
  inputWrapper: { position: 'relative', display: 'flex', alignItems: 'center' },
  icon: { position: 'absolute', left: '15px', color: '#94a3b8' },
  input: { 
    width: '100%', 
    padding: '14px 15px 14px 45px', 
    borderRadius: '12px', 
    border: '1px solid #e2e8f0', 
    fontSize: '15px', 
    outline: 'none', 
    boxSizing: 'border-box'
  },
  eyeIcon: { position: 'absolute', right: '15px', color: '#94a3b8', cursor: 'pointer' },
  loginBtn: { 
    padding: '16px', 
    background: '#1e293b', 
    color: '#fff', 
    border: 'none', 
    borderRadius: '12px', 
    fontWeight: '800', 
    fontSize: '16px', 
    cursor: 'pointer', 
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)', 
    marginTop: '10px' 
  },
  footerText: { textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#64748b' },
  signupLink: { color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }
};

export default Login;