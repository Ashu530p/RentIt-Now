import React, { useState } from 'react';
import { FaCalendarAlt, FaTag, FaInfoCircle } from 'react-icons/fa';

const TenureSelector = ({ basePrice, onTenureChange }) => {
  const [selectedMonths, setSelectedMonths] = useState(3);

  // Tenure Logic: Jitne zyada mahine, utna zyada discount
  const tenureOptions = [
    { months: 3, discount: 0, label: 'Standard' },
    { months: 6, discount: 10, label: 'Value' },
    { months: 9, discount: 15, label: 'Saver' },
    { months: 12, discount: 25, label: 'Best Deal' }
  ];

  const handleSelect = (option) => {
    setSelectedMonths(option.months);
    const discountedPrice = Math.round(basePrice * (1 - option.discount / 100));
    onTenureChange(option.months, discountedPrice);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h4 style={styles.title}><FaCalendarAlt /> Choose Tenure</h4>
        <span style={styles.hint}><FaInfoCircle /> Longer tenure, lower rent</span>
      </div>

      <div style={styles.grid}>
        {tenureOptions.map((option) => (
          <div 
            key={option.months}
            onClick={() => handleSelect(option)}
            style={{
              ...styles.optionCard,
              borderColor: selectedMonths === option.months ? '#007bff' : '#e2e8f0',
              background: selectedMonths === option.months ? '#f0f7ff' : '#fff'
            }}
          >
            {option.discount > 0 && (
              <div style={styles.discountBadge}>{option.discount}% OFF</div>
            )}
            <div style={styles.months}>{option.months} Months</div>
            <div style={styles.priceLabel}>
              ₹{Math.round(basePrice * (1 - option.discount / 100))}/mo
            </div>
            <div style={{...styles.tag, color: selectedMonths === option.months ? '#007bff' : '#94a3b8'}}>
              {option.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { margin: '25px 0', padding: '20px', background: '#fff', borderRadius: '20px', border: '1px solid #f1f5f9' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' },
  title: { fontSize: '14px', fontWeight: '800', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 },
  hint: { fontSize: '11px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '12px' },
  optionCard: { padding: '15px 10px', border: '2px solid', borderRadius: '15px', textAlign: 'center', cursor: 'pointer', transition: '0.3s', position: 'relative' },
  discountBadge: { position: 'absolute', top: '-8px', right: '-8px', background: '#10b981', color: '#fff', fontSize: '9px', fontWeight: '900', padding: '2px 6px', borderRadius: '4px', boxShadow: '0 4px 10px rgba(16,185,129,0.2)' },
  months: { fontSize: '16px', fontWeight: '900', color: '#1e293b' },
  priceLabel: { fontSize: '12px', fontWeight: '700', color: '#475569', margin: '5px 0' },
  tag: { fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }
};

export default TenureSelector;