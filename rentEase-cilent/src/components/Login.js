import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaTimes, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';

const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Logic: Simulation of API delay
    setTimeout(() => {
      const role = email.includes('admin') ? 'admin' : 'customer';
      onLoginSuccess({ 
        name: 'Aashish', 
        email: email,
        role: role,
        avatar: 'A' 
      });
      setLoading(false);
      navigate(role === 'admin' ? '/admin' : '/');
    }, 1000);
  };

  return (
    <div style={styles.background}>
      <div style={styles.loginCard} className="fade-in-up">
        
        {/* Close Button */}
        <button 
          style={styles.closeBtn} 
          onClick={() => navigate('/')} 
          title="Back to Home"
        >
          <FaTimes />
        </button>

        <div style={styles.header}>
          <h2 style={styles.title}>Welcome Back!</h2>
          <p style={styles.subtitle}>Login to manage your rentals and payments.</p>
        </div>

        {/* Social Login (RentoMojo Style) */}
        <button style={styles.googleBtn}>
          <FaGoogle style={{marginRight: '10px'}} /> Sign in with Google
        </button>

        <div style={styles.divider}>
          <span style={styles.dividerText}>OR LOGIN WITH EMAIL</span>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <div style={styles.inputWrapper}>
              <FaEnvelope style={styles.icon} />
              <input 
                type="email" 
                placeholder="name@example.com" 
                style={styles.input} 
                required 
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <label style={styles.label}>Password</label>
              <Link to="/forgot-password" style={styles.forgotLink}>Forgot?</Link>
            </div>
            <div style={styles.inputWrapper}>
              <FaLock style={styles.icon} />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••" 
                style={styles.input} 
                required 
                onChange={(e) => setPassword(e.target.value)}
              />
              <div style={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>

          <button type="submit" style={styles.loginBtn} disabled={loading} className="btn-glow">
            {loading ? "Verifying..." : "Login to Account"}
          </button>
        </form>

        <p style={styles.footerText}>
          New to RentEase? <Link to="/signup" style={styles.signupLink}>Create an account</Link>
        </p>
      </div>

      <style>{`
        .fade-in-up { animation: fadeInUp 0.5s ease-out; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .btn-glow:hover { background: #334155 !important; transform: translateY(-2px); box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important; }
        input:focus { border-color: #007bff !important; background: #fff !important; box-shadow: 0 0 0 4px rgba(0,123,255,0.1); }
      `}</style>
    </div>
  );
};

const styles = {
  background: { height: '100vh', width: '100%', backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.8)), url("https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600")', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  loginCard: { background: '#ffffff', padding: '50px 45px', borderRadius: '32px', boxShadow: '0 25px 50px rgba(0,0,0,0.15)', width: '100%', maxWidth: '440px', position: 'relative' },
  closeBtn: { position: 'absolute', top: '25px', right: '25px', width: '35px', height: '35px', borderRadius: '50%', background: '#f1f5f9', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', cursor: 'pointer', transition: '0.3s' },
  header: { textAlign: 'center', marginBottom: '30px' },
  title: { fontSize: '28px', fontWeight: '900', color: '#1e293b', margin: 0 },
  subtitle: { fontSize: '14px', color: '#64748b', marginTop: '8px' },
  
  googleBtn: { width: '100%', padding: '14px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', color: '#475569', cursor: 'pointer', marginBottom: '25px', transition: '0.2s' },
  divider: { position: 'relative', textAlign: 'center', marginBottom: '30px', borderBottom: '1px solid #f1f5f9' },
  dividerText: { position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', background: '#fff', padding: '0 15px', fontSize: '10px', fontWeight: '800', color: '#cbd5e1', letterSpacing: '1px' },

  form: { display: 'flex', flexDirection: 'column', gap: '22px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { fontSize: '12px', fontWeight: '800', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' },
  forgotLink: { fontSize: '12px', color: '#007bff', textDecoration: 'none', fontWeight: '700' },
  inputWrapper: { position: 'relative', display: 'flex', alignItems: 'center' },
  icon: { position: 'absolute', left: '18px', color: '#94a3b8' },
  input: { width: '100%', padding: '15px 15px 15px 50px', borderRadius: '16px', border: '2px solid #f1f5f9', fontSize: '15px', outline: 'none', transition: '0.3s', background: '#f8fafc' },
  eyeIcon: { position: 'absolute', right: '18px', color: '#94a3b8', cursor: 'pointer' },
  
  loginBtn: { padding: '18px', background: '#1e293b', color: '#fff', border: 'none', borderRadius: '16px', fontWeight: '800', fontSize: '16px', cursor: 'pointer', transition: '0.3s' },
  footerText: { textAlign: 'center', marginTop: '25px', fontSize: '14px', color: '#64748b' },
  signupLink: { color: '#007bff', textDecoration: 'none', fontWeight: '800' }
};

export default Login;