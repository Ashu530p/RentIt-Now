import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTimes, FaTrashAlt, FaArrowLeft, FaShoppingCart, FaShieldAlt, FaInfoCircle } from 'react-icons/fa';

const Cart = ({ cartItems, removeFromCart }) => {
  const navigate = useNavigate();

  // Sabhi items ka total rent (Jo selected price hai)
  const monthlyRent = cartItems.reduce((acc, item) => acc + (Number(item.price) || 0), 0);
  
  // Total Security Deposit calculation
  const totalSecurityDeposit = cartItems.reduce((acc, item) => {
    return acc + (Number(item.securityDeposit) || Math.round(item.price * 0.5));
  }, 0);

  const totalPayable = monthlyRent + totalSecurityDeposit;

  return (
    <div style={styles.background}>
      <div style={styles.cartCard} className="fade-in">
        
        {/* Close Button */}
        <button style={styles.closeBtn} onClick={() => navigate('/')} title="Back to Home">
          <FaTimes />
        </button>

        <div style={styles.header}>
          <div style={styles.headerTitleBox}>
             <h2 style={styles.title}>Review Your Cart</h2>
             <span style={styles.cartCount}>{cartItems.length} Items</span>
          </div>
          <p style={styles.subtitle}>Sahi choice hai! Premium rental experience bas ek step door hai.</p>
        </div>

        <div style={styles.contentLayout}>
          {/* Left Side: Items List */}
          <div style={styles.itemsSection}>
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div key={index} style={styles.itemRow} className="cart-item-hover">
                  <div style={styles.imgWrapper}>
                    <img src={item.image} alt={item.name} style={styles.itemImg} />
                  </div>
                  <div style={styles.itemDetails}>
                    <div style={styles.itemMainInfo}>
                        <div>
                            <h4 style={styles.itemName}>{item.name}</h4>
                            {/* Selected Tenure dikhayenge */}
                            <span style={styles.tenureBadge}>{item.selectedTenure || 3} Months Plan</span>
                        </div>
                        <span style={styles.categoryBadge}>{item.category}</span>
                    </div>
                    <div style={styles.itemPriceBox}>
                        <p style={styles.itemRent}>Rent: <strong>₹{item.price}</strong><small>/mo</small></p>
                        <p style={styles.itemDeposit}>Deposit: ₹{item.securityDeposit || Math.round(item.price * 0.5)}</p>
                    </div>
                    <button onClick={() => removeFromCart(item)} style={styles.removeBtn}>
                      <FaTrashAlt /> Remove Item
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div style={styles.emptyState}>
                <FaShoppingCart size={60} color="#cbd5e1" />
                <h3>Aapka cart khaali hai!</h3>
                <p>Ghar ko upgrade karne ke liye kuch items add karein.</p>
                <button onClick={() => navigate('/')} style={styles.shopBtn}>Browse Products</button>
              </div>
            )}
          </div>

          {/* Right Side: Price Summary */}
          {cartItems.length > 0 && (
            <div style={styles.summaryCard}>
              <h3 style={styles.summaryTitle}>Payment Summary</h3>
              
              <div style={styles.summaryRow}>
                <span>Monthly Rent (Total)</span>
                <span style={styles.boldText}>₹{monthlyRent}</span>
              </div>
              
              <div style={styles.summaryRow}>
                <span style={styles.infoSpan}>
                    Security Deposit <FaInfoCircle size={10} title="100% Refundable" />
                </span>
                <span style={styles.boldText}>₹{totalSecurityDeposit}</span>
              </div>

              <div style={styles.savingsBox}>
                <FaShieldAlt color="#10b981" />
                <span>Zero hidden charges. Full transparency.</span>
              </div>

              <div style={styles.totalRow}>
                <div style={styles.totalLabel}>
                    <span>Total Amount</span>
                    <small>To be paid now</small>
                </div>
                <span style={styles.totalPrice}>₹{totalPayable}</span>
              </div>
              
              <button 
                style={styles.checkoutBtn} 
                onClick={() => navigate('/checkout', { state: { cartItems, totalPayable } })}
                className="checkout-pulse"
              >
                Checkout & Schedule <FaArrowLeft style={{transform: 'rotate(180deg)', marginLeft: '10px'}}/>
              </button>
              
              <p style={styles.nextStepNote}>Safe & Secure Payment via Razorpay</p>
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
            <div style={styles.footerNav} onClick={() => navigate('/')}>
              <FaArrowLeft size={12}/> Continue Shopping
            </div>
        )}
      </div>

      <style>{`
        .fade-in { animation: fadeIn 0.4s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .cart-item-hover:hover { border-color: #e2e8f0 !important; box-shadow: 0 4px 12px rgba(0,0,0,0.03); }
        .checkout-pulse:hover { background: #15803d !important; transform: scale(1.02); }
      `}</style>
    </div>
  );
};

