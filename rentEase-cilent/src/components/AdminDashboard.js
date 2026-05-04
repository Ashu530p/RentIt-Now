import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const adminName = localStorage.getItem('userName') || 'Admin';

  // Graph ke liye dummy data (Asli data backend se bhi la sakte hain)
  const data = [
    { name: 'Jan', uv: 4000 },
    { name: 'Feb', uv: 3000 },
    { name: 'Mar', uv: 5000 },
    { name: 'Apr', uv: 4500 },
    { name: 'May', uv: 7170 }, // Aapki current earning
  ];

  const stats = [
    { label: 'TOTAL EARNINGS', value: '₹7,170', icon: '💰', color: '#00d4ff' },
    { label: 'TOTAL INVENTORY', value: '4 Items', icon: '📦', color: '#28a745' },
    { label: 'ACTIVE RENTALS', value: '5 Orders', icon: '📋', color: '#ffcc00' },
    { label: 'TOTAL CUSTOMERS', value: '5 Active', icon: '👥', color: '#6f42c1' },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.welcomeText}>
          Welcome back, <span style={{ color: '#00d4ff' }}>{adminName}</span>! 👋
        </h1>
        <p style={styles.subText}>Here’s a quick overview of how **RentEase** is performing.</p>
      </div>

      <div style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div key={index} style={{ ...styles.card, borderLeft: `6px solid ${stat.color}` }}>
            <div style={styles.cardIcon}>{stat.icon}</div>
            <div>
              <p style={styles.cardLabel}>{stat.label}</p>
              <h2 style={styles.cardValue}>{stat.value}</h2>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.mainGrid}>
        <div style={styles.chartSection}>
          <h3 style={styles.sectionTitle}>Monthly Revenue Growth 📈</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#00d4ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#999', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#999', fontSize: 12}} />
                <Tooltip contentStyle={{borderRadius: '10px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
                <Area type="monotone" dataKey="uv" stroke="#00d4ff" fillOpacity={1} fill="url(#colorUv)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={styles.actionsSection}>
          <h3 style={styles.sectionTitle}>Quick Actions ⚡</h3>
          <div style={styles.actionButtonsContainer}>
            <button style={styles.actionBtn} onClick={() => window.location.href='/admin/inventory'}>
              <span style={styles.btnIcon}>➕</span> Add New Stock
            </button>
            <button style={styles.actionBtn} onClick={() => window.location.href='/admin/pricing'}>
              <span style={styles.btnIcon}>💸</span> Update Pricing
            </button>
            <button style={{...styles.actionBtn, borderColor: '#00d4ff'}} onClick={() => window.location.href='/admin/orders'}>
              <span style={styles.btnIcon}>📦</span> Manage Orders
            </button>
            <button style={{...styles.actionBtn, borderColor: '#ffcc00'}} onClick={() => alert('Report Downloaded!')}>
              <span style={styles.btnIcon}>📊</span> Download Reports
            </button>
            <button style={{...styles.actionBtn, borderColor: '#ff4d4d'}} onClick={() => window.location.href='/'}>
              <span style={styles.btnIcon}>🌐</span> View Live Site
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '10px' },
  header: { marginBottom: '30px' },
  welcomeText: { fontSize: '28px', fontWeight: '800', color: '#1a1a1a', margin: 0 },
  subText: { color: '#666', marginTop: '5px' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' },
  card: { background: '#fff', padding: '20px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '15px' },
  cardIcon: { fontSize: '24px', background: '#f8f9fa', padding: '10px', borderRadius: '12px' },
  cardLabel: { fontSize: '11px', color: '#888', margin: 0, fontWeight: 'bold', textTransform: 'uppercase' },
  cardValue: { fontSize: '22px', color: '#1a1a1a', margin: '5px 0 0 0', fontWeight: '800' },
  mainGrid: { display: 'grid', gridTemplateColumns: '2.5fr 1fr', gap: '20px' },
  chartSection: { background: '#fff', padding: '25px', borderRadius: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' },
  actionsSection: { background: '#fff', padding: '25px', borderRadius: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' },
  sectionTitle: { fontSize: '18px', fontWeight: '700', marginBottom: '20px', color: '#333' },
  actionButtonsContainer: { display: 'flex', flexDirection: 'column', gap: '12px' },
  actionBtn: { display: 'flex', alignItems: 'center', padding: '12px 15px', background: '#fff', border: '1px solid #eee', borderRadius: '12px', cursor: 'pointer', fontWeight: '600', transition: '0.3s' },
  btnIcon: { marginRight: '10px' }
};

export default AdminDashboard;