import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTimes, FaCalendarAlt, FaTools, FaHistory, FaShoppingBag, FaBox, FaCheckCircle, FaTruck, FaIdCard, FaReceipt } from 'react-icons/fa';

const OrderHistory = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Logic: Fetching from LocalStorage + Adding Premium Demo Orders
    const savedOrders = JSON.parse(localStorage.getItem('myOrders')) || [];
    
    const premiumDemo = [
      { 
        id: 'RE-8A0E8', 
        name: 'Washing Machine', 
        start: 'May 2026', 
        end: 'Nov 2026', 
        price: '1,240', 
        status: 'Delivered', 
        step: 3,
        tenure: '6 Months'
      },
      { 
        id: 'RE-3E5BC4', 
        name: 'Queen Size Bed', 
        start: 'May 2026', 
        end: 'May 2027', 
        price: '1,450', 
        status: 'In Transit', 
        step: 2,
        tenure: '12 Months'
      }
    ];

    setOrders([...savedOrders, ...premiumDemo]);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={styles.background}>
      <div style={styles.historyCard} className="fade-in">
        
        <button style={styles.closeBtn} onClick={() => navigate('/')} title="Back to Home">
          <FaTimes />
        </button>

        <div style={styles.header}>
          <div style={styles.titleRow}>
            <h2 style={styles.title}>Rental Journey</h2>
            <div style={styles.totalBadge}>{orders.length} Active Plans</div>
          </div>
          <p style={styles.subtitle}>Track your furniture delivery and manage monthly subscriptions.</p>
        </div>

        <div style={styles.ordersList}>
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <div key={index} style={styles.orderItem} className="order-card-hover">
                
                {/* 1. Header: Status & ID */}
                <div style={styles.orderHeader}>
                    <div style={{...styles.statusBadge, 
                        background: order.status === 'Delivered' ? '#ecfdf5' : '#fff7ed',
                        color: order.status === 'Delivered' ? '#10b981' : '#f97316'}}>
                        {order.status === 'Delivered' ? <FaCheckCircle /> : <FaTruck />} {order.status}
                    </div>
                    <span style={styles.orderIdText}>Booking ID: <strong style={{color: '#1e293b'}}>#{order.id}</strong></span>
                </div>

                <div style={styles.orderContent}>
                  <div style={styles.infoLeft}>
                    <h3 style={styles.itemName}>{order.name} <span style={styles.tenureTag}>{order.tenure || '3 Months'}</span></h3>
                    <div style={styles.tenureBox}>
                      <FaCalendarAlt size={13} color="#94a3b8"/> 
                      <span>{order.start} — {order.end}</span>
                    </div>
                    
                    {/* 2. Visual Tracking Logic (RentoMojo Style) */}
                    <div style={styles.trackerWrapper}>
                        <div style={styles.trackerLabels}>
                            <span style={styles.stepLabel}>KYC</span>
                            <span style={styles.stepLabel}>Shipped</span>
                            <span style={styles.stepLabel}>Delivered</span>
                        </div>
                        <div style={styles.trackerLine}>
                            <div style={{...styles.progressFill, width: order.step === 3 ? '100%' : order.step === 2 ? '50%' : '10%'}}></div>
                        </div>
                        <div style={styles.trackerPoints}>
                            <div style={styles.pointActive}><FaIdCard fontSize={8}/></div>
                            <div style={order.step >= 2 ? styles.pointActive : styles.point}><FaBox fontSize={8}/></div>
                            <div style={order.step === 3 ? styles.pointActive : styles.point}><FaCheckCircle fontSize={8}/></div>
                        </div>
                    </div>
                  </div>
                  
                  {/* 3. Action Logic: Manage & Support */}
                  <div style={styles.infoRight}>
                    <p style={styles.price}>₹{order.price}<small style={styles.mo}>/mo</small></p>
                    <div style={styles.actionGroup}>
                      <button style={styles.invoiceBtn} title="Download Invoice"><FaReceipt /></button>
                      <button style={styles.detailsBtn}>Extend Rent</button>
                      <button style={styles.reportBtn} onClick={() => navigate('/report-issue')}>
                        <FaTools /> Support
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={styles.emptyState}>
              <FaShoppingBag size={60} color="#e2e8f0" />
              <h3>No Active Rentals</h3>
              <p>Looks like you haven't upgraded your lifestyle yet.</p>
              <button onClick={() => navigate('/')} style={styles.shopBtn}>Browse Catalog</button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .fade-in { animation: fadeIn 0.5s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .order-card-hover:hover { border-color: #007bff !important; transform: scale(1.01); }
      `}</style>
    </div>
  );
};

const styles = {
  background: { minHeight: '100vh', background: '#f8fafc', display: 'flex', justifyContent: 'center', padding: '100px 20px' },
  historyCard: { background: '#fff', padding: '40px', borderRadius: '32px', boxShadow: '0 20px 50px rgba(0,0,0,0.03)', width: '100%', maxWidth: '950px', position: 'relative', border: '1px solid #f1f5f9' },
  closeBtn: { position: 'absolute', top: '30px', right: '30px', border: 'none', background: '#f1f5f9', width: '35px', height: '35px', borderRadius: '50%', cursor: 'pointer', color: '#64748b' },
  
  header: { marginBottom: '40px' },
  titleRow: { display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '8px' },
  title: { fontSize: '26px', fontWeight: '900', color: '#1e293b', margin: 0 },
  totalBadge: { background: '#eff6ff', color: '#007bff', padding: '4px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: '800' },
  subtitle: { color: '#64748b', fontSize: '14px' },
  
  ordersList: { display: 'flex', flexDirection: 'column', gap: '20px' },
  orderItem: { background: '#fff', borderRadius: '24px', padding: '25px', border: '1px solid #f1f5f9', transition: '0.3s' },
  orderHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '15px', borderBottom: '1px solid #f8fafc' },
  statusBadge: { display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '50px', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase' },
  orderIdText: { fontSize: '12px', color: '#94a3b8', fontWeight: '600' },
  
  orderContent: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' },
  infoLeft: { flex: 1, minWidth: '300px' },
  itemName: { fontSize: '20px', fontWeight: '800', color: '#1e293b', margin: '0 0 8px', display: 'flex', alignItems: 'center', gap: '10px' },
  tenureTag: { fontSize: '10px', background: '#f1f5f9', color: '#64748b', padding: '2px 8px', borderRadius: '4px' },
  tenureBox: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#94a3b8', fontWeight: '600', marginBottom: '25px' },
  
  // Advanced Tracker
  trackerWrapper: { maxWidth: '300px' },
  trackerLabels: { display: 'flex', justifyContent: 'space-between', marginBottom: '8px' },
  stepLabel: { fontSize: '10px', fontWeight: '800', color: '#cbd5e1', textTransform: 'uppercase' },
  trackerLine: { height: '6px', background: '#f1f5f9', borderRadius: '10px', overflow: 'hidden', position: 'relative' },
  progressFill: { height: '100%', background: '#10b981', transition: '1.5s ease-in-out' },
  trackerPoints: { display: 'flex', justifyContent: 'space-between', marginTop: '-11px' },
  pointActive: { width: '16px', height: '16px', background: '#10b981', borderRadius: '50%', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid #fff' },
  point: { width: '16px', height: '16px', background: '#f1f5f9', borderRadius: '50%', border: '3px solid #fff' },

  infoRight: { textAlign: 'right' },
  price: { fontSize: '28px', fontWeight: '900', color: '#1e293b', margin: '0 0 15px' },
  mo: { fontSize: '12px', color: '#94a3b8', fontWeight: '600' },
  actionGroup: { display: 'flex', gap: '10px', justifyContent: 'flex-end' },
  invoiceBtn: { background: '#f8fafc', color: '#64748b', border: '1px solid #e2e8f0', width: '40px', borderRadius: '12px', cursor: 'pointer' },
  detailsBtn: { background: '#1e293b', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '12px', fontSize: '13px', fontWeight: '800', cursor: 'pointer' },
  reportBtn: { background: '#fff', color: '#64748b', border: '1px solid #e2e8f0', padding: '12px 20px', borderRadius: '12px', fontSize: '13px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' },

  emptyState: { textAlign: 'center', padding: '80px 0' },
  shopBtn: { marginTop: '25px', padding: '16px 35px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '16px', fontWeight: '900', cursor: 'pointer', boxShadow: '0 10px 20px rgba(0,123,255,0.2)' }
};

export default OrderHistory;