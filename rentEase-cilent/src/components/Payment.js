import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaLock, FaShieldAlt, FaTimes, FaCreditCard, FaCheckCircle, FaInfoCircle } from 'react-icons/fa';

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Agar direct access kiya jaye bina data ke
    if (!state) {
      setTimeout(() => navigate('/'), 3000);
    }
  }, [state, navigate]);

  if (!state) {
    return (
      <div style={styles.errorContainer}>
        <div style={styles.errorCard}>
          <FaInfoCircle size={50} color="#f59e0b" />
          <h2>Session Expired</h2>
          <p>Order details not found. Redirecting to home...</p>
          <button onClick={() => navigate('/')} style={styles.backBtn}>Go Home Now</button>
        </div>
      </div>
    );
  }

  const finalAmount = state.summary?.total || state.finalAmount;
  const productName = state.product?.name || "Rental Item";
  const deposit = state.summary?.deposit || 0;

  // --- 💳 RAZORPAY INTEGRATION LOGIC ---
  const handlePayment = async () => {
    if (!window.Razorpay) {
      alert("Payment Gateway loading... Please wait a moment.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post('https://rentease-premium-furniture-appliances-at-4idp.onrender.com/api/create-order', {
        amount: finalAmount
      });

      const orderData = res.data;

      const options = {
        key: "rzp_test_SkynQQhj3gRoHa", 
        amount: orderData.amount,
        currency: "INR",
        name: "RentEase",
        description: `Rental Booking: ${productName}`,
        order_id: orderData.id,
        image: "https://cdn-icons-png.flaticon.com/512/11520/11520448.png", // Custom Brand Icon
        handler: async function (response) {
          const paymentDetails = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            productName: productName,
            fullName: state.shipping?.fullName,
            phone: state.shipping?.phone,
            address: state.shipping?.address,
            startDate: state.shipping?.startDate,
            endDate: state.shipping?.endDate,
            finalAmount: finalAmount,
            paymentStatus: 'Successful'
          };

          try {
            await axios.post('https://rentease-premium-furniture-appliances-at-4idp.onrender.com/api/bookings', paymentDetails);
            const history = JSON.parse(localStorage.getItem('myOrders')) || [];
            localStorage.setItem('myOrders', JSON.stringify([
              { 
                id: response.razorpay_payment_id, 
                name: productName, 
                price: finalAmount, 
                date: new Date().toLocaleDateString(), 
                status: 'Successful',
                img: state.product?.image
              },
              ...history
            ]));

            navigate('/success', { state: paymentDetails });
          } catch (dbError) {
            navigate('/success', { state: paymentDetails });
          }
        },
        prefill: {
          name: state.shipping?.fullName || "",
          contact: state.shipping?.phone || "",
        },
        theme: { color: "#007bff" },
        modal: { ondismiss: function () { setLoading(false); } }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      setLoading(false);
      alert("Payment initiation failed. Please try again.");
    }
  };

  return (
    <div style={styles.background}>
      <div style={styles.payCard}>
        {/* Step Indicator */}
        <div style={styles.steps}>
            <span style={styles.stepDone}><FaCheckCircle /> Delivery</span>
            <div style={styles.lineActive}></div>
            <span style={styles.stepActive}>Payment</span>
        </div>

        <button style={styles.closeBtn} onClick={() => navigate(-1)}><FaTimes /></button>
        
        <div style={styles.header}>
            <div style={styles.brandTitle}>Rent<span style={{color:'#007bff'}}>Ease</span> Secure</div>
            <div style={styles.badge}><FaLock /> Encrypted</div>
        </div>

        <div style={styles.summaryCard}>
            <p style={styles.summaryLabel}>Final Amount to Pay</p>
            <h1 style={styles.amountText}>₹{finalAmount.toLocaleString('en-IN')}</h1>
            
            <div style={styles.divider}></div>
            
            <div style={styles.detailRow}>
                <span>{productName}</span>
                <span>₹{finalAmount - deposit}</span>
            </div>
            <div style={styles.detailRow}>
                <span>Refundable Deposit</span>
                <span>₹{deposit}</span>
            </div>
        </div>

        <button 
          onClick={handlePayment} 
          style={{...styles.payBtn, opacity: loading ? 0.7 : 1}}
          disabled={loading}
          className="pay-now-btn"
        >
          {loading ? (
            <><i className="fa fa-spinner fa-spin"></i> Processing...</>
          ) : (
            `Pay Securely ₹${finalAmount}`
          )}
        </button>

        <div style={styles.footer}>
            <div style={styles.trustIcons}>
                <FaShieldAlt size={14} color="#10b981" /> 
                <span>PCI-DSS Compliant • 256-bit SSL</span>
            </div>
            <img 
                src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" 
                alt="Razorpay" 
                style={styles.razorpayLogo} 
            />
        </div>
      </div>

      <style>{`
        .pay-now-btn:hover { background: #0056b3 !important; transform: translateY(-2px); }
        .pay-now-btn:active { transform: translateY(0); }
      `}</style>
    </div>
  );
};

const styles = {
  background: { height: '100vh', background: '#f4f7fa', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' },
  payCard: { background: '#fff', padding: '40px', borderRadius: '32px', boxShadow: '0 20px 60px rgba(0,0,0,0.08)', width: '100%', maxWidth: '440px', position:'relative' },
  
  steps: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '30px' },
  stepDone: { fontSize: '12px', color: '#10b981', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' },
  stepActive: { fontSize: '12px', color: '#007bff', fontWeight: 'bold' },
  lineActive: { width: '40px', height: '2px', background: '#10b981' },

  closeBtn: { position: 'absolute', top: '30px', right: '30px', background: 'none', border: 'none', cursor: 'pointer', color:'#cbd5e1', fontSize: '20px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' },
  brandTitle: { fontSize: '18px', fontWeight: '800', color: '#1e293b' },
  badge: { fontSize: '10px', color: '#10b981', background: '#ecfdf5', padding: '4px 10px', borderRadius: '20px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' },
  
  summaryCard: { background: '#f8fafc', padding: '25px', borderRadius: '24px', border: '1px solid #f1f5f9', marginBottom: '30px' },
  summaryLabel: { margin: 0, color: '#64748b', fontSize: '13px', fontWeight: '600', textAlign: 'center' },
  amountText: { fontSize: '36px', margin: '10px 0 20px', color: '#0f172a', textAlign: 'center', fontWeight: '900' },
  divider: { height: '1px', background: '#e2e8f0', margin: '0 0 15px' },
  detailRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '13px', color: '#475569', fontWeight: '500' },
  
  payBtn: { width: '100%', padding: '20px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '18px', fontSize: '16px', fontWeight: '800', cursor: 'pointer', transition: '0.3s', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' },
  
  footer: { marginTop: '30px', textAlign: 'center' },
  trustIcons: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '11px', color: '#94a3b8', fontWeight: '600', marginBottom: '15px' },
  razorpayLogo: { height: '20px', opacity: 0.6 },
  
  errorContainer: { height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  errorCard: { textAlign: 'center', background: '#fff', padding: '50px', borderRadius: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' },
  backBtn: { marginTop: '20px', padding: '12px 30px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }
};

export default Payment;