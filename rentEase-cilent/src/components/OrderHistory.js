import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTimes, FaCalendarAlt, FaTools, FaHistory, FaShoppingBag } from 'react-icons/fa';

const OrderHistory = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Local storage se data uthayenge
    const savedOrders = JSON.parse(localStorage.getItem('myOrders')) || [];
    
    // Demo data jo hamesha rahega
    const demoOrders = [
      { id: 'C8A0E8', name: 'Washing Machine', start: '2026-05-22', end: '2026-05-28', price: '1240', status: 'Successful' },
      { id: '3E5BC4', name: 'Queen Size Bed', start: '2026-05-28', end: '2026-06-24', price: '1450', status: 'Successful' }
    ];

    // Naye orders ko demo data ke saath merge karke dikhayenge
    if (savedOrders.length > 0) {
      setOrders([...savedOrders, ...demoOrders]);
    } else {
      setOrders(demoOrders);
    }

    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={styles.background}>
      <div style={styles.historyCard}>
        
        <button 
          style={styles.closeBtn} 
          onClick={() => navigate('/')} 
          title="Back to Home"
        >
          <FaTimes />
        </button>

        <div style={styles.header}>
          <h2 style={styles.title}>My Rental History <FaHistory size={24} color="#007bff"/></h2>
          <p style={styles.subtitle}>Track your past and active rentals on RentEase.</p>
        </div>

        <div style={styles.ordersList}>
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <div key={index} style={styles.orderItem} className="order-card-hover">
                <div style={styles.statusBadge}>✓ {order.status || 'Successful'}</div>
                
                <div style={styles.orderContent}>
                  <div style={styles.infoLeft}>
                    <h3 style={styles.itemName}>{order.name}</h3>
                    <p style={styles.orderId}>Order ID: <strong>#{order.id}</strong></p>
                    <p style={styles.tenure}>
                      <FaCalendarAlt size={12} style={{marginRight:'5px'}}/> 
                      {order.start} to {order.end}
                    </p>
                  </div>
                  
                  <div style={styles.infoRight}>
                    <p style={styles.price}>₹{order.price}</p>
                    <div style={styles.actionGroup}>
                      <button style={styles.reportBtn} onClick={() => navigate('/report-issue')}>
                        <FaTools /> Report Issue
                      </button>
                      <button style={styles.detailsBtn}>View Details</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={styles.emptyState}>
              <FaShoppingBag size={50} color="#e2e8f0" style={{marginBottom:'15px'}}/>
              <h3>Abhi tak koi rentals nahi hain.</h3>
              <button onClick={() => navigate('/')} style={styles.shopBtn}>Start Renting Now</button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .order-card-hover:hover {
          transform: scale(1.02);
          box-shadow: 0 10px 25px rgba(0,0,0,0.08) !important;
        }
      `}</style>
    </div>
  );
};

// --- YAHAN HAIN PURE STYLES (AB ERROR NAHI AAYEGA) ---
const styles = {
  background: { 
    minHeight: '100vh', 
    width: '100%', 
    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1600")', 
    backgroundSize: 'cover', 
    backgroundPosition: 'center', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    padding: '80px 20px'
  },
  historyCard: { 
    background: 'rgba(255, 255, 255, 0.96)', 
    padding: '50px 40px', 
    borderRadius: '32px', 
    boxShadow: '0 25px 50px rgba(0,0,0,0.3)', 
    width: '100%', 
    maxWidth: '950px', 
    position: 'relative',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255,255,255,0.3)'
  },
  closeBtn: { 
    position: 'absolute', top: '25px', right: '25px', width: '40px', height: '40px', 
    borderRadius: '50%', background: '#f1f5f9', border: 'none', display: 'flex', 
    alignItems: 'center', justifyContent: 'center', fontSize: '20px', color: '#64748b', 
    cursor: 'pointer', transition: '0.3s'
  },
  header: { textAlign: 'center', marginBottom: '40px' },
  title: { fontSize: '32px', fontWeight: '900', color: '#0f172a', margin: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' },
  subtitle: { fontSize: '15px', color: '#64748b', marginTop: '8px' },
  ordersList: { display: 'flex', flexDirection: 'column', gap: '25px' },
  orderItem: { 
    background: '#fff', borderRadius: '24px', padding: '30px', 
    border: '1px solid #f1f5f9', position: 'relative', transition: '0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
  },
  statusBadge: { 
    position: 'absolute', top: '20px', left: '30px', background: '#ecfdf5', 
    color: '#10b981', padding: '6px 16px', borderRadius: '30px', fontSize: '12px', fontWeight: 'bold' 
  },
  orderContent: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px', flexWrap: 'wrap', gap: '20px' },
  itemName: { fontSize: '22px', fontWeight: '800', color: '#1e293b', margin: '0 0 8px' },
  orderId: { fontSize: '14px', color: '#94a3b8', margin: '0 0 8px' },
  tenure: { fontSize: '14px', color: '#007bff', fontWeight: '600', display: 'flex', alignItems: 'center' },
  infoRight: { textAlign: 'right' },
  price: { fontSize: '28px', fontWeight: '900', color: '#10b981', margin: '0 0 15px' },
  actionGroup: { display: 'flex', gap: '12px' },
  reportBtn: { background: '#fef2f2', color: '#ef4444', border: 'none', padding: '10px 20px', borderRadius: '12px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' },
  detailsBtn: { background: '#f8fafc', color: '#1e293b', border: '1px solid #e2e8f0', padding: '10px 20px', borderRadius: '12px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' },
  emptyState: { textAlign: 'center', padding: '60px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  shopBtn: { marginTop: '20px', padding: '12px 30px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }
};

export default OrderHistory;