import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaTimes, FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle, FaFacebook } from 'react-icons/fa';

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
    // Logic: Form validation checks can go here
    console.log("Signup Data:", { ...formData, role });
    alert(`Welcome to RentEase, ${formData.fullName.split(' ')[0]}! 🎉 Account created.`);
    navigate('/login');
  };

  return (
    <div style={styles.background}>
      <div style={styles.signupCard} className="fade-in-scale">
        
        {/* Close Button */}
        <button 
          style={styles.closeBtn} 
          onClick={() => navigate('/')} 
          title="Back to Home"
        >
          <FaTimes />
        </button>

        <div style={styles.header}>
          <h2 style={styles.title}>Join RentEase ✨</h2>
          <p style={styles.subtitle}>Rent the lifestyle you deserve, today.</p>
        </div>

        {/* Social Signup (RentoMojo Style) */}
        <div style={styles.socialGroup}>
            <button style={styles.socialBtn}><FaGoogle /> Google</button>
            <button style={styles.socialBtn}><FaFacebook /> Facebook</button>
        </div>

        <div style={styles.divider}>
            <span style={styles.dividerText}>OR CONTINUE WITH EMAIL</span>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Role Toggle Logic */}
          <div style={styles.roleToggle}>
            <div 
                style={role === 'customer' ? styles.roleActive : styles.roleItem} 
                onClick={() => setRole('customer')}
            >
                Customer
            </div>
            <div 
                style={role === 'admin' ? styles.roleActive : styles.roleItem} 
                onClick={() => setRole('admin')}
            >
                Admin
            </div>
          </div>

          <div style={styles.inputGroup}>
            <div style={styles.inputWrapper}>
              <FaUser style={styles.icon} />
              <input 
                type="text" 
                placeholder="Full Name" 
                style={styles.input} 
                required 
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <div style={styles.inputWrapper}>
              <FaEnvelope style={styles.icon} />
              <input 
                type="email" 
                placeholder="Email Address" 
                style={styles.input} 
                required 
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <div style={styles.inputWrapper}>
              <FaLock style={styles.icon} />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Create Password" 
                style={styles.input} 
                required 
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              <div style={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            {formData.password.length > 0 && formData.password.length < 6 && (
                <span style={styles.passHint}>Password should be 6+ characters</span>
            )}
          </div>

          <button type="submit" style={styles.signupBtn} className="btn-hover">
            Create Account
          </button>
        </form>

        <p style={styles.footerText}>
          Already part of the family? <Link to="/login" style={styles.loginLink}>Login here</Link>
        </p>
      </div>

      <style>{`
        .fade-in-scale { animation: fadeInScale 0.4s ease-out; }
        @keyframes fadeInScale { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .btn-hover:hover { background: #0056b3 !important; transform: translateY(-2px); box-shadow: 0 12px 24px rgba(0,123,255,0.3) !important; }
        input:focus { border-color: #007bff !important; box-shadow: 0 0 0 4px rgba(0,123,255,0.1); }
      `}</style>
    </div>
  );
};

const styles = {
  background: { height: '100vh', width: '100%', backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1600")', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' },
  signupCard: { background: 'rgba(255, 255, 255, 0.98)', padding: '45px', borderRadius: '32px', boxShadow: '0 25px 60px rgba(0,0,0,0.4)', width: '100%', maxWidth: '440px', position: 'relative', backdropFilter: 'blur(15px)' },
  closeBtn: { position: 'absolute', top: '25px', right: '25px', width: '35px', height: '35px', borderRadius: '50%', background: '#f8fafc', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', cursor: 'pointer', transition: '0.3s' },
  header: { textAlign: 'center', marginBottom: '30px' },
  title: { fontSize: '28px', fontWeight: '900', color: '#0f172a', margin: 0 },
  subtitle: { fontSize: '14px', color: '#64748b', marginTop: '8px' },
  
  socialGroup: { display: 'flex', gap: '15px', marginBottom: '25px' },
  socialBtn: { flex: 1, padding: '12px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '14px', fontWeight: '700', color: '#475569', cursor: 'pointer', transition: '0.2s' },
  
  divider: { position: 'relative', textAlign: 'center', marginBottom: '25px', borderBottom: '1px solid #f1f5f9' },
  dividerText: { position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', background: '#fff', padding: '0 15px', fontSize: '10px', fontWeight: '800', color: '#cbd5e1', letterSpacing: '1px' },

  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  roleToggle: { display: 'flex', background: '#f1f5f9', padding: '5px', borderRadius: '15px', marginBottom: '5px' },
  roleItem: { flex: 1, padding: '10px', textAlign: 'center', fontSize: '13px', fontWeight: '700', color: '#94a3b8', cursor: 'pointer', transition: '0.3s' },
  roleActive: { flex: 1, padding: '10px', textAlign: 'center', fontSize: '13px', fontWeight: '800', color: '#007bff', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' },

  inputWrapper: { position: 'relative', display: 'flex', alignItems: 'center' },
  icon: { position: 'absolute', left: '18px', color: '#94a3b8', fontSize: '16px' },
  input: { width: '100%', padding: '15px 15px 15px 50px', borderRadius: '16px', border: '2px solid #f1f5f9', fontSize: '15px', outline: 'none', transition: '0.2s', background: '#fdfdfd' },
  eyeIcon: { position: 'absolute', right: '18px', color: '#94a3b8', cursor: 'pointer' },
  passHint: { fontSize: '11px', color: '#ef4444', marginLeft: '10px', marginTop: '4px', fontWeight: '600' },

  signupBtn: { padding: '18px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '18px', fontWeight: '800', fontSize: '16px', cursor: 'pointer', transition: '0.3s' },
  footerText: { textAlign: 'center', marginTop: '25px', fontSize: '14px', color: '#64748b' },
  loginLink: { color: '#007bff', textDecoration: 'none', fontWeight: '800' }
};

export default Signup;