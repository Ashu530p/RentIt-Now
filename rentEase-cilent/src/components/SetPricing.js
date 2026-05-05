import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrashAlt, FaSave, FaTimes, FaSearch, FaExclamationCircle } from 'react-icons/fa';

const SetPricing = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ price: '', securityDeposit: '' });
  
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://https://rentease-premium-furniture-appliances-at-aynp.onrender.com/api/products');
      setProducts(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchProducts(); }, []);

  const showToast = (msg, type = 'success') => {
    setToast({ show: true, message: msg, type });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  const handleEditClick = (p) => {
    setEditId(p._id);
    setEditData({ price: p.price, securityDeposit: p.securityDeposit || 1000 });
  };

  const handleSaveEdit = async (id) => {
    try {
      await axios.put(`http://https://rentease-premium-furniture-appliances-at-aynp.onrender.com/api/products/${id}`, {
        price: Number(editData.price),
        securityDeposit: Number(editData.securityDeposit)
      });
      showToast("Price updated successfully! 💰");
      setEditId(null);
      fetchProducts();
    } catch (err) { showToast("Update failed! ❌", "error"); }
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://https://rentease-premium-furniture-appliances-at-aynp.onrender.com/api/products/${deleteId}`);
      showToast("Removed from store! 🗑️");
      setShowModal(false);
      fetchProducts();
    } catch (err) { showToast("Action failed! ❌", "error"); }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.container}>
      {toast.show && (
        <div style={{...styles.toast, background: toast.type === 'error' ? '#ef4444' : '#10b981'}}>
          {toast.message}
        </div>
      )}

      {/* Modern Top Header */}
      <div style={styles.headerRow}>
        <div>
          <h2 style={styles.mainTitle}>Pricing Control</h2>
          <p style={styles.subText}>Live control over monthly rentals and deposits.</p>
        </div>
        <div style={styles.searchWrapper}>
          <FaSearch style={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search by product name..." 
            style={styles.searchBar}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div style={styles.tableCard}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHead}>
              <th style={styles.th}>Product</th>
              <th style={styles.th}>Category</th>
              <th style={styles.th}>Monthly Rent (₹)</th>
              <th style={styles.th}>Security Deposit (₹)</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(p => (
              <tr key={p._id} style={styles.tableRow} className="pricing-row">
                <td style={styles.td}>
                   <div style={styles.productCell}>
                      <img src={p.image} alt="" style={styles.thumb} />
                      <span style={styles.pName}>{p.name}</span>
                   </div>
                </td>
                <td style={styles.td}><span style={styles.categoryTag}>{p.category}</span></td>
                <td style={styles.td}>
                  {editId === p._id ? 
                    <input type="number" value={editData.price} onChange={(e)=>setEditData({...editData, price: e.target.value})} style={styles.editInput} /> 
                    : <span style={styles.priceText}>₹{p.price}</span>
                  }
                </td>
                <td style={styles.td}>
                  {editId === p._id ? 
                    <input type="number" value={editData.securityDeposit} onChange={(e)=>setEditData({...editData, securityDeposit: e.target.value})} style={styles.editInput} /> 
                    : <span style={styles.depositText}>₹{p.securityDeposit || 1000}</span>
                  }
                </td>
                <td style={styles.td}>
                  {editId === p._id ? (
                    <div style={styles.actionGroup}>
                       <button onClick={() => handleSaveEdit(p._id)} style={styles.saveBtn}><FaSave /> Save</button>
                       <button onClick={() => setEditId(null)} style={styles.cancelBtn}><FaTimes /></button>
                    </div>
                  ) : (
                    <div style={styles.actionGroup}>
                      <button onClick={() => handleEditClick(p)} style={styles.iconBtn} title="Edit Pricing"><FaEdit /></button>
                      <button onClick={() => {setDeleteId(p._id); setShowModal(true);}} style={styles.delBtn} title="Remove Product"><FaTrashAlt /></button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredProducts.length === 0 && <div style={styles.noData}>No items found matching "{searchTerm}"</div>}
      </div>

      {/* Delete Modal */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalCard}>
            <FaExclamationCircle size={40} color="#ff4d4d" />
            <h3 style={{margin: '15px 0 10px'}}>Delete Item?</h3>
            <p style={{color: '#64748b', fontSize: '14px'}}>This action is permanent and will remove the item from all customer views.</p>
            <div style={styles.modalActions}>
              <button onClick={() => setShowModal(false)} style={styles.modalCancel}>No, Keep it</button>
              <button onClick={confirmDelete} style={styles.modalConfirm}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .pricing-row:hover { background-color: #f8fafc; }
      `}</style>
    </div>
  );
};

const styles = {
  container: { padding: '20px' },
  mainTitle: { fontSize: '24px', fontWeight: '800', color: '#1e293b', margin: 0 },
  subText: { color: '#64748b', fontSize: '14px', marginTop: '5px' },
  headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '35px' },
  searchWrapper: { position: 'relative', width: '350px' },
  searchIcon: { position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' },
  searchBar: { width: '100%', padding: '14px 14px 14px 45px', borderRadius: '15px', border: '1px solid #e2e8f0', outline: 'none', background: '#fff', fontSize: '14px', boxSizing: 'border-box' },
  
  tableCard: { background: '#fff', borderRadius: '24px', border: '1px solid #f1f5f9', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { padding: '18px 25px', background: '#f8fafc', textAlign: 'left', fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' },
  td: { padding: '15px 25px', borderBottom: '1px solid #f1f5f9', verticalAlign: 'middle' },
  
  productCell: { display: 'flex', alignItems: 'center', gap: '15px' },
  thumb: { width: '45px', height: '45px', objectFit: 'cover', borderRadius: '10px' },
  pName: { fontWeight: '700', color: '#1e293b', fontSize: '14px' },
  categoryTag: { padding: '5px 12px', background: '#e0f2fe', color: '#007bff', borderRadius: '50px', fontSize: '11px', fontWeight: '800' },
  
  priceText: { fontWeight: '800', color: '#10b981', fontSize: '16px' },
  depositText: { color: '#64748b', fontWeight: '600', fontSize: '14px' },
  editInput: { width: '100px', padding: '10px', borderRadius: '10px', border: '2px solid #007bff', outline: 'none', fontWeight: '700' },
  
  actionGroup: { display: 'flex', gap: '10px', alignItems: 'center' },
  iconBtn: { background: '#f8fafc', border: '1px solid #e2e8f0', padding: '10px', borderRadius: '10px', cursor: 'pointer', color: '#64748b', transition: '0.2s' },
  delBtn: { background: '#fff1f2', border: '1px solid #ffe4e6', padding: '10px', borderRadius: '10px', cursor: 'pointer', color: '#ef4444' },
  saveBtn: { background: '#10b981', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '10px', cursor: 'pointer', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' },
  cancelBtn: { background: '#f1f5f9', color: '#64748b', border: 'none', padding: '10px', borderRadius: '10px', cursor: 'pointer' },
  
  modalOverlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 },
  modalCard: { background: '#fff', padding: '40px', borderRadius: '32px', textAlign: 'center', width: '400px', boxShadow: '0 25px 50px rgba(0,0,0,0.1)' },
  modalActions: { display: 'flex', gap: '15px', marginTop: '30px' },
  modalCancel: { flex: 1, padding: '14px', background: '#f1f5f9', border: 'none', borderRadius: '15px', fontWeight: '700', color: '#64748b', cursor: 'pointer' },
  modalConfirm: { flex: 1, padding: '14px', background: '#ff4d4d', color: '#fff', border: 'none', borderRadius: '15px', fontWeight: '700', cursor: 'pointer' },
  
  toast: { position: 'fixed', top: '30px', right: '30px', color: '#fff', padding: '18px 35px', borderRadius: '15px', zIndex: 10000, fontWeight: '700', boxShadow: '0 15px 30px rgba(0,0,0,0.1)' },
  noData: { textAlign: 'center', padding: '60px', color: '#94a3b8', fontSize: '14px', fontWeight: '600' }
};

export default SetPricing;