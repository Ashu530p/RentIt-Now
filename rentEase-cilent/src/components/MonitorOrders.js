import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPhoneAlt, FaMapMarkerAlt, FaCalendarAlt, FaDownload, FaEllipsisV, FaCheckCircle, FaTruck } from 'react-icons/fa';

const MonitorOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://https://rentease-premium-furniture-appliances-at-aynp.onrender.com/api/orders');
      setOrders(res.data);
    } catch (err) {
      console.error("Orders load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerTitleBox}>
          <h2 style={styles.title}>Order Management</h2>
          <p style={styles.subText}>Monitoring {orders.length} active rental subscriptions</p>
        </div>
        <button style={styles.exportBtn} onClick={() => alert('Exporting CSV...')}>
          <FaDownload /> Export Data
        </button>
      </div>

      <div style={styles.tableCard}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHead}>
              <th style={styles.th}>Customer</th>
              <th style={styles.th}>Delivery Address</th>
              <th style={styles.th}>Subscription</th>
              <th style={styles.th}>Payment</th>
              <th style={styles.th}>Delivery Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" style={styles.loaderCell}>Processing Orders...</td></tr>
            ) : orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id} style={styles.tableRow} className="order-row">
                  {/* Customer Info */}
                  <td style={styles.td}>
                    <div style={styles.customerBox}>
                      <div style={styles.avatar}>{order.fullName[0]}</div>
                      <div>
                        <div style={styles.cName}>{order.fullName}</div>
                        <a href={`tel:${order.phone}`} style={styles.cPhone}>
                          <FaPhoneAlt size={10} /> {order.phone}
                        </a>
                      </div>
                    </div>
                  </td>

                  {/* Address Logic */}
                  <td style={{...styles.td, width: '280px'}}>
                    <div style={styles.addressBox}>
                      <FaMapMarkerAlt color="#ef4444" size={12} />
                      <span>{order.address}</span>
                    </div>
                  </td>

                  {/* Subscription Details */}
                  <td style={styles.td}>
                    <div style={styles.pName}>{order.productName}</div>
                    <div style={styles.pDate}>
                      <FaCalendarAlt size={10} /> {new Date(order.startDate).toLocaleDateString()}
                    </div>
                  </td>

                  {/* Financials */}
                  <td style={styles.td}>
                    <div style={styles.pAmount}>₹{order.finalAmount.toLocaleString('en-IN')}</div>
                    <span style={{
                      ...styles.payBadge,
                      color: order.paymentStatus === 'Pending' ? '#b45309' : '#10b981'
                    }}>
                      {order.paymentStatus === 'Pending' ? '• Unpaid' : '• Verified'}
                    </span>
                  </td>

                  {/* Delivery Tracking Logic */}
                  <td style={styles.td}>
                    <select style={styles.statusSelect}>
                        <option>Scheduled</option>
                        <option>Out for Delivery</option>
                        <option selected>Delivered</option>
                    </select>
                  </td>

                  <td style={styles.td}>
                    <button style={styles.actionIcon}><FaEllipsisV /></button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="6" style={styles.emptyCell}>No orders found. Site is live, waiting for customers! 🚀</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <style>{`
        .order-row:hover { background-color: #f8fafc; }
        .order-row { transition: background 0.2s; }
      `}</style>
    </div>
  );
};

const styles = {
  container: { padding: '20px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' },
  title: { fontSize: '24px', fontWeight: '800', color: '#1e293b', margin: 0 },
  subText: { color: '#64748b', margin: '5px 0 0' },
  exportBtn: { display: 'flex', alignItems: 'center', gap: '8px', background: '#fff', border: '1px solid #e2e8f0', padding: '10px 18px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' },

  tableCard: { background: '#fff', borderRadius: '24px', border: '1px solid #f1f5f9', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' },
  table: { width: '100%', borderCollapse: 'collapse', minWidth: '1100px' },
  tableHead: { background: '#f8fafc', borderBottom: '2px solid #f1f5f9' },
  th: { padding: '20px', textAlign: 'left', fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' },
  td: { padding: '20px', verticalAlign: 'middle' },

  customerBox: { display: 'flex', alignItems: 'center', gap: '12px' },
  avatar: { width: '35px', height: '35px', background: '#e0f2fe', color: '#007bff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800' },
  cName: { fontWeight: '700', color: '#1e293b', fontSize: '14px' },
  cPhone: { fontSize: '12px', color: '#0ea5e9', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px', marginTop: '2px' },

  addressBox: { display: 'flex', gap: '10px', background: '#f8fafc', padding: '12px', borderRadius: '12px', fontSize: '13px', color: '#475569', border: '1px solid #f1f5f9', lineHeight: '1.4' },
  
  pName: { fontWeight: '700', color: '#1e293b', fontSize: '14px' },
  pDate: { fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '5px', marginTop: '4px' },

  pAmount: { fontSize: '16px', fontWeight: '800', color: '#0f172a' },
  payBadge: { fontSize: '11px', fontWeight: '700' },

  statusSelect: { padding: '8px 12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '12px', fontWeight: '600', cursor: 'pointer', background: '#fff' },
  actionIcon: { background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '10px' },

  loaderCell: { textAlign: 'center', padding: '100px', color: '#007bff', fontWeight: '700' },
  emptyCell: { textAlign: 'center', padding: '100px', color: '#94a3b8' }
};

export default MonitorOrders;