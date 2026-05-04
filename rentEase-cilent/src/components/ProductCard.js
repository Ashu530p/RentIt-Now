import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div style={styles.card}>
      <img src={product.image} alt={product.name} style={styles.img} />
      <h3 style={styles.name}>{product.name}</h3>
      <p style={styles.price}>₹{product.price}<span style={{fontSize: '12px', fontWeight: 'normal'}}> / mo</span></p>
      <Link to={`/product/${product.id}`}>
        <button style={styles.btn}>Rent Now</button>
      </Link>
    </div>
  );
};

const styles = {
  card: { 
    border: '1px solid #eee', 
    padding: '20px', 
    borderRadius: '15px', 
    width: '260px', 
    textAlign: 'center', 
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
    backgroundColor: '#fff'
  },
  img: { width: '100%', borderRadius: '10px', height: '180px', objectFit: 'cover' },
  name: { fontSize: '1.2rem', margin: '15px 0 10px', color: '#333' },
  price: { color: '#28a745', fontWeight: 'bold', fontSize: '1.1rem' },
  btn: { 
    width: '100%', 
    padding: '10px', 
    backgroundColor: '#007bff', 
    color: 'white', 
    border: 'none', 
    borderRadius: '8px', 
    cursor: 'pointer', 
    marginTop: '15px',
    fontWeight: '600'
  }
};

export default ProductCard;