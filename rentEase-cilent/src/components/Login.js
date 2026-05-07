import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'; // Axios zaroori hai
import { FaTimes, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';

const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Backend API Call
      const res = await axios.post('https://rentease-premium-furniture-appliances-at-aynp.onrender.com/api/auth/login', { 
        email, 
        password 
      });

      if (res.data.success) {
        // 2. localStorage mein user data save karein (role ke saath)
        localStorage.setItem('user', JSON.stringify(res.data));

        // 3. Global State update karein (App.js wala state)
        onLoginSuccess({ 
          name: res.data.name, 
          email: res.data.email,
          role: res.data.role, // Backend se 'admin' ya 'user' aayega
          avatar: res.data.name.charAt(0) 
        });

        setLoading(false);

        // 4. Role-based Redirect 🚀
        if (res.data.role === 'admin') {
          navigate('/admin'); // Admin dashboard path
        } else {
          navigate('/'); // User home path
        }
      }
    } catch (err) {
      setLoading(false);
      // Backend se jo error message aa raha hai wo dikhayein
      alert(err.response?.data?.message || "Login Failed! Please check your credentials.");
    }
  };

  return (
    <div style={styles.background}>
      <div style={styles.loginCard} className="fade-in-up">
        
        <button style={styles.closeBtn} onClick={() => navigate('/')} title="Back to Home">
          <FaTimes />
        </button>

        <div style={styles.header}>
          <h2 style={styles.title}>Welcome Back!</h2>
          <p style={styles.subtitle}>Login to manage your rentals and payments.</p>
        </div>

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
                value={email}
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
                value={password}
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

// ... styles object (wahi purana wala use karein) ...

export default Login;