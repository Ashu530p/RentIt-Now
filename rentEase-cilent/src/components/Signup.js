import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaTimes, FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaKey } from 'react-icons/fa';

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('customer');
  const [step, setStep] = useState(1); // 1: Details, 2: OTP
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  // --- Step 1: Send OTP ---
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('https://rentease-premium-furniture-appliances-at-aynp.onrender.com/api/auth/send-otp', { 
        email: formData.email 
      });
      if (res.data.success) {
        setStep(2);
        alert("Verification code sent to your email! 📧");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // --- Step 2: Verify & Create Account ---
  const handleFinalSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('https://rentease-premium-furniture-appliances-at-aynp.onrender.com/api/auth/signup', {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: role,
        otp: otp
      });

      if (res.data.success) {
        alert(`Welcome to RentEase, ${formData.fullName.split(' ')[0]}! 🎉`);
        navigate('/login');
      }
    } catch (err) {
      alert(err.response?.data?.message || "Invalid OTP or Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.background}>
      <div style={styles.signupCard} className="fade-in-scale">
        <button style={styles.closeBtn} onClick={() => navigate('/')}><FaTimes /></button>

        <div style={styles.header}>
          <h2 style={styles.title}>{step === 1 ? "Join RentEase ✨" : "Verify Email 📧"}</h2>
          <p style={styles.subtitle}>
            {step === 1 ? "Rent the lifestyle you deserve, today." : `Code sent to ${formData.email}`}
          </p>
        </div>

        <form onSubmit={step === 1 ? handleSendOTP : handleFinalSignup} style={styles.form}>
          {step === 1 ? (
            <>
              <div style={styles.roleToggle}>
                <div style={role === 'customer' ? styles.roleActive : styles.roleItem} onClick={() => setRole('customer')}>Customer</div>
                <div style={role === 'admin' ? styles.roleActive : styles.roleItem} onClick={() => setRole('admin')}>Admin</div>
              </div>

              <div style={styles.inputWrapper}>
                <FaUser style={styles.icon} />
                <input type="text" placeholder="Full Name" style={styles.input} required onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
              </div>

              <div style={styles.inputWrapper}>
                <FaEnvelope style={styles.icon} />
                <input type="email" placeholder="Email Address" style={styles.input} required onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>

              <div style={styles.inputWrapper}>
                <FaLock style={styles.icon} />
                <input type={showPassword ? "text" : "password"} placeholder="Create Password" style={styles.input} required onChange={(e) => setFormData({...formData, password: e.target.value})} />
                <div style={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </>
          ) : (
            <div style={styles.inputWrapper}>
              <FaKey style={styles.icon} />
              <input 
                type="text" 
                placeholder="Enter 6-Digit OTP" 
                style={{...styles.input, letterSpacing: '8px', textAlign: 'center', fontSize: '20px'}} 
                maxLength="6"
                required 
                onChange={(e) => setOtp(e.target.value)} 
              />
            </div>
          )}

          <button type="submit" style={styles.signupBtn} disabled={loading} className="btn-hover">
            {loading ? "Processing..." : (step === 1 ? "Send Verification Code" : "Verify & Create Account")}
          </button>
          
          {step === 2 && (
            <button type="button" onClick={() => setStep(1)} style={styles.backLink}>
              Change Email / Edit Details
            </button>
          )}
        </form>

        <p style={styles.footerText}>
          Already part of the family? <Link to="/login" style={styles.loginLink}>Login here</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  // ... (Baaki styles wahi hain jo aapne diye, bas ye naya add kiya hai)
  backLink: { background: 'none', border: 'none', color: '#64748b', fontSize: '12px', cursor: 'pointer', marginTop: '10px', textDecoration: 'underline' },
  background: { height: '100vh', width: '100%', backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1600")', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' },
  signupCard: { background: 'rgba(255, 255, 255, 0.98)', padding: '45px', borderRadius: '32px', boxShadow: '0 25px 60px rgba(0,0,0,0.4)', width: '100%', maxWidth: '440px', position: 'relative', backdropFilter: 'blur(15px)' },
  closeBtn: { position: 'absolute', top: '25px', right: '25px', width: '35px', height: '35px', borderRadius: '50%', background: '#f8fafc', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', cursor: 'pointer', transition: '0.3s' },
  header: { textAlign: 'center', marginBottom: '30px' },
  title: { fontSize: '28px', fontWeight: '900', color: '#0f172a', margin: 0 },
  subtitle: { fontSize: '14px', color: '#64748b', marginTop: '8px' },
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  roleToggle: { display: 'flex', background: '#f1f5f9', padding: '5px', borderRadius: '15px', marginBottom: '5px' },
  roleItem: { flex: 1, padding: '10px', textAlign: 'center', fontSize: '13px', fontWeight: '700', color: '#94a3b8', cursor: 'pointer', transition: '0.3s' },
  roleActive: { flex: 1, padding: '10px', textAlign: 'center', fontSize: '13px', fontWeight: '800', color: '#007bff', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' },
  inputWrapper: { position: 'relative', display: 'flex', alignItems: 'center' },
  icon: { position: 'absolute', left: '18px', color: '#94a3b8', fontSize: '16px' },
  input: { width: '100%', padding: '15px 15px 15px 50px', borderRadius: '16px', border: '2px solid #f1f5f9', fontSize: '15px', outline: 'none', transition: '0.2s', background: '#fdfdfd' },
  eyeIcon: { position: 'absolute', right: '18px', color: '#94a3b8', cursor: 'pointer' },
  signupBtn: { padding: '18px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '18px', fontWeight: '800', fontSize: '16px', cursor: 'pointer', transition: '0.3s' },
  footerText: { textAlign: 'center', marginTop: '25px', fontSize: '14px', color: '#64748b' },
  loginLink: { color: '#007bff', textDecoration: 'none', fontWeight: '800' }
};

export default Signup;