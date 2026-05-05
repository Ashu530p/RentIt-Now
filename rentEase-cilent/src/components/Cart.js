import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTimes, FaTrashAlt, FaArrowLeft, FaShoppingCart, FaShieldAlt, FaInfoCircle } from 'react-icons/fa';

const Cart = ({ cartItems, removeFromCart }) => {
  const navigate = useNavigate();

  // Price Calculation Logic
  const monthlyRent = cartItems.reduce((acc, item) => acc + (Number(item.price) || 0), 0);
  const securityDeposit = Math.round(monthlyRent * 0.5); // RentoMojo style 50% deposit
  const totalPayable = monthlyRent + securityDeposit;

  return (
    <div style={styles.background}>
      <div style={styles.cartCard} className="fade-in">
        
        {/* Close Button */}
        <button 
          style={styles.closeBtn} 
          onClick={() => navigate('/')} 
          title="Back to Home"
        >
          <FaTimes />
        </button>

        <div style={styles.header}>
          <div style={styles.headerTitleBox}>
             <h2 style={styles.title}>Review Your Cart</h2>
             <span style={styles.cartCount}>{cartItems.length} Items Selected</span>
          </div>
          <p style={styles.subtitle}>Rent premium furniture & appliances with zero hidden costs.</p>
        </div>

        <div style={styles.contentLayout}>
          {/* Left Side: Items List */}
          <div style={styles.itemsSection}>
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div key={index} style={styles.itemRow} className="cart-item-hover">
                  <div style={styles.imgWrapper}>
                    <img 
                        src={item.image} 
                        alt={item.name} 
                        style={styles.itemImg} 
                        onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=200'}
                    />
                  </div>
                  <div style={styles.itemDetails}>
                    <div style={styles.itemMainInfo}>
                        <h4 style={styles.itemName}>{item.name}</h4>
                        <span style={styles.categoryBadge}>{item.category || 'Rental'}</span>
                    </div>
                    <div style={styles.itemPriceBox}>
                        <p style={styles.itemRent}>Rent: <strong>₹{item.price}</strong><small>/mo</small></p>
                        <p style={styles.itemDeposit}>Deposit: ₹{Math.round(item.price * 0.5)}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item)} 
                      style={styles.removeBtn}
                    >
                      <FaTrashAlt /> Remove
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div style={styles.emptyState}>
                <FaShoppingCart size={60} color="#e2e8f0" />
                <h3>Your cart is lonely!</h3>
                <p>Add some premium furniture to upgrade your home lifestyle.</p>
                <button onClick={() => navigate('/')} style={styles.shopBtn}>Explore Catalog</button>
              </div>
            )}
          </div>

          {/* Right Side: Price Summary (Sticky Logic) */}
          {cartItems.length > 0 && (
            <div style={styles.summaryCard}>
              <h3 style={styles.summaryTitle}>Payment Summary</h3>
              
              <div style={styles.summaryRow}>
                <span>Monthly Rent Total</span>
                <span style={styles.boldText}>₹{monthlyRent}</span>
              </div>
              
              <div style={styles.summaryRow}>
                <span style={styles.infoSpan}>
                    Security Deposit <FaInfoCircle size={10} title="100% Refundable on return"/>
                </span>
                <span style={styles.boldText}>₹{securityDeposit}</span>
              </div>

              <div style={styles.savingsBox}>
                <FaShieldAlt color="#10b981" />
                <span>Refundable deposit protects your rental.</span>
              </div>

              <div style={styles.totalRow}>
                <div style={styles.totalLabel}>
                    <span>Total Amount</span>
                    <small>Payable now</small>
                </div>
                <span style={styles.totalPrice}>₹{totalPayable}</span>
              </div>
              
              <button 
                style={styles.checkoutBtn} 
                onClick={() => navigate('/checkout', { state: { cartItems, totalPayable } })}
                className="checkout-pulse"
              >
                Proceed to Schedule <FaArrowLeft style={{transform: 'rotate(180deg)', marginLeft: '10px'}}/>
              </button>
              
              <p style={styles.nextStepNote}>Next: Choose Delivery Date & Address</p>
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
            <div style={styles.footerNav} onClick={() => navigate('/')}>
              <FaArrowLeft size={12}/> Back to Store
            </div>
        )}
      </div>

      <style>{`
        .fade-in { animation: fadeIn 0.4s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .cart-item-hover:hover { border-color: #007bff !important; }
        .checkout-pulse:hover { background: #16a34a !important; transform: translateY(-2px); }
      `}</style>
    </div>
  );
};

