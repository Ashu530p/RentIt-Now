import React, { useState } from 'react';
import { FaGift, FaCopy, FaWhatsapp, FaUsers, FaCoins, FaCheckCircle } from 'react-icons/fa';

const ReferAndEarn = () => {
  const [copied, setCopied] = useState(false);
  const referralCode = "AASHISH500"; // Logic: Baad mein user-specific dynamic code aayega

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={styles.container}>
      {/* 🎁 Hero Section */}
      <div style={styles.heroCard}>
        <div style={styles.iconCircle}><FaGift size={40} color="#fff" /></div>
        <h1 style={styles.title}>Refer & Earn ₹500</h1>
        <p style={styles.subtitle}>
          Apne doston ko **RentEase** par invite karein aur unke pehle rental par paayein ₹500 ke credits!
        </p>
        
        <div style={styles.codeBox}>
          <div style={styles.codeText}>
            <small>YOUR REFERRAL CODE</small>
            <p>{referralCode}</p>
          </div>
          <button onClick={copyToClipboard} style={styles.copyBtn}>
            {copied ? <FaCheckCircle /> : <FaCopy />} {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        
        <button style={styles.whatsappBtn}>
          <FaWhatsapp size={20} /> Share on WhatsApp
        </button>
      </div>

      {/* 📊 Wallet Stats Logic */}
      <div style={styles.statsGrid}>
        <div style={styles.statItem}>
          <FaUsers size={24} color="#007bff" />
          <div style={styles.statValue}>12</div>
          <div style={styles.statLabel}>Friends Invited</div>
        </div>
        <div style={styles.statItem}>
          <FaCoins size={24} color="#10b981" />
          <div style={styles.statValue}>₹2,500</div>
          <div style={styles.statLabel}>Credits Earned</div>
        </div>
      </div>

      {/* 💡 How it works logic */}
      <div style={styles.stepsCard}>
        <h3 style={styles.stepsTitle}>How it works?</h3>
        <div style={styles.step}>
          <div style={styles.stepNum}>1</div>
          <p>Share your unique referral code with friends.</p>
        </div>
        <div style={styles.step}>
          <div style={styles.stepNum}>2</div>
          <p>Your friend gets 20% off on their first month's rent.</p>
        </div>
        <div style={styles.step}>
          <div style={styles.stepNum}>3</div>
          <p>You get ₹500 credits once their delivery is successful!</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '40px 20px', maxWidth: '600px', margin: '0 auto' },
  heroCard: { 
    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', 
    padding: '50px 30px', borderRadius: '32px', textAlign: 'center', color: '#fff',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
  },
  iconCircle: { width: '80px', height: '80px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' },
  title: { fontSize: '28px', fontWeight: '900', margin: '0 0 10px' },
  subtitle: { fontSize: '14px', opacity: 0.8, lineHeight: '1.6', marginBottom: '30px' },
  
  codeBox: { background: 'rgba(255,255,255,0.05)', border: '1px dashed rgba(255,255,255,0.3)', borderRadius: '20px', padding: '15px 25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  codeText: { textAlign: 'left' },
  copyBtn: { background: '#007bff', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' },
  whatsappBtn: { width: '100%', padding: '18px', background: '#25D366', color: '#fff', border: 'none', borderRadius: '16px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' },

  statsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', margin: '30px 0' },
  statItem: { background: '#fff', padding: '25px', borderRadius: '24px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.02)', border: '1px solid #f1f5f9' },
  statValue: { fontSize: '24px', fontWeight: '900', color: '#1e293b', margin: '10px 0 5px' },
  statLabel: { fontSize: '12px', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase' },

  stepsCard: { background: '#fff', padding: '30px', borderRadius: '24px', border: '1px solid #f1f5f9' },
  stepsTitle: { fontSize: '18px', fontWeight: '800', marginBottom: '20px' },
  step: { display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' },
  stepNum: { width: '28px', height: '28px', background: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '800', color: '#007bff' }
};

export default ReferAndEarn;