import React, { useState } from 'react';

const AdminMaintenance = () => {
  // Dummy data (Baad mein backend se fetch karenge)
  const [requests, setRequests] = useState([
    { id: 1, customer: 'Aashish', product: 'Washing Machine', issue: 'Not draining water', status: 'Pending' },
    { id: 2, customer: 'Anjali', product: 'Refrigerator', issue: 'Cooling problem', status: 'In Progress' }
  ]);

  const updateStatus = (id, newStatus) => {
    setRequests(requests.map(req => req.id === id ? { ...req, status: newStatus } : req));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px', color: '#1e293b' }}>🔧 Maintenance Tickets</h2>
      <div style={styles.tableCard}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.thRow}>
              <th>Customer</th>
              <th>Product</th>
              <th>Issue Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(req => (
              <tr key={req.id} style={styles.tr}>
                <td style={styles.td}>{req.customer}</td>
                <td style={styles.td}>{req.product}</td>
                <td style={styles.td}>{req.issue}</td>
                <td style={styles.td}>
                  <span style={{ 
                    padding: '5px 10px', borderRadius: '15px', fontSize: '12px',
                    background: req.status === 'Pending' ? '#fff3cd' : '#dcfce7',
                    color: req.status === 'Pending' ? '#856404' : '#146c43'
                  }}>
                    {req.status}
                  </span>
                </td>
                <td style={styles.td}>
                  <button onClick={() => updateStatus(req.id, 'Resolved')} style={styles.actionBtn}>Mark Resolved</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  tableCard: { background: '#fff', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', overflow: 'hidden' },
  table: { width: '100%', borderCollapse: 'collapse' },
  thRow: { background: '#f8fafc', textAlign: 'left', borderBottom: '2px solid #f1f5f9' },
  td: { padding: '15px', borderBottom: '1px solid #f1f5f9', fontSize: '14px' },
  actionBtn: { background: '#1e293b', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer' }
};

export default AdminMaintenance;