const styles = {
  background: { minHeight: '100vh', background: '#f8fafc', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '60px 20px' },
  cartCard: { background: '#fff', padding: '40px', borderRadius: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', width: '100%', maxWidth: '1100px', position: 'relative' },
  closeBtn: { position: 'absolute', top: '30px', right: '30px', background: '#f1f5f9', border: 'none', width: '35px', height: '35px', borderRadius: '50%', cursor: 'pointer', color: '#64748b' },
  
  header: { marginBottom: '35px', paddingBottom: '20px', borderBottom: '1px solid #f1f5f9' },
  headerTitleBox: { display: 'flex', alignItems: 'baseline', gap: '15px' },
  title: { fontSize: '26px', fontWeight: '900', color: '#1e293b', margin: 0 },
  cartCount: { fontSize: '14px', fontWeight: '700', color: '#007bff', background: '#e0f2fe', padding: '4px 12px', borderRadius: '50px' },
  subtitle: { color: '#64748b', fontSize: '14px', marginTop: '5px' },

  contentLayout: { display: 'flex', gap: '40px', flexWrap: 'wrap' },
  itemsSection: { flex: '1.4', minWidth: '350px' },
  itemRow: { display: 'flex', gap: '20px', padding: '20px', borderRadius: '24px', background: '#fff', border: '2px solid #f8fafc', transition: '0.3s' },
  imgWrapper: { width: '110px', height: '110px', borderRadius: '18px', overflow: 'hidden' },
  itemImg: { width: '100%', height: '100%', objectFit: 'cover' },
  
  itemDetails: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' },
  itemMainInfo: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' },
  itemName: { fontSize: '18px', fontWeight: '800', color: '#1e293b', margin: 0 },
  categoryBadge: { fontSize: '10px', fontWeight: '800', color: '#64748b', background: '#f1f5f9', padding: '3px 8px', borderRadius: '4px' },
  
  itemPriceBox: { display: 'flex', gap: '15px', marginBottom: '12px' },
  itemRent: { fontSize: '15px', color: '#1e293b' },
  itemDeposit: { fontSize: '13px', color: '#94a3b8' },
  removeBtn: { background: 'none', border: 'none', color: '#ef4444', fontSize: '12px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', padding: 0 },

  summaryCard: { flex: '1', background: '#f8fafc', padding: '30px', borderRadius: '28px', border: '1px solid #f1f5f9', height: 'fit-content', position: 'sticky', top: '20px' },
  summaryTitle: { fontSize: '20px', fontWeight: '800', marginBottom: '25px' },
  summaryRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '14px', color: '#475569' },
  boldText: { fontWeight: '700', color: '#1e293b' },
  infoSpan: { display: 'flex', alignItems: 'center', gap: '6px' },
  
  savingsBox: { display: 'flex', alignItems: 'center', gap: '10px', background: '#ecfdf5', padding: '12px', borderRadius: '12px', color: '#065f46', fontSize: '12px', fontWeight: '600', margin: '20px 0' },
  
  totalRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', paddingTop: '20px', borderTop: '2px dashed #e2e8f0' },
  totalLabel: { display: 'flex', flexDirection: 'column' },
  totalPrice: { fontSize: '26px', fontWeight: '900', color: '#1e293b' },
  
  checkoutBtn: { width: '100%', padding: '20px', background: '#22c55e', color: '#fff', border: 'none', borderRadius: '18px', fontWeight: '800', fontSize: '16px', marginTop: '25px', cursor: 'pointer', transition: '0.3s' },
  nextStepNote: { textAlign: 'center', fontSize: '11px', color: '#94a3b8', marginTop: '12px', fontWeight: '600' },
  
  footerNav: { marginTop: '30px', display: 'flex', alignItems: 'center', gap: '10px', color: '#007bff', fontSize: '14px', fontWeight: '800', cursor: 'pointer' },
  
  emptyState: { textAlign: 'center', padding: '60px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' },
  shopBtn: { padding: '14px 30px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: '800', cursor: 'pointer' }
};

export default Cart;