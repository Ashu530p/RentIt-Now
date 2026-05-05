import React from 'react';
import { FaWaveSquare, FaArrowUp, FaWallet, FaChartPie } from 'react-icons/fa';

const LiveRevenueTracker = () => {
  // Logic: Mock data representing live business health
  const stats = {
    totalRevenue: "₹1,45,200",
    monthlyGrowth: "+22.4%",
    activeSubscriptions: 84,
    projectedRevenue: "₹1,80,000"
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.sectionTitle}><FaWaveSquare /> Live Revenue Stream</h3>
      
      <div style={styles.mainTracker}>
        <div style={styles.leftInfo}>
          <p style={styles.label}>TOTAL COLLECTIONS (MAY 2026)</p>
          <h1 style={styles.revenueValue}>{stats.totalRevenue}</h1>
          <div style={styles.growthBadge}>
            <FaArrowUp /> {stats.monthlyGrowth} <span>from last month</span>
          </div>
        </div>
        
        <div style={styles.chartPlaceholder}>
          {/* Yahan humne visual representation ke liye indicator dala hai */}
          <div style={styles.progressCircle}>
            <FaWallet size={30} color="#00d4ff" />
            <div style={styles.circleText}>80% Target Met</div>
          </div>
        </div>
      </div>

      <div style={styles.bottomStats}>
        <div style={styles.miniCard}>
          <span style={styles.miniLabel}>ACTIVE SUBS</span>
          <span style={styles.miniValue}>{stats.activeSubscriptions}</span>
        </div>
        <div style={styles.miniCard}>
          <span style={styles.miniLabel}>PROJECTED EARNING</span>
          <span style={styles.miniValue}>{stats.projectedRevenue}</span>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { background: '#1e293b', padding: '30px', borderRadius: '28px', color: '#fff', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' },
  sectionTitle: { fontSize: '16px', fontWeight: '700', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px', textTransform: 'uppercase' },
  mainTracker: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' },
  label: { fontSize: '11px', fontWeight: '800', color: '#64748b', letterSpacing: '1px' },
  revenueValue: { fontSize: '42px', fontWeight: '900', margin: '5px 0' },
  growthBadge: { display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981', fontSize: '13px', fontWeight: '700' },
  
  progressCircle: { width: '120px', height: '120px', border: '8px solid rgba(0,212,255,0.1)', borderTopColor: '#00d4ff', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
  circleText: { fontSize: '10px', color: '#94a3b8', marginTop: '5px', fontWeight: '700' },

  bottomStats: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' },
  miniCard: { background: 'rgba(255,255,255,0.03)', padding: '15px', borderRadius: '16px', textAlign: 'center' },
  miniLabel: { fontSize: '10px', color: '#64748b', fontWeight: '800' },
  miniValue: { fontSize: '18px', fontWeight: '800', display: 'block', marginTop: '5px', color: '#f8fafc' }
};

export default LiveRevenueTracker;