const styles = {
  background: { minHeight: '100vh', background: '#f1f5f9', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px 20px' },
  cartCard: { background: '#fff', padding: '40px', borderRadius: '24px', width: '100%', maxWidth: '1100px', position: 'relative', border: '1px solid #e2e8f0' },
  closeBtn: { position: 'absolute', top: '25px', right: '25px', background: '#f8fafc', border: 'none', width: '35px', height: '35px', borderRadius: '50%', cursor: 'pointer' },
  
  header: { marginBottom: '30px', borderBottom: '1px solid #f1f5f9', paddingBottom: '20px' },
  headerTitleBox: { display: 'flex', alignItems: 'center', gap: '15px' },
  title: { fontSize: '24px', fontWeight: '900', color: '#0f172a' },
  cartCount: { fontSize: '12px', fontWeight: '800', color: '#007bff', background: '#eff6ff', padding: '4px 10px', borderRadius: '50px' },
  subtitle: { color: '#64748b', fontSize: '14px' },

  contentLayout: { display: 'flex', gap: '30px', flexWrap: 'wrap' },
  itemsSection: { flex: '1.4', display: 'flex', flexDirection: 'column', gap: '15px' },
  itemRow: { display: 'flex', gap: '15px', padding: '15px', borderRadius: '16px', border: '1px solid #f1f5f9' },
  imgWrapper: { width: '100px', height: '100px', borderRadius: '12px', overflow: 'hidden' },
  itemImg: { width: '100%', height: '100%', objectFit: 'cover' },
  
  itemDetails: { flex: 1 },
  itemMainInfo: { display: 'flex', justifyContent: 'space-between' },
  itemName: { fontSize: '16px', fontWeight: '800', margin: 0 },
  tenureBadge: { fontSize: '11px', color: '#007bff', fontWeight: '700' },
  categoryBadge: { fontSize: '10px', color: '#94a3b8' },
  
  itemPriceBox: { display: 'flex', gap: '15px', margin: '8px 0' },
  itemRent: { fontSize: '14px' },
  itemDeposit: { fontSize: '12px', color: '#94a3b8' },
  removeBtn: { background: 'none', border: 'none', color: '#ef4444', fontSize: '11px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' },

  summaryCard: { flex: '1', background: '#f8fafc', padding: '25px', borderRadius: '20px', border: '1px solid #e2e8f0', height: 'fit-content' },
  summaryTitle: { fontSize: '18px', fontWeight: '800', marginBottom: '20px' },
  summaryRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px' },
  boldText: { fontWeight: '700' },
  
  savingsBox: { display: 'flex', alignItems: 'center', gap: '10px', background: '#f0fdf4', padding: '10px', borderRadius: '10px', color: '#166534', fontSize: '11px', margin: '15px 0' },
  
  totalRow: { display: 'flex', justifyContent: 'space-between', borderTop: '2px dashed #e2e8f0', paddingTop: '15px', marginTop: '15px' },
  totalPrice: { fontSize: '24px', fontWeight: '900' },
  
  checkoutBtn: { width: '100%', padding: '18px', background: '#22c55e', color: '#fff', border: 'none', borderRadius: '14px', fontWeight: '800', cursor: 'pointer', marginTop: '20px' },
  emptyState: { textAlign: 'center', padding: '40px' },
  shopBtn: { padding: '12px 25px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '700', marginTop: '15px', cursor: 'pointer' }
};

export default Cart;