import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaTools, FaCamera, FaClock, FaExclamationCircle, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';

const ReportIssue = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [issueType, setIssueType] = useState('General');
  const [preview, setPreview] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulation logic
    setTimeout(() => {
      setLoading(false);
      alert(`Ticket Raised! RentEase support team will arrive within 24-48 hours.`);
      navigate('/order-history');
    }, 2000);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
            <button onClick={() => navigate(-1)} style={styles.backBtn}><FaArrowLeft /></button>
            <h2 style={styles.title}>Service Request</h2>
        </div>

        <div style={styles.productInfo}>
            <div style={styles.badge}>Active Subscription</div>
            <h4 style={styles.itemName}>{state?.name || "Premium Rental Item"}</h4>
            <p style={styles.orderId}>ID: #{state?.id || "RE-7710"}</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Issue Category Logic */}
          <label style={styles.label}>What is the problem?</label>
          <div style={styles.issueGrid}>
             {['Damage', 'Performance', 'Cleaning', 'Relocation'].map(type => (
               <div 
                key={type} 
                onClick={() => setIssueType(type)}
                style={issueType === type ? styles.issueBoxActive : styles.issueBox}
               >
                 {type}
               </div>
             ))}
          </div>

          <label style={styles.label}>Describe in detail</label>
          <textarea 
            placeholder="Describe the issue clearly for faster resolution..." 
            style={styles.textarea} 
            required 
          />
          
          {/* Photo Proof (Better than RentoMojo) */}
          <div style={styles.uploadSection}>
            <label style={styles.uploadBtn}>
                <FaCamera /> {preview ? "Change Photo" : "Upload Issue Photo"}
                <input type="file" hidden onChange={handleImage} accept="image/*" />
            </label>
            {preview && <img src={preview} alt="Preview" style={styles.thumbnail} />}
          </div>

          {/* Visit Schedule Logic */}
          <div style={styles.row}>
            <div style={{flex: 1}}>
                <label style={styles.label}><FaClock /> Preferred Slot</label>
                <select style={styles.select}>
                    <option>Anytime</option>
                    <option>Morning (9 AM - 12 PM)</option>
                    <option>Afternoon (1 PM - 4 PM)</option>
                    <option>Evening (5 PM - 8 PM)</option>
                </select>
            </div>
            <div style={{flex: 1}}>
                <label style={styles.label}><FaExclamationCircle /> Priority</label>
                <select style={styles.select}>
                    <option>Normal</option>
                    <option>Urgent</option>
                </select>
            </div>
          </div>

          <button type="submit" style={styles.submitBtn} disabled={loading}>
            {loading ? <><i className="fa fa-spinner fa-spin"></i> Raising Ticket...</> : "Submit Maintenance Request"}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: { minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f4f7fa', padding: '20px' },
  card: { background: '#fff', padding: '40px', borderRadius: '32px', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', width: '100%', maxWidth: '500px' },
  header: { display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '25px' },
  backBtn: { background: '#f1f5f9', border: 'none', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', color: '#64748b' },
  title: { fontSize: '24px', fontWeight: '800', color: '#1e293b', margin: 0 },
  
  productInfo: { background: '#f8fafc', padding: '20px', borderRadius: '20px', marginBottom: '30px', textAlign: 'center', border: '1px solid #f1f5f9' },
  badge: { fontSize: '10px', color: '#10b981', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' },
  itemName: { margin: 0, fontSize: '18px', color: '#1e293b' },
  orderId: { margin: '5px 0 0', fontSize: '12px', color: '#94a3b8' },

  form: { display: 'flex', flexDirection: 'column' },
  label: { fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '10px', textTransform: 'uppercase' },
  
  issueGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' },
  issueBox: { padding: '12px', textAlign: 'center', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '14px', cursor: 'pointer', color: '#64748b', fontWeight: '600', transition: '0.2s' },
  issueBoxActive: { padding: '12px', textAlign: 'center', border: '2px solid #007bff', background: '#eff6ff', borderRadius: '12px', fontSize: '14px', cursor: 'pointer', color: '#007bff', fontWeight: '700' },

  textarea: { padding: '15px', borderRadius: '15px', border: '1px solid #e2e8f0', height: '100px', marginBottom: '20px', outline: 'none', fontSize: '14px', background: '#fcfcfc' },
  
  uploadSection: { display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' },
  uploadBtn: { flex: 1, padding: '12px', border: '1px dashed #cbd5e1', borderRadius: '12px', color: '#64748b', textAlign: 'center', cursor: 'pointer', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' },
  thumbnail: { width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' },

  row: { display: 'flex', gap: '15px', marginBottom: '30px' },
  select: { width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '13px', fontWeight: '600', color: '#475569' },
  
  submitBtn: { padding: '18px', background: '#1e293b', color: '#fff', border: 'none', borderRadius: '16px', fontWeight: '800', cursor: 'pointer', fontSize: '16px', transition: '0.3s' }
};

export default ReportIssue;