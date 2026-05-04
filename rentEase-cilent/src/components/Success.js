import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaBoxOpen, FaArrowRight, FaShoppingBag } from 'react-icons/fa';
import confetti from 'canvas-confetti'; // Optional: confetti install karein 'npm install canvas-confetti'

const Success = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // 🎉 Confetti effect jab page load ho
  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#007bff', '#10b981', '#ff00d4']
    });
    window.scrollTo(0, 0);
  }, []);

  if (!state) {
    return (
      <div style={styles.errorContainer}>
        <h2>No Order Details Found!</h2>
        <button onClick={() => navigate('/')} style={styles.shopBtn}>Back to Home</button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.successCard}>
        
        {/* Animated Check Icon */}
        <div style={styles.iconContainer}>
          <FaCheckCircle size={80} color="#10b981" />
        </div>

        <h1 style={styles.title}>Booking Confirmed!</h1>
        <p style={styles.subtitle}>
          Thank you for choosing <strong>RentEase</strong>. Your rental request for <strong>{state.name}</strong> has been successfully received.
        </p>

        {/* Order Details Table */}
        <div style={styles.detailsBox}>
          <div style={styles.detailRow}>
            <span style={styles.label}>Order ID:</span>
            <span style={styles.value}>#{state.id}</span>
          </div>
          <div style={styles.detailRow}>
            <span style={styles.label}>Amount Paid:</span>
            <span style={{...styles.value, color: '#10b981', fontSize: '20px'}}>₹{state.price}</span>
          </div>
          <div style={styles.detailRow}>
            <span style={styles.label}>Expected Delivery:</span>
            <span style={styles.value}>Within 48 Hours</span>
          </div>
        </div>

        {/* Info Box */}
        <div style={styles.infoNote}>
          <FaBoxOpen size={20} style={{marginRight: '10px'}}/>
          <span>Our team will contact you shortly to coordinate the setup at your address.</span>
        </div>

        {/* Action Buttons */}
        <div style={styles.btnGroup}>
          <button 
            onClick={() => navigate('/order-history')} 
            style={styles.primaryBtn}
          >
            View My Rentals <FaArrowRight style={{marginLeft: '10px'}}/>
          </button>
          <button 
            onClick={() => navigate('/')} 
            style={styles.secondaryBtn}
          >
            <FaShoppingBag style={{marginRight: '10px'}}/> Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f8fafc',
    padding: '20px',
    fontFamily: '"Segoe UI", Roboto, sans-serif'
  },
  successCard: {
    background: '#fff',
    maxWidth: '550px',
    width: '100%',
    padding: '50px 40px',
    borderRadius: '30px',
    boxShadow: '0 20px 50px rgba(0,0,0,0.05)',
    textAlign: 'center',
    border: '1px solid #f1f5f9'
  },
  iconContainer: {
    marginBottom: '25px',
    animation: 'scaleIn 0.5s ease-out'
  },
  title: {
    fontSize: '32px',
    fontWeight: '900',
    color: '#1e293b',
    margin: '0 0 10px 0'
  },
  subtitle: {
    fontSize: '15px',
    color: '#64748b',
    lineHeight: '1.6',
    marginBottom: '35px'
  },
  detailsBox: {
    background: '#fcfcfc',
    border: '1px solid #f1f5f9',
    borderRadius: '20px',
    padding: '25px',
    marginBottom: '30px'
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 0',
    borderBottom: '1px dashed #e2e8f0'
  },
  label: {
    color: '#94a3b8',
    fontWeight: '600',
    fontSize: '14px'
  },
  value: {
    color: '#1e293b',
    fontWeight: '800',
    fontSize: '16px'
  },
  infoNote: {
    display: 'flex',
    alignItems: 'center',
    background: '#f0f9ff',
    color: '#0369a1',
    padding: '15px 20px',
    borderRadius: '12px',
    fontSize: '13px',
    textAlign: 'left',
    marginBottom: '35px',
    lineHeight: '1.4'
  },
  btnGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  primaryBtn: {
    background: '#1e293b',
    color: '#fff',
    border: 'none',
    padding: '18px',
    borderRadius: '16px',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: '0.3s'
  },
  secondaryBtn: {
    background: 'none',
    color: '#64748b',
    border: '1px solid #e2e8f0',
    padding: '15px',
    borderRadius: '16px',
    fontWeight: '600',
    fontSize: '14px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: '0.3s'
  },
  errorContainer: { textAlign: 'center', padding: '100px' },
  shopBtn: { padding: '12px 25px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer' }
};

export default Success;