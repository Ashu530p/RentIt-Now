import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ReportIssue = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      alert("Maintenance request submitted successfully! Admin will contact you.");
      navigate('/orders');
    }, 1500);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={{color: '#1e293b'}}>🛠️ Maintenance Support</h2>
        <p style={{fontSize: '14px', color: '#64748b'}}>Reporting for: <strong>{state?.productName || "Product"}</strong></p>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Describe the issue</label>
          <textarea placeholder="e.g. Washing machine not draining water..." style={styles.textarea} required />
          
          <label style={styles.label}>Priority</label>
          <select style={styles.input}>
            <option>Normal</option>
            <option>Urgent (Functional Failure)</option>
          </select>

          <button type="submit" style={styles.submitBtn} disabled={loading}>
            {loading ? "Submitting..." : "Submit Ticket"}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: { height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f8fafc' },
  card: { background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', width: '400px' },
  form: { display: 'flex', flexDirection: 'column', marginTop: '20px', textAlign: 'left' },
  label: { fontSize: '13px', fontWeight: 'bold', marginBottom: '8px', color: '#475569' },
  textarea: { padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', height: '100px', marginBottom: '20px' },
  input: { padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '20px' },
  submitBtn: { padding: '15px', background: '#1e293b', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }
};

export default ReportIssue;