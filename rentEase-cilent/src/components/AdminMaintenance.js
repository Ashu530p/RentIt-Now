import React, { useState } from 'react';
import { FaTools, FaCheckCircle, FaClock, FaUserCog, FaExclamationTriangle } from 'react-icons/fa';

const AdminMaintenance = () => {
  // Logic: Mock data with priority and assigned technician
  const [requests, setRequests] = useState([
    { id: 1, customer: 'Aashish', product: 'Washing Machine', issue: 'Not draining water', status: 'Pending', priority: 'Urgent', date: '2026-05-04' },
    { id: 2, customer: 'Anjali', product: 'Refrigerator', issue: 'Cooling problem', status: 'In Progress', priority: 'Normal', date: '2026-05-05' },
    { id: 3, customer: 'Amit', product: 'Split A.C.', issue: 'Noise from unit', status: 'Pending', priority: 'Normal', date: '2026-05-05' }
  ]);

  const updateStatus = (id, newStatus) => {
    setRequests(requests.map(req => req.id === id ? { ...req, status: newStatus } : req));
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.titleBox}>
          <FaTools size={28} color="#007bff" />
          <h2 style={styles.title}>Service Tickets</h2>
        </div>
        <div style={styles.filterGroup}>
          <span style={styles.totalBadge}>{requests.length} Active Requests</span>
        </div>
      </div>

      <div style={styles.tableCard}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.thRow}>
              <th style={styles.th}>CUSTOMER & DATE</th>
              <th style={styles.th}>PRODUCT</th>
              <th style={styles.th}>ISSUE DESCRIPTION</th>
              <th style={styles.th}>PRIORITY</th>
              <th style={styles.th}>STATUS</th>
              <th style={styles.th}>OPERATIONS</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(req => (
              <tr key={req.id} style={styles.tr} className="table-row">
                <td style={styles.td}>
                  <div style={styles.customerName}>{req.customer}</div>
                  <div style={styles.dateText}>{req.date}</div>
                </td>
                <td style={styles.td}>
                  <span style={styles.productTag}>{req.product}</span>
                </td>
                <td style={styles.td}>
                  <div style={styles.issueText}>{req.issue}</div>
                </td>
                <td style={styles.td}>
                  <span style={{ 
                    ...styles.priorityBadge, 
                    color: req.priority === 'Urgent' ? '#ef4444' : '#6366f1',
                    background: req.priority === 'Urgent' ? '#fef2f2' : '#eef2ff'
                  }}>
                    {req.priority === 'Urgent' && <FaExclamationTriangle size={10} />} {req.priority}
                  </span>
                </td>
                <td style={styles.td}>
                  <div style={{ 
                    ...styles.statusBox,
                    color: getStatusColor(req.status).text,
                    background: getStatusColor(req.status).bg
                  }}>
                    {req.status === 'Pending' ? <FaClock size={12} /> : <FaCheckCircle size={12} />}
                    {req.status}
                  </div>
                </td>
                <td style={styles.td}>
                  <div style={styles.actionGroup}>
                    <select 
                      style={styles.assignSelect} 
                      onChange={(e) => updateStatus(req.id, 'In Progress')}
                      disabled={req.status === 'Resolved'}
                    >
                      <option>Assign Tech</option>
                      <option>Technician 1</option>
                      <option>Technician 2</option>
                    </select>
                    <button 
                      onClick={() => updateStatus(req.id, 'Resolved')} 
                      style={{...styles.resolveBtn, opacity: req.status === 'Resolved' ? 0.5 : 1}}
                      disabled={req.status === 'Resolved'}
                    >
                      {req.status === 'Resolved' ? 'Completed' : 'Resolve'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>{`
        .table-row { transition: 0.2s; }
        .table-row:hover { background-color: #f8fafc; }
      `}</style>
    </div>
  );
};

// Helper: Logic for status colors
const getStatusColor = (status) => {
  switch (status) {
    case 'Pending': return { text: '#b45309', bg: '#fffbeb' };
    case 'In Progress': return { text: '#2563eb', bg: '#eff6ff' };
    case 'Resolved': return { text: '#10b981', bg: '#ecfdf5' };
    default: return { text: '#64748b', bg: '#f1f5f9' };
  }
};

const styles = {
  container: { padding: '30px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' },
  titleBox: { display: 'flex', alignItems: 'center', gap: '15px' },
  title: { fontSize: '24px', fontWeight: '800', color: '#1e293b', margin: 0 },
  totalBadge: { background: '#f1f5f9', color: '#64748b', padding: '6px 15px', borderRadius: '50px', fontSize: '12px', fontWeight: '700' },
  
  tableCard: { background: '#fff', borderRadius: '24px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.02)' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { padding: '20px', textAlign: 'left', background: '#f8fafc', color: '#64748b', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #f1f5f9' },
  td: { padding: '20px', borderBottom: '1px solid #f1f5f9', verticalAlign: 'middle' },
  
  customerName: { fontSize: '14px', fontWeight: '700', color: '#1e293b' },
  dateText: { fontSize: '12px', color: '#94a3b8' },
  productTag: { background: '#f1f5f9', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', color: '#475569', fontWeight: '600' },
  issueText: { fontSize: '14px', color: '#475569', maxWidth: '250px', lineHeight: '1.4' },
  
  priorityBadge: { display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '5px 12px', borderRadius: '50px', fontSize: '11px', fontWeight: '700' },
  statusBox: { display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '700' },
  
  actionGroup: { display: 'flex', gap: '10px' },
  assignSelect: { padding: '8px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px', fontWeight: '600', color: '#475569', cursor: 'pointer' },
  resolveBtn: { background: '#1e293b', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: '700', transition: '0.2s' }
};

export default AdminMaintenance;