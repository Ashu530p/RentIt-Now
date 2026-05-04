import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MonitorOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/orders');
      setOrders(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Orders load error:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={{margin: 0, color: '#1e293b'}}>📋 Monitor Active Orders</h2>
        <p style={{color: '#64748b'}}>Track customer details, delivery addresses, and payments</p>
      </div>

      <div style={styles.tableCard}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHead}>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Customer Details</th>
              <th style={styles.th}>Delivery Address</th>
              <th style={styles.th}>Product & Duration</th>
              <th style={styles.th}>Amount</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" style={{textAlign:'center', padding:'40px'}}>Fetching orders...</td></tr>
            ) : orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id} style={styles.tableRow}>
                  <td style={styles.td}>{new Date(order.createdAt).toLocaleDateString()}</td>
                  
                  {/* Customer & Number Column */}
                  <td style={styles.td}>
                    <div style={{fontWeight: '700', color: '#1e293b'}}>{order.fullName}</div>
                    <div style={{color: '#0ea5e9', fontSize: '13px', marginTop: '4px'}}>
                      📞 {order.phone || "+91 XXXXXXXXXX"}
                    </div>
                  </td>

                  {/* Address Column - Fixed width taaki hide na ho */}
                  <td style={{...styles.td, width: '250px'}}>
                    <div style={styles.addressBox}>
                      📍 {order.address || "Address not available"}
                    </div>
                  </td>

                  <td style={styles.td}>
                    <div style={{fontWeight: '600'}}>{order.productName}</div>
                    <div style={{fontSize: '11px', color: '#64748b'}}>
                      {new Date(order.startDate).toLocaleDateString()} - {new Date(order.endDate).toLocaleDateString()}
                    </div>
                  </td>

                  <td style={{...styles.td, color: '#10b981', fontWeight: '800'}}>
                    ₹{order.finalAmount}
                  </td>

                  <td style={styles.td}>
                    <span style={{
                      ...styles.statusBadge,
                      background: order.paymentStatus === 'Pending' ? '#fef3c7' : '#dcfce7',
                      color: order.paymentStatus === 'Pending' ? '#92400e' : '#166534'
                    }}>
                      {order.paymentStatus || 'Successful'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="6" style={{textAlign:'center', padding:'40px', color:'#94a3b8'}}>No orders found yet. 📦</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '10px' },
  header: { marginBottom: '30px' },
  tableCard: { 
    background: '#fff', 
    borderRadius: '20px', 
    boxShadow: '0 10px 40px rgba(0,0,0,0.04)', 
    overflowX: 'auto',
    border: '1px solid #f1f5f9' 
  },
  table: { width: '100%', borderCollapse: 'collapse', minWidth: '1000px' },
  tableHead: { background: '#f8fafc', textAlign: 'left' },
  th: { padding: '18px 20px', fontSize: '13px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' },
  tableRow: { borderBottom: '1px solid #f1f5f9', transition: '0.3s', ':hover': { background: '#f8fafc' } },
  td: { padding: '20px', fontSize: '14px', color: '#334155', verticalAlign: 'top' },
  addressBox: { 
    fontSize: '13px', 
    lineHeight: '1.5', 
    color: '#475569',
    wordBreak: 'break-word',
    background: '#f8fafc',
    padding: '8px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0'
  },
  statusBadge: { padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '700' }
};

export default MonitorOrders;