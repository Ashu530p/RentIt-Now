import React, { useState } from 'react';
import axios from 'axios';
import { 
  FaCloudUploadAlt, FaLink, FaCheckCircle, 
  FaExclamationTriangle, FaBoxOpen, FaImage, 
  FaRulerCombined, FaPalette, FaHistory 
} from 'react-icons/fa';

const ManageInventory = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: 'Furniture',
    image: '',
    securityDeposit: '1000',
    condition: 'New', // Mint, New, Refurbished
    specifications: { material: '', dimensions: '' }
  });

  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMode, setUploadMode] = useState('file');

  const showToast = (msg, type = 'success') => {
    setToast({ show: true, message: msg, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
        showToast("Use PNG, JPG or WEBP formats! ❌", "error");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        showToast("Image too heavy (>2MB). ❌", "error");
        return;
      }

      const reader = new FileReader();
      setIsUploading(true);
      reader.onloadend = () => {
        setProduct({ ...product, image: reader.result });
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product.image) {
      showToast("A product needs a face! Upload an image. ⚠️", "error");
      return;
    }

    try {
      // Logic: Sending data to your Render backend
      await axios.post('http://localhost:5000/api/products', {
        ...product,
        price: Number(product.price),
        securityDeposit: Number(product.securityDeposit)
      });
      showToast("Live! Product pushed to RentEase Catalog. 🚀");
      setProduct({ 
        name: '', price: '', category: 'Furniture', image: '', 
        securityDeposit: '1000', condition: 'New', 
        specifications: { material: '', dimensions: '' } 
      });
    } catch (err) {
      showToast("Backend Connection Failed! Check API. ❌", "error");
    }
  };

  return (
    <div style={styles.container}>
      {/* 🔔 Premium Toast Notification */}
      {toast.show && (
        <div style={{...styles.toast, background: toast.type === 'error' ? '#ef4444' : '#10b981'}} className="fade-in">
          {toast.type === 'error' ? <FaExclamationTriangle /> : <FaCheckCircle />} 
          <span>{toast.message}</span>
        </div>
      )}

      <div style={styles.mainGrid}>
        {/* Left Col: Control Panel */}
        <div style={styles.formCard}>
          <div style={styles.formHeader}>
            <div style={styles.headerIcon}><FaBoxOpen /></div>
            <div>
                <h2 style={styles.title}>Inventory Control</h2>
                <p style={styles.subtitle}>Add premium assets to the RentEase marketplace.</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Product Title</label>
              <input 
                value={product.name} 
                onChange={(e) => setProduct({...product, name: e.target.value})} 
                placeholder="e.g. Chesterfield 3-Seater Sofa" 
                style={styles.input} required 
              />
            </div>

            <div style={styles.row}>
              <div style={{...styles.inputGroup, flex: 1}}>
                <label style={styles.label}>Category</label>
                <select value={product.category} onChange={(e) => setProduct({...product, category: e.target.value})} style={styles.select}>
                  <option value="Furniture">Furniture</option>
                  <option value="Appliances">Appliances</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Fitness">Fitness</option>
                </select>
              </div>
              <div style={{...styles.inputGroup, flex: 1}}>
                <label style={styles.label}>Asset Condition</label>
                <select value={product.condition} onChange={(e) => setProduct({...product, condition: e.target.value})} style={styles.select}>
                  <option value="New">Brand New</option>
                  <option value="Mint">Mint (Like New)</option>
                  <option value="Refurbished">Refurbished</option>
                </select>
              </div>
            </div>

            <div style={styles.row}>
              <div style={{...styles.inputGroup, flex: 1}}>
                <label style={styles.label}>Monthly Rent (₹)</label>
                <input type="number" value={product.price} onChange={(e) => setProduct({...product, price: e.target.value})} placeholder="499" style={styles.input} required />
              </div>
              <div style={{...styles.inputGroup, flex: 1}}>
                <label style={styles.label}>Refundable Deposit (₹)</label>
                <input type="number" value={product.securityDeposit} onChange={(e) => setProduct({...product, securityDeposit: e.target.value})} style={styles.input} required />
              </div>
            </div>

            <div style={styles.uploadSection}>
               <div style={styles.tabHeader}>
                  <button type="button" onClick={() => setUploadMode('file')} style={uploadMode === 'file' ? styles.activeTab : styles.tab}>Local File</button>
                  <button type="button" onClick={() => setUploadMode('url')} style={uploadMode === 'url' ? styles.activeTab : styles.tab}>Image URL</button>
               </div>

               {uploadMode === 'file' ? (
                 <div style={styles.dropZone}>
                    <FaCloudUploadAlt size={30} color={isUploading ? "#007bff" : "#94a3b8"} />
                    <p style={styles.dropText}>{isUploading ? "Processing..." : "Select Product Image"}</p>
                    <input type="file" accept="image/*" onChange={handleFileUpload} style={styles.hiddenInput} />
                 </div>
               ) : (
                 <div style={styles.urlInputBox}>
                    <FaLink color="#94a3b8" />
                    <input 
                        value={product.image.startsWith('data:') ? '' : product.image} 
                        onChange={(e) => setProduct({...product, image: e.target.value})} 
                        placeholder="Paste image link here..." 
                        style={styles.urlInput} 
                    />
                 </div>
               )}
            </div>

            <button type="submit" style={styles.submitBtn} className="save-btn">
                Add to Live Catalog
            </button>
          </form>
        </div>

        {/* Right Col: Visual Validation */}
        <div style={styles.previewCol}>
          <div style={styles.sticky}>
              <p style={styles.previewLabel}>CUSTOMER VIEW PREVIEW</p>
              <div style={styles.previewCard}>
                 <div style={styles.prevImgBox}>
                    {product.image ? <img src={product.image} style={styles.prevImg} alt="Preview" /> : <FaImage size={40} color="#e2e8f0" />}
                    <div style={styles.conditionTag}>{product.condition}</div>
                 </div>
                 <div style={styles.prevDetails}>
                    <span style={styles.prevTag}>{product.category}</span>
                    <h3 style={styles.prevTitle}>{product.name || "Chesterfield Sofa..."}</h3>
                    <div style={styles.priceRow}>
                        <p style={styles.prevPrice}>₹{product.price || '0'}<small style={{fontSize: '12px', color: '#94a3b8'}}>/mo</small></p>
                        <div style={styles.depositLabel}>₹{product.securityDeposit} Deposit</div>
                    </div>
                    <div style={styles.serviceLine}><FaCheckCircle size={10} color="#10b981"/> Free Installation Included</div>
                 </div>
              </div>

              <div style={styles.adminNotes}>
                  <h4 style={styles.noteTitle}><FaHistory /> Quality Guidelines</h4>
                  <p style={styles.noteText}>Products in <strong>Mint</strong> condition should have zero scratches. Appliances must be under <strong>2 years</strong> of age.</p>
              </div>
          </div>
        </div>
      </div>

      <style>{`
        .save-btn { transition: 0.3s; }
        .save-btn:hover { background: #007bff !important; transform: translateY(-3px); box-shadow: 0 10px 20px rgba(0,123,255,0.2); }
        .fade-in { animation: fadeIn 0.4s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

const styles = {
  container: { padding: '80px 5%', background: '#f8fafc', minHeight: '100vh' },
  mainGrid: { display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '60px', maxWidth: '1300px', margin: '0 auto' },
  
  formCard: { background: '#fff', padding: '45px', borderRadius: '32px', border: '1px solid #f1f5f9', boxShadow: '0 20px 40px rgba(0,0,0,0.03)' },
  formHeader: { display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' },
  headerIcon: { width: '60px', height: '60px', background: '#eff6ff', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#007bff', fontSize: '24px' },
  title: { fontSize: '26px', fontWeight: '900', color: '#1e293b', margin: 0 },
  subtitle: { fontSize: '14px', color: '#64748b', marginTop: '4px' },
  
  form: { display: 'flex', flexDirection: 'column', gap: '22px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '10px' },
  row: { display: 'flex', gap: '20px' },
  label: { fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.8px' },
  input: { padding: '16px', borderRadius: '16px', border: '2px solid #f1f5f9', outline: 'none', fontSize: '15px', background: '#fcfcfc', transition: '0.2s' },
  select: { padding: '16px', borderRadius: '16px', border: '2px solid #f1f5f9', background: '#fff', fontWeight: '700', color: '#475569', cursor: 'pointer' },

  uploadSection: { background: '#f8fafc', padding: '25px', borderRadius: '24px', border: '1px solid #f1f5f9' },
  tabHeader: { display: 'flex', gap: '10px', marginBottom: '20px' },
  tab: { padding: '10px 20px', background: 'none', border: 'none', fontSize: '13px', fontWeight: '700', color: '#94a3b8', cursor: 'pointer' },
  activeTab: { padding: '10px 20px', background: '#fff', borderRadius: '12px', fontSize: '13px', fontWeight: '800', color: '#007bff', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' },
  
  dropZone: { height: '130px', border: '2px dashed #cbd5e1', borderRadius: '18px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', background: '#fff' },
  dropText: { fontSize: '13px', color: '#64748b', marginTop: '12px', fontWeight: '700' },
  hiddenInput: { position: 'absolute', opacity: 0, width: '100%', height: '100%', cursor: 'pointer' },
  
  urlInputBox: { display: 'flex', alignItems: 'center', gap: '12px', background: '#fff', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0' },
  urlInput: { border: 'none', background: 'transparent', width: '100%', outline: 'none', fontSize: '14px', color: '#1e293b' },

  submitBtn: { width: '100%', padding: '20px', background: '#1e293b', color: '#fff', border: 'none', borderRadius: '20px', fontWeight: '900', fontSize: '16px', cursor: 'pointer' },

  previewCol: { position: 'relative' },
  sticky: { position: 'sticky', top: '100px' },
  previewLabel: { fontSize: '11px', fontWeight: '900', color: '#cbd5e1', letterSpacing: '2px', textAlign: 'center', marginBottom: '25px' },
  previewCard: { background: '#fff', padding: '24px', borderRadius: '32px', boxShadow: '0 30px 60px rgba(0,0,0,0.06)', margin: '0 auto', maxWidth: '340px' },
  prevImgBox: { width: '100%', height: '220px', background: '#f8fafc', borderRadius: '24px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', marginBottom: '20px' },
  prevImg: { width: '100%', height: '100%', objectFit: 'cover' },
  conditionTag: { position: 'absolute', top: '15px', right: '15px', background: '#1e293b', color: '#fff', padding: '4px 12px', borderRadius: '8px', fontSize: '10px', fontWeight: '800' },
  
  prevTag: { fontSize: '10px', fontWeight: '900', color: '#007bff', background: '#eff6ff', padding: '5px 12px', borderRadius: '50px' },
  prevTitle: { fontSize: '20px', fontWeight: '800', margin: '15px 0 8px', color: '#1e293b' },
  priceRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '15px' },
  prevPrice: { fontSize: '26px', fontWeight: '900', color: '#0f172a', margin: 0 },
  depositLabel: { fontSize: '13px', fontWeight: '700', color: '#94a3b8' },
  serviceLine: { fontSize: '12px', color: '#10b981', fontWeight: '700', borderTop: '1px solid #f1f5f9', paddingTop: '15px' },

  adminNotes: { marginTop: '40px', padding: '25px', background: '#fff', borderRadius: '24px', border: '1px solid #f1f5f9' },
  noteTitle: { fontSize: '14px', fontWeight: '800', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '10px', margin: '0 0 10px' },
  noteText: { fontSize: '13px', color: '#64748b', lineHeight: '1.6', margin: 0 },
  
  toast: { position: 'fixed', top: '40px', right: '40px', color: '#fff', padding: '18px 35px', borderRadius: '18px', zIndex: 10000, display: 'flex', alignItems: 'center', gap: '15px', fontWeight: '800', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }
};

export default ManageInventory;