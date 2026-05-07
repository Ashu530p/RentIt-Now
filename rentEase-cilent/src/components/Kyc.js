import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaShieldAlt, FaIdCard, FaArrowLeft, FaCloudUploadAlt } from 'react-icons/fa';

const Kyc = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState({ front: null, back: null });
  const [previews, setPreviews] = useState({ front: null, back: null });
  const [loading, setLoading] = useState(false);

  const handleFile = (e, side) => {
    const file = e.target.files[0];
    if (file) {
      // Preview ke liye URL banayein
      setPreviews({ ...previews, [side]: URL.createObjectURL(file) });
      
      // File ko Base64 mein convert karein (Backend limit ke hisab se)
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFiles(prev => ({ ...prev, [side]: reader.result }));
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!files.front || !files.back) return alert("Please upload both sides.");

    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      
      // Backend ko data bhejein
      // Note: Aapke server.js mein KYC ke liye alag route add karna hoga
      await axios.post('https://rentease-premium-furniture-appliances-at-aynp.onrender.com/api/auth/update-kyc', {
        email: user.email,
        kycDocs: files // Base64 strings
      });

      alert("Documents submitted! Verification will take 4-6 hours. 🚀");
      navigate('/');
    } catch (err) {
      alert("Submission failed. Please try smaller image sizes.");
    } finally {
      setLoading(false);
    }
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
          <span>Your data is encrypted & stored securely as per guidelines.</span>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={styles.uploadGrid}>
            {['front', 'back'].map((side) => (
              <div key={side} style={styles.uploadBox}>
                <label style={styles.label}>ID {side.toUpperCase()}</label>
                <div style={styles.dropZone}>
                  {previews[side] ? (
                    <img src={previews[side]} style={styles.preview} alt={`${side} Preview`} />
                  ) : (
                    <div style={{textAlign: 'center'}}>
                      <FaCloudUploadAlt size={30} color="#cbd5e1" />
                      <p style={{fontSize: '10px', color: '#94a3b8'}}>Click to upload</p>
                    </div>
                  )}
                  <input type="file" accept="image/*" onChange={(e) => handleFile(e, side)} style={styles.hiddenInput} />
                </div>
              </div>
            ))}
          </div>
          <button type="submit" style={styles.submitBtn} disabled={loading}>
            {loading ? "Verifying & Uploading..." : "Complete KYC"}
          </button>
        </form>
      </div>
    </div>
  );
};

// ... styles wahi rahenge ...
export default Kyc;