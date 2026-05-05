import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaCalendarAlt, FaUser, FaPhone, FaMapMarkerAlt, FaShieldAlt, FaStar, FaTools, FaTruck, FaUndo, FaInfoCircle } from 'react-icons/fa';

// --- SUB-COMPONENT: TENURE SELECTOR (Included inside for easy copy-paste) ---
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
        <span style={styles.tenureHint}><FaInfoCircle /> Longer tenure, lower rent</span>
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

// --- MAIN COMPONENT ---
const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rentalConfig, setRentalConfig] = useState({ months: 3, currentPrice: 0 });
  const [formData, setFormData] = useState({ fullName: '', phone: '', address: '', startDate: '' });

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://rentease-premium-furniture-appliances-at-4idp.onrender.com/api/products/${id}`);
        setProduct(res.data);
        setRentalConfig({ months: 3, currentPrice: res.data.price });
      } catch (err) {
        const sampleMatch = fallbackData.find(p => String(p._id || p.id) === String(id));
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

  const calculateTotal = () => {
    if (!product) return 0;
    const deposit = Number(product.securityDeposit) || 1000;
    return rentalConfig.currentPrice + deposit;
  };

  const handleConfirm = () => {
    if (!formData.fullName || !formData.phone || !formData.address || !formData.startDate) {
      alert("Bhai, saari details bhariye delivery schedule karne ke liye! 😊");
      return;
    }

    const bookingData = {
      product: { ...product, price: rentalConfig.currentPrice }, // Passing discounted price
      tenure: rentalConfig.months,
      customer: formData,
      summary: { 
        monthlyRent: rentalConfig.currentPrice, 
        deposit: product.securityDeposit, 
        total: calculateTotal() 
      }
    };

    navigate('/payment', { state: bookingData });
  };

  if (loading) return <div style={styles.loader}>Tailoring your rental experience...</div>;
  if (!product) return <div style={styles.errorPage}><h2>Product Not Found</h2><button onClick={()=>navigate('/')}>Back</button></div>;

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
          <div style={styles.benefitItem}><FaUndo color="#007bff"/> <span>Easy Return</span></div>
        </div>
      </div>

      <div style={styles.rightCol}>
        <div style={styles.infoHead}>
          <h1 style={styles.title}>{product.name}</h1>
          <div style={styles.ratingRow}><FaStar color="#ffc107" /><FaStar color="#ffc107" /><FaStar color="#ffc107" /><FaStar color="#ffc107" /><FaStar color="#e4e5e9" /> <span style={styles.reviewCount}>(4.8/5)</span></div>
        </div>

        {/* Dynamic Tenure Selector */}
        <TenureSelector basePrice={product.price} onTenureChange={handleTenureUpdate} />

        <div style={styles.billCard}>
          <h3 style={styles.billTitle}>Price Breakup ({rentalConfig.months} Months)</h3>
          <div style={styles.billRow}><span>Monthly Rent</span><strong>₹{rentalConfig.currentPrice}/mo</strong></div>
          <div style={styles.billRow}><span>Security Deposit</span><strong>₹{product.securityDeposit}</strong></div>
          <div style={styles.totalBox}><span>Amount Payable Now</span><span>₹{calculateTotal()}</span></div>
        </div>

        <div style={styles.formCard}>
          <h3 style={styles.formTitle}>Schedule Delivery</h3>
          <div style={styles.inputRow}>
            <div style={styles.inputBox}><FaUser style={styles.icon}/><input type="text" placeholder="Name" style={styles.input} onChange={(e)=>setFormData({...formData, fullName: e.target.value})} /></div>
            <div style={styles.inputBox}><FaPhone style={styles.icon}/><input type="number" placeholder="Phone" style={styles.input} onChange={(e)=>setFormData({...formData, phone: e.target.value})} /></div>
          </div>
          <div style={styles.inputBox}><FaMapMarkerAlt style={styles.icon}/><textarea placeholder="Address" style={{...styles.input, height:'50px', paddingTop:'12px'}} onChange={(e)=>setFormData({...formData, address: e.target.value})}></textarea></div>
          <div style={styles.dateRow}>
            <div style={{flex:1}}><label style={styles.label}>Delivery Date</label><input type="date" min={today} style={styles.dateInput} onChange={(e)=>setFormData({...formData, startDate: e.target.value})} /></div>
          </div>
          <button style={styles.bookBtn} onClick={handleConfirm}>Reserve Now & Pay</button>
        </div>
      </div>
    </div>
  );
};

