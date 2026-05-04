import React, { useState } from 'react';
import axios from 'axios';
import { FaCloudUploadAlt, FaLink, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const ManageInventory = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: 'Furniture',
    image: '',
    securityDeposit: '1000'
  });

  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (msg, type = 'success') => {
    setToast({ show: true, message: msg, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  // 🆕 Function with strict PNG/JPG check
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      // 1. Allowed formats check
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
      
      if (!allowedTypes.includes(file.type)) {
        showToast("Sirf PNG, JPG ya JPEG files hi allow hain! ❌", "error");
        e.target.value = ""; // Clear input
        return;
      }

      // 2. Size check (2MB Limit)
      if (file.size > 2 * 1024 * 1024) {
        showToast("File ka size 2MB se kam hona chahiye! ❌", "error");
        e.target.value = "";
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProduct({ ...product, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.image) {
      showToast("Please ek product image select karein! ⚠️", "error");
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/products', {
        ...product,
        price: Number(product.price),
        securityDeposit: Number(product.securityDeposit)
      });

      showToast("Inventory me Product add ho gaya! 🚀");
      setProduct({ name: '', price: '', category: 'Furniture', image: '', securityDeposit: '1000' });
    } catch (err) {
      console.error(err);
      showToast("Server error! Data save nahi ho paya. ❌", "error");
    }
  };

  return (
    <div style={styles.container}>
      {/* Dynamic Toast */}
      {toast.show && (
        <div style={{...styles.toast, background: toast.type === 'error' ? '#ef4444' : '#10b981'}}>
          {toast.type === 'error' ? <FaExclamationTriangle /> : <FaCheckCircle />} 
          <span style={{marginLeft: '10px'}}>{toast.message}</span>
        </div>
      )}

      <div style={styles.card}>
        <h2 style={styles.title}>📦 New Inventory Entry</h2>
        <p style={styles.subtitle}>Add new rental items to the [RentEase Database](http://localhost:3000/).</p>
        
        <form onSubmit={handleSubmit}>
          <div style={styles.formGrid}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Product Name</label>
              <input 
                value={product.name} 
                onChange={(e) => setProduct({...product, name: e.target.value})} 
                placeholder="e.g. 3-Seater Sofa" 
                style={styles.input} 
                required 
              />
            </div>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>Category</label>
              <select 
                value={product.category} 
                onChange={(e) => setProduct({...product, category: e.target.value})} 
                style={styles.input}
              >
                <option value="Furniture">Furniture</option>
                <option value="Appliances">Appliances</option>
                <option value="Electronics">Electronics</option>
              </select>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Monthly Rent (₹)</label>
              <input 
                type="number" 
                value={product.price} 
                onChange={(e) => setProduct({...product, price: e.target.value})} 
                placeholder="0.00" 
                style={styles.input} 
                required 
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Security Deposit (₹)</label>
              <input 
                type="number" 
                value={product.securityDeposit} 
                onChange={(e) => setProduct({...product, securityDeposit: e.target.value})} 
                style={styles.input} 
                required 
              />
            </div>

            {/* Image Selection Area */}
            <div style={{...styles.inputGroup, gridColumn: 'span 2'}}>
              <label style={styles.label}>Product Image (PNG/JPG only)</label>
              <div style={styles.uploadOptions}>
                <div style={styles.fileBox}>
                  <FaCloudUploadAlt size={22} />
                  <span style={{fontSize: '11px', marginTop: '4px'}}>Upload</span>
                  <input 
                    type="file" 
                    accept=".png, .jpg, .jpeg, .webp" 
                    onChange={handleFileUpload} 
                    style={styles.hiddenFile} 
                  />
                </div>
                
                <div style={styles.dividerText}>OR</div>

                <div style={{flex: 1, position: 'relative'}}>
                  <FaLink style={styles.urlIcon} />
                  <input 
                    value={product.image.startsWith('data:image') ? '' : product.image} 
                    onChange={(e) => setProduct({...product, image: e.target.value})} 
                    placeholder="Paste image link here..." 
                    style={{...styles.input, paddingLeft: '45px', width: '100%'}} 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Live Preview */}
          {product.image && (
            <div style={styles.previewBox}>
              <div style={styles.previewWrapper}>
                <img src={product.image} alt="Preview" style={styles.previewImg} />
                <button type="button" onClick={() => setProduct({...product, image: ''})} style={styles.removeBtn}>×</button>
              </div>
            </div>
          )}

          <button type="submit" style={styles.addBtn}>Save to Inventory</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: '850px', margin: '40px auto', padding: '0 20px' },
  card: { background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' },
  title: { margin: '0 0 10px', color: '#0f172a', fontWeight: '800', fontSize: '26px' },
  subtitle: { color: '#64748b', marginBottom: '35px', fontSize: '14px' },
  formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { fontSize: '13px', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' },
  input: { padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '15px', outline: 'none', background: '#f8fafc' },
  uploadOptions: { display: 'flex', gap: '20px', background: '#f1f5f9', padding: '15px', borderRadius: '16px', border: '1px dashed #cbd5e1' },
  fileBox: { width: '85px', height: '70px', background: '#fff', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative', border: '1px solid #e2e8f0', color: '#007bff' },
  hiddenFile: { position: 'absolute', opacity: 0, width: '100%', height: '100%', cursor: 'pointer' },
  dividerText: { alignSelf: 'center', fontWeight: '800', color: '#94a3b8', fontSize: '12px' },
  urlIcon: { position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' },
  previewBox: { marginTop: '25px', padding: '20px', background: '#f8fafc', borderRadius: '20px', textAlign: 'center', border: '1px solid #e2e8f0' },
  previewWrapper: { position: 'relative', display: 'inline-block' },
  previewImg: { maxHeight: '180px', borderRadius: '12px', boxShadow: '0 5px 15px rgba(0,0,0,0.08)' },
  removeBtn: { position: 'absolute', top: '-10px', right: '-10px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '50%', width: '26px', height: '26px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' },
  addBtn: { background: '#1e293b', color: '#fff', border: 'none', padding: '18px', borderRadius: '14px', cursor: 'pointer', fontWeight: 'bold', width: '100%', fontSize: '16px', marginTop: '30px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' },
  toast: { position: 'fixed', top: '20px', right: '20px', color: '#fff', padding: '16px 30px', borderRadius: '14px', zIndex: 1000, fontWeight: '600', display: 'flex', alignItems: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }
};

export default ManageInventory;