import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCloudUploadAlt, FaShieldAlt, FaIdCard, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';

const KYC = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState({ front: null, back: null });
  const [loading, setLoading] = useState(false);

  const handleFile = (e, side) => {
    const file = e.target.files[0];
    if (file) {
      setFiles({ ...files, [side]: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Documents submitted! Verification will take 4-6 hours. 🚀");
      navigate('/orders');
    }, 2000);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card} className="slide-in">
        <div style={styles.header}>
          <button onClick={() => navigate(-1)} style={styles.backBtn}><FaArrowLeft /></button>
          <h2 style={styles.title}>Identity Verification</h2>
        </div>
        
        <div style={styles.alertBox}>
          <FaShieldAlt color="#10b981" />
          <span>Your data is encrypted & stored securely as per RBI guidelines.</span>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={styles.uploadGrid}>
            <div style={styles.uploadBox}>
              <label style={styles.label}>Aadhar Front</label>
              <div style={styles.dropZone}>
                {files.front ? <img src={files.front} style={styles.preview} /> : <FaIdCard size={30} color="#cbd5e1" />}
                <input type="file" onChange={(e) => handleFile(e, 'front')} style={styles.hiddenInput} />
              </div>
            </div>
            <div style={styles.uploadBox}>
              <label style={styles.label}>Aadhar Back</label>
              <div style={styles.dropZone}>
                {files.back ? <img src={files.back} style={styles.preview} /> : <FaIdCard size={30} color="#cbd5e1" />}
                <input type="file" onChange={(e) => handleFile(e, 'back')} style={styles.hiddenInput} />
              </div>
            </div>
          </div>
          <button type="submit" style={styles.submitBtn} disabled={loading}>
            {loading ? "Uploading Documents..." : "Complete KYC"}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: { minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f4f7fa', padding: '20px' },
  card: { background: '#fff', padding: '40px', borderRadius: '32px', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', width: '100%', maxWidth: '550px' },
  header: { display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' },
  backBtn: { background: '#f1f5f9', border: 'none', padding: '10px', borderRadius: '50%', cursor: 'pointer' },
  title: { fontSize: '24px', fontWeight: '900', color: '#1e293b', margin: 0 },
  alertBox: { background: '#ecfdf5', padding: '15px', borderRadius: '15px', color: '#065f46', fontSize: '12px', display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '30px' },
  uploadGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' },
  label: { fontSize: '11px', fontWeight: '800', color: '#64748b', marginBottom: '8px', display: 'block' },
  dropZone: { height: '150px', background: '#f8fafc', border: '2px dashed #e2e8f0', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' },
  hiddenInput: { position: 'absolute', width: '100%', height: '100%', opacity: 0, cursor: 'pointer' },
  preview: { width: '100%', height: '100%', objectFit: 'cover' },
  submitBtn: { width: '100%', padding: '18px', background: '#1e293b', color: '#fff', border: 'none', borderRadius: '16px', fontWeight: '800', cursor: 'pointer' }
};

export default KYC;