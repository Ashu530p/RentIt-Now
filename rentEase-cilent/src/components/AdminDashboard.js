import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { 
  FaBox, 
  FaUsers, 
  FaShoppingCart, 
  FaWallet, 
  FaArrowUp, 
  FaPlus, 
  FaFileDownload, 
  FaExternalLinkAlt,
  FaWaveSquare 
} from 'react-icons/fa';

// --- SUB-COMPONENT: LIVE REVENUE TRACKER (Built-in for single file) ---
const LiveRevenueTracker = () => {
  const stats = {
    totalRevenue: "₹1,45,200",
    monthlyGrowth: "+22.4%",
    activeSubscriptions: 84,
    projectedRevenue: "₹1,80,000"
  };

  return (
    <div style={trackerStyles.container}>
      <h3 style={trackerStyles.sectionTitle}><FaWaveSquare /> Live Revenue Stream</h3>
      <div style={trackerStyles.mainTracker}>
        <div style={trackerStyles.leftInfo}>
          <p style={trackerStyles.label}>COLLECTIONS (MAY 2026)</p>
          <h1 style={trackerStyles.revenueValue}>{stats.totalRevenue}</h1>
          <div style={trackerStyles.growthBadge}>
            <FaArrowUp /> {stats.monthlyGrowth} <span>vs last month</span>
          </div>
        </div>
        <div style={trackerStyles.chartPlaceholder}>
          <div style={trackerStyles.progressCircle}>
            <FaWallet size={24} color="#00d4ff" />
            <div style={trackerStyles.circleText}>80% Target</div>
          </div>
        </div>
      </div>
      <div style={trackerStyles.bottomStats}>
        <div style={trackerStyles.miniCard}>
          <span style={trackerStyles.miniLabel}>ACTIVE SUBS</span>
          <span style={trackerStyles.miniValue}>{stats.activeSubscriptions}</span>
        </div>
        <div style={trackerStyles.miniCard}>
          <span style={trackerStyles.miniLabel}>PROJECTED</span>
          <span style={trackerStyles.miniValue}>{stats.projectedRevenue}</span>
        </div>
      </div>
    </div>
  );
};

// --- MAIN DASHBOARD COMPONENT ---
const AdminDashboard = () => {
  const adminName = localStorage.getItem('userName') || 'Admin';

  const revenueData = [
    { name: 'Jan', revenue: 4000 },
    { name: 'Feb', revenue: 3000 },
    { name: 'Mar', revenue: 5000 },
    { name: 'Apr', revenue: 4500 },
    { name: 'May', revenue: 7170 }, 
  ];

  const stats = [
    { label: 'TOTAL REVENUE', value: '₹7,170', growth: '+18.5%', icon: <FaWallet />, color: '#00d4ff' },
    { label: 'INVENTORY', value: '48 Items', growth: '+2 New', icon: <FaBox />, color: '#10b981' },
    { label: 'ACTIVE RENTALS', value: '12 Orders', growth: '+5% Today', icon: <FaShoppingCart />, color: '#f59e0b' },
    { label: 'CUSTOMERS', value: '156 Active', growth: '+12 New', icon: <FaUsers />, color: '#8b5cf6' },
  ];

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.welcomeText}>Command Center</h1>
          <p style={styles.subText}>Welcome back, <strong style={{color: '#00d4ff'}}>{adminName}</strong>. RentEase is growing!</p>
        </div>
        <button style={styles.liveSiteBtn} onClick={() => window.open('/', '_blank')}>
          <FaExternalLinkAlt /> Live Site
        </button>
      </div>

      {/* Stats Overview */}
      <div style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div key={index} style={styles.statCard}>
            <div style={{ ...styles.iconBox, backgroundColor: `${stat.color}15`, color: stat.color }}>
              {stat.icon}
            </div>
            <div style={styles.statInfo}>
              <p style={styles.statLabel}>{stat.label}</p>
              <h2 style={styles.statValue}>{stat.value}</h2>
              <span style={{ ...styles.growthTag, color: '#10b981' }}>
                <FaArrowUp size={10} /> {stat.growth}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.mainLayout}>
        <div style={styles.leftColumn}>
          {/* Live Revenue Tracker Integration */}
          <LiveRevenueTracker />

          {/* Revenue Analytics Chart */}
          <div style={styles.chartCard}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>Revenue History</h3>
              <select style={styles.select}>
                <option>Monthly View</option>
                <option>Yearly View</option>
              </select>
            </div>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00d4ff" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip contentStyle={styles.tooltipStyle} cursor={{stroke: '#00d4ff', strokeWidth: 2}} />
                  <Area type="monotone" dataKey="revenue" stroke="#00d4ff" strokeWidth={4} fillOpacity={1} fill="url(#revenueGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Side Operations */}
        <div style={styles.actionsPanel}>
          <h3 style={styles.cardTitle}>Quick Operations</h3>
          <div style={styles.actionGrid}>
            <button style={styles.actionTile} onClick={() => window.location.href='/admin/inventory'}><FaPlus /> <span>Inventory</span></button>
            <button style={styles.actionTile} onClick={() => window.location.href='/admin/pricing'}><FaWallet /> <span>Pricing</span></button>
            <button style={styles.actionTile} onClick={() => window.location.href='/admin/orders'}><FaShoppingCart /> <span>Orders</span></button>
            <button style={{...styles.actionTile, background: '#f8fafc'}} onClick={() => alert('Exporting PDF...')}><FaFileDownload /> <span>Reports</span></button>
          </div>

          <div style={styles.recentActivity}>
             <h4 style={styles.smallTitle}>Inventory Alert</h4>
             <div style={styles.alertBox}>
                <p style={{margin: 0, fontSize: '13px'}}>⚠️ <strong>Split A.C.</strong> low stock (2 left).</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- STYLES OBJECTS ---
