import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaCalendarAlt, FaShieldAlt, FaStar, FaTools, FaTruck, FaUndo, FaInfoCircle, FaShoppingCart } from 'react-icons/fa';

// Tenure Selector Component (Wahi jo tumne diya, bas styling sleek ki hai)
const TenureSelector = ({ basePrice, onTenureChange }) => {
  const [selectedMonths, setSelectedMonths] = useState(3);
  const tenureOptions = [
    { months: 3, discount: 0, label: 'Standard' },
    { months: 6, discount: 10, label: 'Value' },
    { months: 12, discount: 25, label: 'Best Deal' }
  ];

  const handleSelect = (option) => {
    setSelectedMonths(option.months);
    const discountedPrice = Math.round(basePrice * (1 - option.discount / 100));
    onTenureChange(option.months, discountedPrice);
  };

  return (
    <div style={styles.tenureContainer}>
      <div style={styles.tenureHeader}>
        <h4 style={styles.tenureTitle}><FaCalendarAlt /> Choose Tenure</h4>
        <span style={styles.tenureHint}>Longer tenure, lower rent</span>
      </div>
      <div style={styles.tenureGrid}>
        {tenureOptions.map((option) => (
          <div 
            key={option.months}
            onClick={() => handleSelect(option)}
            style={{
              ...styles.tenureCard,
              borderColor: selectedMonths === option.months ? '#007bff' : '#e2e8f0',
              background: selectedMonths === option.months ? '#f0f7ff' : '#fff'
            }}
          >
            {option.discount > 0 && <div style={styles.discountBadge}>{option.discount}% OFF</div>}
            <div style={styles.monthsText}>{option.months} Months</div>
            <div style={styles.priceLabel}>₹{Math.round(basePrice * (1 - option.discount / 100))}/mo</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProductDetail = ({ addToCart }) => { // Props se addToCart liya
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rentalConfig, setRentalConfig] = useState({ months: 3, currentPrice: 0 });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://rentease-premium-furniture-appliances-at-aynp.onrender.com/api/products/${id}`);
        setProduct(res.data);
        setRentalConfig({ months: 3, currentPrice: res.data.price });
      } catch (err) {
        const sampleMatch = fallbackData.find(p => String(p.id) === String(id));
        setProduct(sampleMatch);
        setRentalConfig({ months: 3, currentPrice: sampleMatch.price });
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const handleTenureUpdate = (months, newPrice) => {
    setRentalConfig({ months, currentPrice: newPrice });
  };

  const handleAddToCart = () => {
    // Tenure aur updated price ke saath product cart mein bhejo
    const productToCart = {
      ...product,
      selectedTenure: rentalConfig.months,
      price: rentalConfig.currentPrice
    };
    addToCart(productToCart);
    navigate('/cart'); // Seedha cart page par le jao
  };

  if (loading) return <div style={styles.loader}>Tailoring your experience...</div>;
  if (!product) return <div style={styles.errorPage}><h2>Product Not Found</h2><button onClick={()=>navigate('/')}>Go Home</button></div>;

  return (
    <div style={styles.container}>
      <div style={styles.leftCol}>
        <div style={styles.imgCard}>
          <img src={product.image} alt={product.name} style={styles.mainImg} />
          <div style={styles.categoryBadge}>{product.category}</div>
        </div>
        <div style={styles.benefitGrid}>
          <div style={styles.benefitItem}><FaTruck color="#007bff"/> <span>Free Setup</span></div>
          <div style={styles.benefitItem}><FaTools color="#007bff"/> <span>Free Maintenance</span></div>
          <div style={styles.benefitItem}><FaUndo color="#007bff"/> <span>Mint Condition</span></div>
        </div>
      </div>

      <div style={styles.rightCol}>
        <div style={styles.infoHead}>
          <h1 style={styles.title}>{product.name}</h1>
          <div style={styles.ratingRow}>
            <FaStar color="#ffc107" /> <span style={styles.reviewCount}>4.8 (120+ Reviews)</span>
          </div>
        </div>

        <TenureSelector basePrice={product.price} onTenureChange={handleTenureUpdate} />

        <div style={styles.billCard}>
          <div style={styles.billRow}><span>Monthly Rent</span><strong>₹{rentalConfig.currentPrice}/mo</strong></div>
          <div style={styles.billRow}><span>Security Deposit</span><strong>₹{product.securityDeposit}</strong></div>
          <div style={styles.totalBox}>
            <span>Amount Payable Now</span>
            <span>₹{rentalConfig.currentPrice + product.securityDeposit}</span>
          </div>
          <p style={styles.refundableInfo}>*Security deposit is 100% refundable</p>
        </div>

        {/* Bada professional Add to Cart Button */}
        <button style={styles.cartBtn} onClick={handleAddToCart}>
          <FaShoppingCart style={{marginRight: '10px'}} /> Add to Cart
        </button>

        <div style={styles.guaranteeBox}>
          <FaShieldAlt color="#10b981" />
          <span>7-Day Replacement Guarantee</span>
        </div>
      </div>
    </div>
  );
};

// ... fallbackData aur styles (styles mein kuch changes neeche hain) ...

const styles = {
  // Purane styles as it is rakho, bas inko update/add karo:
  container: { display: 'flex', gap: '60px', padding: '60px 8%', maxWidth: '1300px', margin: '0 auto' },
  leftCol: { flex: '1', minWidth: '400px' },
  rightCol: { flex: '0.8', minWidth: '350px', display: 'flex', flexDirection: 'column', gap: '25px' },
  imgCard: { borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' },
  mainImg: { width: '100%', height: '450px', objectFit: 'cover' },
  
  billCard: { background: '#f8fafc', padding: '25px', borderRadius: '20px', border: '1px solid #e2e8f0' },
  billRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '15px', color: '#475569' },
  totalBox: { marginTop: '15px', paddingTop: '15px', borderTop: '1px dashed #cbd5e1', display: 'flex', justifyContent: 'space-between', fontSize: '1.4rem', fontWeight: '900', color: '#1e293b' },
  refundableInfo: { fontSize: '11px', color: '#94a3b8', marginTop: '10px', fontStyle: 'italic' },
  
  cartBtn: { width: '100%', padding: '20px', background: '#1e293b', color: '#fff', border: 'none', borderRadius: '16px', fontWeight: '800', fontSize: '18px', cursor: 'pointer', transition: '0.3s' },
  guaranteeBox: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '13px', fontWeight: '700', color: '#10b981', background: '#ecfdf5', padding: '12px', borderRadius: '12px' },
  
  // Tenure styles (Wahi jo upar the)
  tenureContainer: { padding: '20px', background: '#fff', borderRadius: '20px', border: '1px solid #e2e8f0' },
  tenureGrid: { display: 'flex', gap: '10px', marginTop: '15px' },
  tenureCard: { flex: 1, padding: '15px 5px', border: '2px solid', borderRadius: '15px', textAlign: 'center', cursor: 'pointer', transition: '0.3s' },
};

export default ProductDetail;