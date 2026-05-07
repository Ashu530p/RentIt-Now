import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBoxOpen, FaRupeeSign, FaShoppingCart, FaPlusCircle, FaTrashAlt } from 'react-icons/fa';

const Admin = () => {
  const [stats, setStats] = useState({ totalRevenue: 0, activeRentals: 0, recentOrders: [] });
  const [newProduct, setNewProduct] = useState({ name: '', price: '', image: '', category: 'Furniture', securityDeposit: '' });
  const [loading, setLoading] = useState(false);

  // Stats Load Karo
  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get('https://rentease-premium-furniture-appliances-at-aynp.onrender.com/api/admin/stats');
      setStats(res.data);
    } catch (err) { console.error("Stats fetch error", err); }
  };

  // Product Add Karne ka Logic
  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('https://rentease-premium-furniture-appliances-at-aynp.onrender.com/api/products', newProduct);
      alert("Product added successfully! 🚀");
      setNewProduct({ name: '', price: '', image: '', category: 'Furniture', securityDeposit: '' });
      fetchStats();
    } catch (err) { alert("Failed to add product"); }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Admin Command Center</h1>

      {/* 📊 ANALYTICS CARDS */}
      <div style={styles.statsGrid}>
        <div style={{...styles.statCard, borderLeft: '5px solid #10b981'}}>
          <FaRupeeSign size={24} color="#10b981" />
          <div><p style={styles.statLabel}>Total Revenue</p><h3>₹{stats.totalRevenue.toLocaleString()}</h3></div>
        </div>
        <div style={{...styles.statCard, borderLeft: '5px solid #007bff'}}>
          <FaBoxOpen size={24} color="#007bff" />
          <div><p style={styles.statLabel}>Active Rentals</p><h3>{stats.activeRentals}</h3></div>
        </div>
      </div>

      <div style={styles.mainGrid}>
        {/* ➕ ADD PRODUCT FORM */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}><FaPlusCircle /> Add New Inventory</h2>
          <form onSubmit={handleAddProduct} style={styles.form}>
            <input type="text" placeholder="Product Name" style={styles.input} required value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} />
            <div style={styles.row}>
              <input type="number" placeholder="Rent/Mo" style={styles.input} required value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} />
              <input type="number" placeholder="Deposit" style={styles.input} required value={newProduct.securityDeposit} onChange={(e) => setNewProduct({...newProduct, securityDeposit: e.target.value})} />
            </div>
            <select style={styles.input} value={newProduct.category} onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}>
              <option value="Furniture">Furniture</option>
              <option value="Appliances">Appliances</option>
              <option value="Electronics">Electronics</option>
              <option value="Fitness">Fitness</option>
            </select>
            <input type="text" placeholder="Image URL (Public Link)" style={styles.input} required value={newProduct.image} onChange={(e) => setNewProduct({...newProduct, image: e.target.value})} />
            
            {newProduct.image && <img src={newProduct.image} alt="Preview" style={styles.preview} onError={(e) => e.target.style.display='none'} />}

            <button type="submit" disabled={loading} style={styles.submitBtn}>
              {loading ? "Updating Inventory..." : "Add to RentEase"}
            </button>
          </form>
        </div>

        {/* 📋 RECENT BOOKINGS */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}><FaShoppingCart /> Recent Orders</h2>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr><th>ID</th><th>Customer</th><th>Product</th><th>Status</th></tr>
              </thead>
              <tbody>
                {stats.recentOrders.map((order, i) => (
                  <tr key={i}>
                    <td>{order.bookingId}</td>
                    <td>{order.fullName}</td>
                    <td>{order.productName}</td>
                    <td><span style={styles.statusBadge}>{order.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '40px 5%', background: '#f8fafc', minHeight: '100vh' },
  title: { fontSize: '28px', fontWeight: '800', color: '#1e293b', marginBottom: '30px' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' },
  statCard: { background: '#fff', padding: '25px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' },
  statLabel: { fontSize: '14px', color: '#64748b', margin: 0 },
  mainGrid: { display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '30px' },
  card: { background: '#fff', padding: '30px', borderRadius: '24px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' },
  cardTitle: { fontSize: '20px', fontWeight: '700', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px', color: '#1e293b' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  row: { display: 'flex', gap: '10px' },
  input: { padding: '12px 15px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '14px' },
  preview: { width: '100px', height: '100px', objectFit: 'cover', borderRadius: '12px', marginTop: '10px', border: '1px solid #eee' },
  submitBtn: { padding: '15px', background: '#1e293b', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', transition: '0.3s' },
  tableWrapper: { overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left' },
  statusBadge: { background: '#e0f2fe', color: '#0369a1', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '700' }
};

export default Admin;