const fallbackData = [
  { id: 1, name: 'Queen Size Bed', price: 500, securityDeposit: 2000, image: 'https://images.unsplash.com/photo-1505693419148-ad30b3873857?w=800', category: 'Furniture' },
];

const styles = {
  container: { display: 'flex', gap: '50px', padding: '120px 8% 60px', flexWrap: 'wrap', maxWidth: '1400px', margin: '0 auto' },
  leftCol: { flex: '1.2', minWidth: '350px', position: 'sticky', top: '120px', height: 'fit-content' },
  imgCard: { borderRadius: '32px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', position: 'relative' },
  mainImg: { width: '100%', height: '480px', objectFit: 'cover' },
  categoryBadge: { position: 'absolute', top: '20px', left: '20px', background: '#007bff', color: '#fff', padding: '6px 15px', borderRadius: '50px', fontSize: '11px', fontWeight: 'bold' },
  benefitGrid: { display: 'flex', justifyContent: 'space-between', marginTop: '30px', padding: '20px', background: '#f8fafc', borderRadius: '20px' },
  benefitItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: '700', color: '#475569' },
  rightCol: { flex: '1', minWidth: '350px', display: 'flex', flexDirection: 'column', gap: '20px' },
  title: { fontSize: '2.5rem', fontWeight: '900', color: '#1e293b', margin: 0 },
  ratingRow: { display: 'flex', alignItems: 'center', gap: '5px', marginTop: '10px' },
  reviewCount: { fontSize: '13px', color: '#94a3b8' },
  billCard: { background: '#1e293b', padding: '25px', borderRadius: '24px', color: '#fff' },
  billTitle: { fontSize: '16px', marginBottom: '15px', color: '#94a3b8' },
  billRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '14px' },
  totalBox: { marginTop: '15px', paddingTop: '15px', borderTop: '1px dashed rgba(255,255,255,0.2)', display: 'flex', justifyContent: 'space-between', fontSize: '1.5rem', fontWeight: '900', color: '#10b981' },
  formCard: { background: '#fff', padding: '25px', borderRadius: '24px', border: '1px solid #f1f5f9' },
  formTitle: { fontSize: '18px', fontWeight: '800', marginBottom: '20px' },
  inputRow: { display: 'flex', gap: '15px', marginBottom: '15px' },
  inputBox: { flex: 1, display: 'flex', alignItems: 'center', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '0 15px' },
  icon: { color: '#94a3b8' },
  input: { width: '100%', padding: '12px', border: 'none', background: 'transparent', outline: 'none' },
  dateRow: { margin: '15px 0' },
  label: { fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '5px', display: 'block' },
  dateInput: { width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc' },
  bookBtn: { width: '100%', padding: '18px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '15px', fontWeight: '800', fontSize: '16px', cursor: 'pointer', marginTop: '10px' },
  loader: { height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#007bff' },
  
  // Tenure Styles
  tenureContainer: { margin: '10px 0', padding: '20px', background: '#f8fafc', borderRadius: '20px', border: '1px solid #f1f5f9' },
  tenureHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' },
  tenureTitle: { fontSize: '14px', fontWeight: '800', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' },
  tenureHint: { fontSize: '10px', color: '#94a3b8' },
  tenureGrid: { display: 'flex', gap: '10px' },
  tenureCard: { flex: 1, padding: '15px 5px', border: '2px solid', borderRadius: '15px', textAlign: 'center', cursor: 'pointer', position: 'relative', transition: '0.3s' },
  discountBadge: { position: 'absolute', top: '-8px', right: '-8px', background: '#10b981', color: '#fff', fontSize: '9px', fontWeight: '900', padding: '2px 5px', borderRadius: '4px' },
  monthsText: { fontSize: '14px', fontWeight: '900' },
  priceLabel: { fontSize: '11px', color: '#64748b', marginTop: '5px' }
};

export default ProductDetail;