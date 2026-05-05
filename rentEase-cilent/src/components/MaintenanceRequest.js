import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTools, FaCalendarCheck, FaExclamationCircle, FaArrowLeft, FaShieldAlt } from 'react-icons/fa';

const MaintenanceRequest = () => {
  const navigate = useNavigate();
  const [request, setRequest] = useState({ 
    orderId: '', 
    issueType: 'General', 
    description: '', 
    priority: 'Normal',
    preferredSlot: 'Morning' 
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Logic Simulation: Real app mein yahan API call hogi
    setTimeout(() => {
      setLoading(false);
      alert(`Ticket Raised! RentEase Technician will arrive in the ${request.preferredSlot} slot. Check My Rentals for updates.`);
      navigate('/orders');
    }, 1500);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card} className="fade-in">
        
        {/* Header with Back Navigation */}
        <div style={styles.header}>
            <button onClick={() => navigate(-1)} style={styles.backBtn}><FaArrowLeft /></button>
            <h2 style={styles.title}>Service & Repair</h2>
        </div>

        <p style={styles.subtitle}>Tell us what's wrong, and we'll fix it within 24 hours.</p>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Order Identity */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Order ID</label>
            <input 
                type="text" 
                placeholder="e.g. #RE-9921" 
                required 
                style={styles.input} 
                onChange={(e) => setRequest({...request, orderId: e.target.value})}
            />
          </div>

          {/* Issue Type Selection (RentoMojo Style) */}
          <label style={styles.label}>Issue Category</label>
          <div style={styles.categoryGrid}>
             {['Breakdown', 'Physical Damage', 'Relocation', 'Cleaning'].map(type => (
                 <div 
                    key={type} 
                    style={request.issueType === type ? styles.catBoxActive : styles.catBox}
                    onClick={() => setRequest({...request, issueType: type})}
                 >
                     {type}
                 </div>
             ))}
          </div>

          {/* Detailed Description */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Describe Problem</label>
            <textarea 
                placeholder="Briefly explain the issue..." 
                required 
                style={styles.textarea} 
                onChange={(e) => setRequest({...request, description: e.target.value})}
            ></textarea>
          </div>

          {/* Service Logistics Logic */}
          <div style={styles.row}>
            <div style={{flex: 1}}>
                <label style={styles.label}><FaCalendarCheck /> Preferred Slot</label>
                <select 
                    style={styles.select} 
                    onChange={(e) => setRequest({...request, preferredSlot: e.target.value})}
                >
                    <option value="Morning">Morning (9am-12pm)</option>
                    <option value="Afternoon">Afternoon (1pm-5pm)</option>
                    <option value="Evening">Evening (6pm-9pm)</option>
                </select>
            </div>
            <div style={{flex: 1}}>
                <label style={styles.label}><FaExclamationCircle /> Priority</label>
                <select 
                    style={styles.select} 
                    onChange={(e) => setRequest({...request, priority: e.target.value})}
                >
                    <option value="Normal">Normal</option>
                    <option value="Urgent">Urgent</option>
                </select>
            </div>
          </div>

          {/* Trust Badge */}
          <div style={styles.trustBadge}>
              <FaShieldAlt color="#10b981" />
              <span>Zero-cost repair under RentEase Protection.</span>
          </div>

          <button type="submit" style={styles.btn} disabled={loading}>
            {loading ? "Registering Ticket..." : "Submit Support Ticket"}
          </button>
        </form>
      </div>

      <style>{`
        .fade-in { animation: fadeIn 0.5s ease-in-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

const styles = {
  container: { display: 'flex', justifyContent: 'center', padding: '100px 20px', background: '#f4f7fa', minHeight: '100vh' },
  card: { background: '#fff', padding: '40px', borderRadius: '32px', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', width: '100%', maxWidth: '500px' },
  header: { display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '10px' },
  backBtn: { background: '#f1f5f9', border: 'none', width: '35px', height: '35px', borderRadius: '50%', cursor: 'pointer', color: '#64748b' },
  title: { fontSize: '26px', fontWeight: '800', color: '#1e293b', margin: 0 },
  subtitle: { color: '#64748b', fontSize: '14px', marginBottom: '30px' },
  
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { fontSize: '12px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' },
  input: { padding: '14px', borderRadius: '12px', border: '2px solid #f1f5f9', outline: 'none', fontSize: '15px' },
  textarea: { padding: '14px', borderRadius: '12px', border: '2px solid #f1f5f9', height: '100px', resize: 'none', outline: 'none' },
  
  categoryGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' },
  catBox: { padding: '12px', border: '1px solid #e2e8f0', borderRadius: '12px', textAlign: 'center', fontSize: '13px', fontWeight: '600', cursor: 'pointer', color: '#64748b' },
  catBoxActive: { padding: '12px', border: '2px solid #007bff', background: '#eff6ff', borderRadius: '12px', textAlign: 'center', fontSize: '13px', fontWeight: '700', color: '#007bff' },
  
  row: { display: 'flex', gap: '15px' },
  select: { padding: '14px', borderRadius: '12px', border: '2px solid #f1f5f9', background: '#fff', fontSize: '14px', fontWeight: '600', color: '#1e293b' },
  
  trustBadge: { display: 'flex', alignItems: 'center', gap: '10px', background: '#ecfdf5', padding: '12px', borderRadius: '12px', color: '#065f46', fontSize: '12px', fontWeight: '600' },
  btn: { padding: '18px', background: '#1e293b', color: '#fff', border: 'none', borderRadius: '16px', fontWeight: '800', fontSize: '16px', cursor: 'pointer', transition: '0.3s' }
};

export default MaintenanceRequest;