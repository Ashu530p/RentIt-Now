import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaBoxOpen, FaArrowRight, FaShoppingBag, FaHeadset, FaFileAlt } from 'react-icons/fa';
import confetti from 'canvas-confetti';

const Success = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // 🎉 Premium Confetti Burst
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#007bff', '#10b981']
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#00d4ff', '#1e293b']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());

    window.scrollTo(0, 0);
  }, []);

  if (!state) {
    return (
      <div style={styles.errorContainer}>
        <div style={styles.errorCard}>
           <h2>Something went wrong!</h2>
           <p>We couldn't retrieve your order details.</p>
           <button onClick={() => navigate('/')} style={styles.shopBtn}>Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.successCard} className="fade-in-up">
        
        <div style={styles.iconContainer}>
          <FaCheckCircle size={70} color="#10b981" />
        </div>

        <h1 style={styles.title}>Great Choice, {state.fullName?.split(' ')[0]}!</h1>
        <p style={styles.subtitle}>Your rental for <strong>{state.productName}</strong> is confirmed. You've just upgraded your lifestyle!</p>

        {/* 🕒 VISUAL TRACKER (Better than RentoMojo) */}
        <div style={styles.timelineContainer}>
            <div style={styles.timeStep}>
                <div style={styles.stepCircleActive}><FaCheckCircle /></div>
                <span style={styles.stepLabelActive}>Booked</span>
            </div>
            <div style={styles.stepLine}></div>
            <div style={styles.timeStep}>
                <div style={styles.stepCircle}><FaFileAlt /></div>
                <span style={styles.stepLabel}>KYC</span>
            </div>
            <div style={styles.stepLine}></div>
            <div style={styles.timeStep}>
                <div style={styles.stepCircle}><FaTruckLoadingIcon /></div>
                <span style={styles.stepLabel}>Delivery</span>
            </div>
        </div>

        {/* Order Info Card */}
        <div style={styles.detailsBox}>
          <div style={styles.detailRow}>
            <span>Order Reference</span>
            <strong>#{state.razorpay_payment_id?.slice(-8).toUpperCase()}</strong>
          </div>
          <div style={styles.detailRow}>
            <span>Amount Paid</span>
            <strong style={{color:'#10b981'}}>₹{state.finalAmount}</strong>
          </div>
          <div style={styles.detailRow}>
             <span>Delivery To</span>
             <strong style={styles.addressText}>{state.address?.slice(0, 30)}...</strong>
          </div>
        </div>

        <div style={styles.infoNote}>
          <FaBoxOpen size={24} style={{marginRight: '15px'}}/>
          <div>
            <h4 style={{margin:0, fontSize:'14px'}}>Next Step: Document Verification</h4>
            <p style={{margin:0, opacity:0.8}}>Keep your ID proof ready. Our team will call you within 24 hours.</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={styles.btnGroup}>
          <button onClick={() => navigate('/order-history')} style={styles.primaryBtn} className="hover-scale">
            Track My Order <FaArrowRight style={{marginLeft: '10px'}}/>
          </button>
          
          <div style={styles.secondaryActions}>
            <button onClick={() => navigate('/')} style={styles.textBtn}>
              <FaShoppingBag /> Continue Shopping
            </button>
            <button onClick={() => navigate('/support')} style={styles.textBtn}>
              <FaHeadset /> Need Help?
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .fade-in-up { animation: fadeInUp 0.6s ease-out; }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hover-scale:hover { transform: scale(1.02); background: #000 !important; }
      `}</style>
    </div>
  );
};

// Placeholder icon for delivery
const FaTruckLoadingIcon = () => <i className="fa fa-truck" style={{fontSize:'14px'}}></i>;

const styles = {
  container: { minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f4f7fa', padding: '20px' },
  successCard: { background: '#fff', maxWidth: '500px', width: '100%', padding: '40px', borderRadius: '32px', boxShadow: '0 30px 60px rgba(0,0,0,0.08)', textAlign: 'center' },
  iconContainer: { marginBottom: '20px' },
  title: { fontSize: '28px', fontWeight: '800', color: '#1e293b', margin: '0 0 10px' },
  subtitle: { fontSize: '15px', color: '#64748b', lineHeight: '1.5', marginBottom: '30px' },
  
  // Timeline Styles
  timelineContainer: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px', padding: '0 10px' },
  timeStep: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', position:'relative' },
  stepCircleActive: { width: '35px', height: '35px', background: '#10b981', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' },
  stepCircle: { width: '35px', height: '35px', background: '#f1f5f9', color: '#94a3b8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' },
  stepLabelActive: { fontSize: '11px', fontWeight: '800', color: '#10b981', textTransform: 'uppercase' },
  stepLabel: { fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase' },
  stepLine: { flex: 1, height: '2px', background: '#f1f5f9', margin: '0 10px', marginTop: '-18px' },

  detailsBox: { background: '#f8fafc', borderRadius: '20px', padding: '20px', marginBottom: '30px', border: '1px solid #f1f5f9' },
  detailRow: { display: 'flex', justifyContent: 'space-between', padding: '10px 0', fontSize: '14px', borderBottom: '1px solid #edf2f7' },
  addressText: { maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },

  infoNote: { display: 'flex', alignItems: 'center', background: '#007bff', color: '#fff', padding: '20px', borderRadius: '16px', textAlign: 'left', marginBottom: '30px' },
  
  btnGroup: { display: 'flex', flexDirection: 'column', gap: '20px' },
  primaryBtn: { background: '#1e293b', color: '#fff', border: 'none', padding: '18px', borderRadius: '16px', fontWeight: '800', fontSize: '16px', cursor: 'pointer', transition: '0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  secondaryActions: { display: 'flex', justifyContent: 'space-between' },
  textBtn: { background: 'none', border: 'none', color: '#64748b', fontSize: '13px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' },

  errorContainer: { height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  errorCard: { textAlign: 'center', background: '#fff', padding: '40px', borderRadius: '24px' },
  shopBtn: { padding: '12px 25px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight:'bold' }
};

export default Success;