const trackerStyles = {
  container: { background: '#1e293b', padding: '25px', borderRadius: '28px', color: '#fff', marginBottom: '30px' },
  sectionTitle: { fontSize: '14px', fontWeight: '800', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', textTransform: 'uppercase' },
  mainTracker: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' },
  label: { fontSize: '10px', fontWeight: '800', color: '#64748b' },
  revenueValue: { fontSize: '38px', fontWeight: '900', margin: '5px 0' },
  growthBadge: { display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981', fontSize: '12px', fontWeight: '700' },
  progressCircle: { width: '100px', height: '100px', border: '6px solid rgba(0,212,255,0.1)', borderTopColor: '#00d4ff', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
  circleText: { fontSize: '9px', color: '#94a3b8', marginTop: '4px', fontWeight: '700' },
  bottomStats: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' },
  miniCard: { background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '12px', textAlign: 'center' },
  miniLabel: { fontSize: '9px', color: '#64748b', fontWeight: '800' },
  miniValue: { fontSize: '16px', fontWeight: '800', display: 'block', marginTop: '4px' }
};

const styles = {
  container: { padding: '30px', backgroundColor: '#f8fafc', minHeight: '100vh' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' },
  welcomeText: { fontSize: '32px', fontWeight: '900', color: '#1e293b', margin: 0 },
  subText: { color: '#64748b', fontSize: '15px', marginTop: '5px' },
  liveSiteBtn: { display: 'flex', alignItems: 'center', gap: '10px', background: '#fff', border: '1px solid #e2e8f0', padding: '10px 18px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '40px' },
  statCard: { background: '#fff', padding: '25px', borderRadius: '24px', display: 'flex', alignItems: 'center', gap: '20px', border: '1px solid #f1f5f9' },
  iconBox: { width: '50px', height: '50px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' },
  statLabel: { fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase' },
  statValue: { fontSize: '24px', fontWeight: '900', color: '#1e293b', margin: '2px 0' },
  growthTag: { fontSize: '11px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' },
  mainLayout: { display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '30px' },
  leftColumn: { display: 'flex', flexDirection: 'column' },
  chartCard: { background: '#fff', padding: '30px', borderRadius: '28px', border: '1px solid #f1f5f9' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' },
  cardTitle: { fontSize: '18px', fontWeight: '800', color: '#1e293b', margin: 0 },
  select: { padding: '8px 12px', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none', background: '#f8fafc', fontWeight: '600' },
  tooltipStyle: { borderRadius: '12px', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.05)', padding: '10px' },
  actionsPanel: { background: '#fff', padding: '30px', borderRadius: '28px', border: '1px solid #f1f5f9' },
  actionGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '20px' },
  actionTile: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '15px', background: '#f0f9ff', border: 'none', borderRadius: '16px', cursor: 'pointer', fontWeight: '700', color: '#007bff' },
  recentActivity: { marginTop: '30px' },
  smallTitle: { fontSize: '13px', color: '#94a3b8', fontWeight: '800', textTransform: 'uppercase', marginBottom: '15px' },
  alertBox: { padding: '15px', background: '#fff7ed', borderRadius: '12px', color: '#c2410c' }
};

export default AdminDashboard;