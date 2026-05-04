import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SetPricing = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ price: '', securityDeposit: '' });
  
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '' });

  const fetchProducts = async () => {
    try {
      const res = await axios.get('https://rentease-premium-furniture-appliances-at-4idp.onrender.com/api/products');
      setProducts(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchProducts(); }, []);

  const showToast = (msg) => {
    setToast({ show: true, message: msg });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  const handleEditClick = (p) => {
    setEditId(p._id);
    setEditData({ price: p.price, securityDeposit: p.securityDeposit || 1000 });
  };

  const handleSaveEdit = async (id) => {
    try {
      await axios.put(`https://rentease-premium-furniture-appliances-at-4idp.onrender.com/api/products/${id}`, {
        price: Number(editData.price),
        securityDeposit: Number(editData.securityDeposit)
      });
      showToast("Pricing Updated! 💰");
      setEditId(null);
      fetchProducts();
    } catch (err) { showToast("Update fail! ❌"); }
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`https://rentease-premium-furniture-appliances-at-4idp.onrender.com/api/products/${deleteId}`);
      showToast("Product Removed! 🗑️");
      setShowModal(false);
      fetchProducts();
    } catch (err) { showToast("Error! ❌"); }
  };

  // Filter Logic for Search
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.container}>
      {toast.show && <div style={styles.toast}>✅ {toast.message}</div>}

      <div style={styles.headerRow}>
        <div>
          <h2 style={{margin: 0}}>💰 Set Pricing & Inventory</h2>
          <p style={{color: '#666'}}>Manage your rental rates and security deposits</p>
        </div>
        <input 
          type="text" 
          placeholder="Search product... 🔍" 
          style={styles.searchBar}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div style={styles.tableCard}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHead}>
              <th>Preview</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Monthly Rent (₹)</th>
              <th>Security Deposit (₹)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(p => (
              <tr key={p._id} style={styles.tableRow}>
                <td><img src={p.image} alt="" style={styles.thumb} /></td>
                <td style={{fontWeight: 'bold'}}>{p.name}</td>
                <td><span style={styles.categoryTag}>{p.category}</span></td>
                <td>
                  {editId === p._id ? 
                    <input type="number" value={editData.price} onChange={(e)=>setEditData({...editData, price: e.target.value})} style={styles.smallInput} /> 
                    : `₹${p.price}`
                  }
                </td>
                <td>
                  {editId === p._id ? 
                    <input type="number" value={editData.securityDeposit} onChange={(e)=>setEditData({...editData, securityDeposit: e.target.value})} style={styles.smallInput} /> 
                    : `₹${p.securityDeposit || 1000}`
                  }
                </td>
                <td>
                  {editId === p._id ? (
                    <button onClick={() => handleSaveEdit(p._id)} style={styles.saveBtn}>Save ✅</button>
                  ) : (
                    <div style={{display: 'flex', gap: '8px'}}>
                      <button onClick={() => handleEditClick(p)} style={styles.editBtn} title="Edit Pricing">✏️</button>
                      <button onClick={() => {setDeleteId(p._id); setShowModal(true);}} style={styles.delBtn} title="Remove Product">🗑️</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredProducts.length === 0 && <p style={styles.noData}>No products found in inventory.</p>}
      </div>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalCard}>
            <h3 style={{color: '#1a1a1a'}}>Remove from Inventory?</h3>
            <p style={{color: '#666', fontSize: '14px', margin: '15px 0'}}>This will permanently delete the product from RentEase store.</p>
            <div style={styles.modalActions}>
              <button onClick={() => setShowModal(false)} style={styles.cancelBtn}>Cancel</button>
              <button onClick={confirmDelete} style={styles.confirmBtn}>Delete Anyway</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { padding: '10px' },
  headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' },
  searchBar: { padding: '12px 20px', borderRadius: '12px', border: '1px solid #ddd', width: '300px', outline: 'none', background: '#fff' },
  tableCard: { background: '#fff', borderRadius: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.04)', overflow: 'hidden' },
  table: { width: '100%', borderCollapse: 'collapse' },
  tableHead: { background: '#fcfcfc', textAlign: 'left', borderBottom: '2px solid #f0f0f0' },
  tableRow: { borderBottom: '1px solid #f9f9f9', transition: '0.2s' },
  thumb: { width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' },
  categoryTag: { padding: '4px 10px', background: '#f0f4ff', color: '#007bff', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' },
  smallInput: { width: '90px', padding: '8px', borderRadius: '8px', border: '1px solid #007bff', outline: 'none' },
  editBtn: { background: '#fcfcfc', border: '1px solid #eee', padding: '8px', borderRadius: '8px', cursor: 'pointer' },
  delBtn: { background: '#fff0f0', border: '1px solid #ffdada', padding: '8px', borderRadius: '8px', cursor: 'pointer' },
  saveBtn: { background: '#28a745', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' },
  modalOverlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 5000 },
  modalCard: { background: '#fff', padding: '30px', borderRadius: '24px', textAlign: 'center', width: '380px' },
  modalActions: { display: 'flex', gap: '15px', marginTop: '20px' },
  cancelBtn: { flex: 1, padding: '12px', background: '#eee', border: 'none', borderRadius: '12px', cursor: 'pointer' },
  confirmBtn: { flex: 1, padding: '12px', background: '#ff4d4d', color: '#fff', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' },
  toast: { position: 'fixed', top: '20px', right: '20px', background: '#1a1a1a', color: '#fff', padding: '15px 30px', borderRadius: '12px', zIndex: 6000 },
  noData: { textAlign: 'center', padding: '40px', color: '#999' }
};

export default SetPricing;