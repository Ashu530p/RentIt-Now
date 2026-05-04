import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaLock, FaShieldAlt, FaTimes, FaCreditCard } from 'react-icons/fa';

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Error handling agar state missing ho
  if (!state) {
    return (
      <div style={styles.errorContainer}>
        <h2>Order data missing! ⚠️</h2>
        <button onClick={() => navigate('/')} style={styles.backBtn}>Back to Home</button>
      </div>
    );
  }

  const finalAmount = state.summary?.total || state.finalAmount;
  const productName = state.product?.name || "Rental Item";

  // --- 💳 RAZORPAY INTEGRATION ---
  const handlePayment = async () => {
    if (!window.Razorpay) {
      alert("Razorpay SDK not found. Please check index.html script tag.");
      return;
    }

    setLoading(true);

    try {
      // 1. Backend se Order ID mangwayein
      const res = await axios.post('https://rentease-premium-furniture-appliances-at-4idp.onrender.com/api/create-order', {
        amount: finalAmount
      });

      const orderData = res.data;

      // 2. Razorpay Modal Options
      const options = {
        key: "rzp_test_SkynQQhj3gRoHa", // ✅ Your Test Key
        amount: orderData.amount,
        currency: "INR",
        name: "RentEase India",
        description: `Booking for ${productName}`,
        order_id: orderData.id,
        // Modal ke andar wala logo (CDN link)
        image: "https://cdn.razorpay.com/static/assets/logo/payment_method/razorpay.png",
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
              { id: response.razorpay_payment_id, name: productName, price: finalAmount, date: new Date().toLocaleDateString(), status: 'Successful' },
              ...history
            ]));

            navigate('/success', { state: { ...paymentDetails, id: response.razorpay_payment_id, price: finalAmount, name: productName } });
          } catch (dbError) {
            console.error("Database save failed:", dbError);
            navigate('/success', { state: { ...paymentDetails, price: finalAmount } });
          }
        },
        prefill: {
          name: state.shipping?.fullName || "Customer",
          contact: state.shipping?.phone || "9999999999",
        },
        theme: { color: "#1e293b" },
        modal: { ondismiss: function () { setLoading(false); } }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error("Payment Error:", err);
      alert("Error: Kya Backend server (5000) chal raha hai?");
      setLoading(false);
    }
  };

  return (
    <div style={styles.background}>
      <div style={styles.payCard}>
        <button style={styles.closeBtn} onClick={() => navigate(-1)}><FaTimes /></button>
        
        <div style={styles.header}>
            {/* Image ki jagah Styled Text taaki break na ho */}
            <div style={styles.logoText}>
               <span style={{color: '#3399cc'}}>Razor</span>pay
            </div>
            <div style={styles.badge}><FaLock /> SECURE CHECKOUT</div>
        </div>

        <div style={styles.infoBox}>
            <p style={{margin:0, color:'#64748b', fontSize:'13px'}}>Total Amount Payable</p>
            <h2 style={{fontSize:'32px', margin:'10px 0', color: '#1e293b'}}>₹{finalAmount}</h2>
            <div style={styles.itemTag}>
              <FaCreditCard size={12} /> {productName}
            </div>
        </div>

        <button 
          onClick={handlePayment} 
          style={{...styles.payBtn, background: loading ? '#94a3b8' : '#1e293b'}}
          disabled={loading}
        >
          {loading ? "Processing..." : `Confirm & Pay ₹${finalAmount}`}
        </button>

        <div style={styles.footer}>
            <FaShieldAlt color="#10b981" />
            <span>Secure 256-bit SSL Encryption • PCI-DSS</span>
        </div>
      </div>
    </div>
  );
};

const styles = {
  background: { height: '100vh', background: '#f1f5f9', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', fontFamily: 'sans-serif' },
  payCard: { background: '#fff', padding: '40px', borderRadius: '28px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)', width: '100%', maxWidth: '420px', textAlign: 'center', position:'relative' },
  closeBtn: { position: 'absolute', top: '25px', right: '25px', background: 'none', border: 'none', cursor: 'pointer', color:'#94a3b8', fontSize: '18px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '35px', borderBottom: '1px solid #f1f5f9', paddingBottom: '20px' },
  logoText: { fontSize: '20px', fontWeight: '800', color: '#1e293b', letterSpacing: '-0.5px' },
  badge: { fontSize: '11px', color: '#10b981', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px', textTransform: 'uppercase' },
  infoBox: { marginBottom: '35px', padding: '25px', background: '#f8fafc', borderRadius: '20px', border: '1px solid #f1f5f9' },
  itemTag: { display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#fff', padding: '6px 15px', borderRadius: '10px', fontSize: '12px', color: '#64748b', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' },
  payBtn: { width: '100%', padding: '18px', color: '#fff', border: 'none', borderRadius: '16px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s' },
  footer: { marginTop: '25px', fontSize: '10px', color: '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: '600' },
  errorContainer: { textAlign: 'center', padding: '100px' },
  backBtn: { padding: '12px 25px', background: '#1e293b', color: '#fff', borderRadius: '10px', border: 'none', cursor: 'pointer' }
};

export default Payment;