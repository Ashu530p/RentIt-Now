import React from 'react';
import { Link } from 'react-router-dom';
import { FaShieldAlt } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  // Logic: Calculating a fake discount for UI appeal (optional)
  const originalPrice = Math.round(product.price * 1.4);
  const discount = 40; // Static or dynamic from DB

  return (
    <div style={styles.card} className="premium-card">
      {/* Discount Badge like RentoMojo */}
      <div style={styles.badge}>{discount}% OFF</div>
      
      <div style={styles.imgWrapper}>
        <img 
          src={product.image} 
          alt={product.name} 
          style={styles.img} 
          onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400'}
        />
      </div>

      <div style={styles.details}>
        <h3 style={styles.name}>{product.name}</h3>
        
        <div style={styles.priceRow}>
          <p style={styles.price}>₹{product.price.toLocaleString('en-IN')}<span style={styles.mo}>/mo</span></p>
          <span style={styles.oldPrice}>₹{originalPrice}</span>
        </div>

        {/* Deposit Info - Important for Transparency */}
        <div style={styles.depositBox}>
          <FaShieldAlt size={10} color="#10b981" />
          <span>Deposit: ₹{product.securityDeposit || '999'}</span>
        </div>

        <Link to={`/product/${product.id || product._id}`} style={{textDecoration: 'none'}}>
          <button style={styles.btn}>Rent Now</button>
        </Link>
      </div>

      <style>{`
        .premium-card { transition: all 0.3s ease; }
        .premium-card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(0,0,0,0.1) !important; }
      `}</style>
    </div>
  );
};

const styles = {
  card: { 
    background: '#fff', 
    borderRadius: '24px', 
    width: '280px', 
    padding: '15px',
    position: 'relative',
    border: '1px solid #f1f5f9',
    boxShadow: '0 10px 20px rgba(0,0,0,0.02)',
    overflow: 'hidden'
  },
  badge: {
    position: 'absolute', top: '15px', left: '15px', zIndex: 2,
    background: '#ef4444', color: '#fff', padding: '4px 10px',
    borderRadius: '8px', fontSize: '11px', fontWeight: '800'
  },
  imgWrapper: { width: '100%', height: '180px', borderRadius: '18px', overflow: 'hidden' },
  img: { width: '100%', height: '100%', objectFit: 'cover' },
  
  details: { padding: '15px 5px 5px' },
  name: { fontSize: '1.1rem', fontWeight: '700', color: '#1e293b', marginBottom: '10px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  
  priceRow: { display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '8px' },
  price: { color: '#0f172a', fontWeight: '900', fontSize: '1.4rem', margin: 0 },
  mo: { fontSize: '12px', color: '#64748b', fontWeight: '500' },
  oldPrice: { fontSize: '13px', color: '#94a3b8', textDecoration: 'line-through' },

  depositBox: { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748b', marginBottom: '15px', background: '#f8fafc', padding: '6px 10px', borderRadius: '8px' },
  
  btn: { 
    width: '100%', padding: '14px', background: '#007bff', color: '#fff', 
    border: 'none', borderRadius: '14px', fontWeight: '800', cursor: 'pointer',
    fontSize: '14px', transition: '0.3s'
  }
};

export default ProductCard;