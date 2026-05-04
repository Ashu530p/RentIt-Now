import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTimes, FaTrashAlt, FaArrowLeft, FaShoppingCart } from 'react-icons/fa';

const Cart = ({ cartItems, removeFromCart }) => {
  const navigate = useNavigate();

  // Price Calculation
  const monthlyRent = cartItems.reduce((acc, item) => acc + (Number(item.price) || 0), 0);
  const securityDeposit = Math.round(monthlyRent * 0.5); // 50% Deposit logic
  const totalPayable = monthlyRent + securityDeposit;

  return (
    <div style={styles.background}>
      <div style={styles.cartCard}>
        
        {/* 🔙 BACK / CROSS BUTTON */}
        <button 
          style={styles.closeBtn} 
          onClick={() => navigate('/')} 
          title="Back to Home"
        >
          <FaTimes />
        </button>

        <div style={styles.header}>
          <h2 style={styles.title}>Your Rental Cart <FaShoppingCart size={22} color="#007bff"/></h2>
          <p style={styles.subtitle}>Review your items before scheduling delivery.</p>
        </div>

        <div style={styles.contentLayout}>
          {/* Left Side: Items List */}
          <div style={styles.itemsSection}>
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div key={index} style={styles.itemRow}>
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    style={styles.itemImg} 
                    onError={(e) => e.target.src = 'https://via.placeholder.com/100?text=RentEase'}
                  />
                  <div style={styles.itemDetails}>
                    <h4 style={styles.itemName}>{item.name}</h4>
                    <p style={styles.itemPrice}>Rent: <strong>₹{item.price}/mo</strong></p>
                    <button 
                      onClick={() => removeFromCart(item)} 
                      style={styles.removeBtn}
                    >
                      <FaTrashAlt /> Remove Item
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div style={styles.emptyState}>
                <p>Aapka cart khali hai. Kuch premium furniture rent karein! 😊</p>
                <button onClick={() => navigate('/')} style={styles.shopBtn}>Explore Products</button>
              </div>
            )}
          </div>

          {/* Right Side: Summary Card */}
          {cartItems.length > 0 && (
            <div style={styles.summaryCard}>
              <h3 style={styles.summaryTitle}>Price Summary</h3>
              <div style={styles.summaryRow}>
                <span>Monthly Rent</span>
                <span>₹{monthlyRent}</span>
              </div>
              <div style={styles.summaryRow}>
                <span>Security Deposit (Refundable)</span>
                <span>₹{securityDeposit}</span>
              </div>
              <hr style={styles.hr}/>
              <div style={styles.totalRow}>
                <span>Total Payable</span>
                <span>₹{totalPayable}</span>
              </div>
              
              <button 
                style={styles.checkoutBtn} 
                onClick={() => navigate('/checkout', { state: { totalAmount: monthlyRent } })}
              >
                Confirm Delivery Details
              </button>
              <p style={styles.note}>*Next step mein dates aur address select karein</p>
            </div>
          )}
        </div>

        {/* Back to Home Link */}
        <div style={styles.footerNav} onClick={() => navigate('/')}>
          <FaArrowLeft size={12}/> Continue Renting
        </div>
      </div>
    </div>
  );
};

const styles = {
  background: { 
    minHeight: '100vh', 
    width: '100%', 
    // 🏠 RENT THEME BACKGROUND
    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1600")', 
    backgroundSize: 'cover', 
    backgroundPosition: 'center', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    padding: '40px 20px'
  },
  cartCard: { 
    background: 'rgba(255, 255, 255, 0.98)', 
    padding: '40px', 
    borderRadius: '28px', 
    boxShadow: '0 25px 50px rgba(0,0,0,0.3)', 
    width: '100%', 
    maxWidth: '1000px', 
    position: 'relative',
    backdropFilter: 'blur(10px)'
  },
  closeBtn: { 
    position: 'absolute', 
    top: '25px', 
    right: '25px', 
    width: '40px', 
    height: '40px', 
    borderRadius: '50%', 
    background: '#f1f5f9', 
    border: 'none', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    fontSize: '20px', 
    color: '#64748b', 
    cursor: 'pointer', 
    transition: '0.3s hover' 
  },
  header: { marginBottom: '30px', borderBottom: '1px solid #f1f5f9', paddingBottom: '15px' },
  title: { fontSize: '28px', fontWeight: '900', color: '#1e293b', margin: '0', display: 'flex', alignItems: 'center', gap: '12px' },
  subtitle: { fontSize: '14px', color: '#64748b', marginTop: '5px' },
  contentLayout: { display: 'flex', gap: '30px', flexWrap: 'wrap' },
  itemsSection: { flex: '1.5', minWidth: '300px' },
  itemRow: { 
    display: 'flex', 
    gap: '20px', 
    background: '#fff', 
    padding: '20px', 
    borderRadius: '20px', 
    marginBottom: '15px', 
    border: '1px solid #f1f5f9',
    boxShadow: '0 4px 6px rgba(0,0,0,0.02)'
  },
  itemImg: { width: '100px', height: '100px', borderRadius: '15px', objectFit: 'cover' },
  itemDetails: { flex: 1 },
  itemName: { margin: '0 0 5px', fontSize: '18px', color: '#1e293b' },
  itemPrice: { fontSize: '14px', color: '#64748b', margin: '0 0 15px' },
  removeBtn: { background: 'none', border: 'none', color: '#ef4444', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' },
  summaryCard: { 
    flex: '1', 
    background: '#f8fafc', 
    padding: '30px', 
    borderRadius: '24px', 
    height: 'fit-content',
    border: '1px solid #e2e8f0'
  },
  summaryTitle: { fontSize: '20px', fontWeight: '800', marginBottom: '20px', color: '#1e293b' },
  summaryRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px', color: '#475569' },
  totalRow: { display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: '900', color: '#1e293b', marginTop: '10px' },
  hr: { border: 'none', borderTop: '1px solid #cbd5e1', margin: '15px 0' },
  checkoutBtn: { width: '100%', padding: '16px', background: '#22c55e', color: '#fff', border: 'none', borderRadius: '14px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px', marginTop: '20px', boxShadow: '0 10px 15px rgba(34,197,94,0.2)' },
  note: { textAlign: 'center', fontSize: '11px', color: '#94a3b8', marginTop: '10px' },
  footerNav: { marginTop: '25px', color: '#007bff', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' },
  emptyState: { textAlign: 'center', padding: '50px 0' },
  shopBtn: { padding: '12px 25px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', marginTop: '15px' }
};

export default Cart;