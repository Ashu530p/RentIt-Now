import React, { useState } from 'react';

const MaintenanceRequest = () => {
  const [request, setRequest] = useState({ orderId: '', issue: '', priority: 'Normal' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Request submitted for Order: ${request.orderId}. Support will contact you soon!`);
    // Yahan backend API call aayegi baad mein
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={{color: '#1e293b'}}>🛠️ Maintenance Support</h2>
        <p style={{color: '#64748b', fontSize: '14px'}}>Facing issues with your rental? Let us fix it.</p>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <input 
            type="text" placeholder="Order ID (e.g. #RE123)" required 
            style={styles.input} 
            onChange={(e) => setRequest({...request, orderId: e.target.value})}
          />
          <select 
            style={styles.input} 
            onChange={(e) => setRequest({...request, priority: e.target.value})}
          >
            <option value="Normal">Normal Priority</option>
            <option value="Urgent">Urgent (Breakdown)</option>
          </select>
          <textarea 
            placeholder="Describe the issue (e.g. Fridge not cooling)" required 
            style={{...styles.input, height: '100px'}} 
            onChange={(e) => setRequest({...request, issue: e.target.value})}
          ></textarea>
          <button type="submit" style={styles.btn}>Submit Request</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: { display: 'flex', justifyContent: 'center', padding: '50px', background: '#f8fafc', minHeight: '80vh' },
  card: { background: '#fff', padding: '30px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', width: '450px' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' },
  input: { padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px' },
  btn: { padding: '15px', background: '#1e293b', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }
};

export default MaintenanceRequest;