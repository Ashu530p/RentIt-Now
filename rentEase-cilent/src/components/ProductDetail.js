import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaCalendarAlt, FaUser, FaPhone, FaMapMarkerAlt, FaShieldAlt } from 'react-icons/fa';

const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '', phone: '', address: '', startDate: '', endDate: ''
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Step 1: Try Backend
        const res = await axios.get(`https://rentease-premium-furniture-appliances-at-4idp.onrender.com/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Backend Error, checking local data...");
        // Step 2: Fallback to Sample Data if Backend fails
        const sampleMatch = fallbackData.find(p => String(p._id || p.id) === String(id));
        setProduct(sampleMatch);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const calculateRent = () => {
    if (!formData.startDate || !formData.endDate || !product) {
      return { days: 0, rent: 0, total: 0, deposit: product?.securityDeposit || 1000 };
    }
    
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    if (end <= start) return { days: 0, rent: 0, total: 0, deposit: product.securityDeposit };

    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const rentPerDay = (product.price || 0) / 30; 
    const totalRent = Math.round(rentPerDay * diffDays);
    const deposit = Number(product.securityDeposit) || 1000;

    return { days: diffDays, rent: totalRent, total: totalRent + deposit, deposit };
  };

  const { days, rent, total, deposit } = calculateRent();

  const handleConfirm = () => {
    if (!formData.fullName || !formData.phone || !formData.address || !formData.startDate || !formData.endDate) {
      alert("Bhai, please saari details bhariye taaki hum delivery schedule kar sakein! 😊");
      return;
    }

    const bookingData = {
      product,
      customer: formData,
      summary: { days, rent, deposit, total: total || (product.price + deposit) }
    };

    // State pass karke payment page par bhejna
    navigate('/payment', { state: bookingData });
  };

  if (loading) return <div style={styles.loader}>Optimizing product details...</div>;
  if (!product) return (
    <div style={styles.errorPage}>
      <h2>Product Not Found 🔍</h2>
      <button style={styles.backBtn} onClick={()=>navigate('/')}>Return to Store</button>
    </div>
  );

  return (
    <div style={styles.container}>
      {/* Left: Image Section */}
      <div style={styles.leftCol}>
        <div style={styles.imgWrapper}>
          <img 
            src={product.image} 
            alt={product.name} 
            style={styles.mainImg} 
            onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800'}
          />
          <div style={styles.categoryBadge}>{product.category}</div>
        </div>
      </div>

      {/* Right: Info & Form Section */}
      <div style={styles.rightCol}>
        <h1 style={styles.title}>{product.name}</h1>
        
        <div style={styles.priceCard}>
          <div style={styles.priceRow}>
            <span>Monthly Rent</span>
            <span style={styles.amount}>₹{product.price}</span>
          </div>
          <div style={styles.priceRow}>
            <span>Refundable Deposit <FaShieldAlt color="#10b981" size={14}/></span>
            <span style={styles.amount}>₹{deposit}</span>
          </div>
          {days > 0 && (
            <div style={{...styles.priceRow, color: '#3b82f6', fontWeight: 'bold'}}>
              <span>Tenure ({days} days)</span>
              <span>₹{rent}</span>
            </div>
          )}
          <hr style={styles.hr}/>
          <div style={styles.totalRow}>
            <span>Total Payable</span>
            <span>₹{total > 0 ? total : (Number(product.price) + Number(deposit))}</span>
          </div>
        </div>

        <div style={styles.formSection}>
          <h3 style={styles.formTitle}>Schedule Your Rental</h3>
          
          <div style={styles.inputBox}>
            <FaUser style={styles.icon}/>
            <input type="text" placeholder="Full Name" style={styles.input} 
              onChange={(e)=>setFormData({...formData, fullName: e.target.value})} />
          </div>
          
          <div style={styles.inputBox}>
            <FaPhone style={styles.icon}/>
            <input type="number" placeholder="Contact Number" style={styles.input} 
              onChange={(e)=>setFormData({...formData, phone: e.target.value})} />
          </div>

          <div style={styles.inputBox}>
            <FaMapMarkerAlt style={{...styles.icon, alignSelf: 'flex-start', marginTop: '12px'}}/>
            <textarea placeholder="Complete Delivery Address" style={{...styles.input, height:'60px', paddingTop:'10px'}} 
              onChange={(e)=>setFormData({...formData, address: e.target.value})}></textarea>
          </div>

          <div style={styles.dateRow}>
            <div style={{flex:1}}>
              <label style={styles.dateLabel}><FaCalendarAlt/> Start Date</label>
              <input type="date" style={styles.input} onChange={(e)=>setFormData({...formData, startDate: e.target.value})} />
            </div>
            <div style={{flex:1}}>
              <label style={styles.dateLabel}><FaCalendarAlt/> End Date</label>
              <input type="date" style={styles.input} onChange={(e)=>setFormData({...formData, endDate: e.target.value})} />
            </div>
          </div>

          <button style={styles.confirmBtn} onClick={handleConfirm}>
            Proceed to Secure Payment
          </button>
        </div>
      </div>
    </div>
  );
};

// Fallback Data in case DB is empty
const fallbackData = [
  { id: 1, name: 'Queen Size Bed', price: 500, securityDeposit: 2000, image: 'https://images.unsplash.com/photo-1505693419148-ad30b3873857?w=500', category: 'Furniture' },
  { id: 2, name: 'Washing Machine', price: 1200, securityDeposit: 3000, image: 'https://images.unsplash.com/photo-1582733775062-eb3e1ad0dde7?w=500', category: 'Appliances' },
];

const styles = {
  container: { display: 'flex', padding: '100px 8% 60px', maxWidth: '1300px', margin: '0 auto', gap: '60px', flexWrap: 'wrap', background: '#fff' },
  leftCol: { flex: '1.3', minWidth: '350px' },
  imgWrapper: { position: 'relative', borderRadius: '30px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)' },
  mainImg: { width: '100%', height: '550px', objectFit: 'cover' },
  categoryBadge: { position: 'absolute', top: '20px', left: '20px', background: '#007bff', color: '#fff', padding: '6px 18px', borderRadius: '30px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase' },
  rightCol: { flex: '1', minWidth: '350px', display: 'flex', flexDirection: 'column', gap: '25px' },
  title: { fontSize: '2.8rem', fontWeight: '900', color: '#0f172a', margin: '0' },
  priceCard: { padding: '25px', background: '#f8fafc', borderRadius: '20px', border: '1px solid #e2e8f0' },
  priceRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: '#64748b', fontSize: '15px' },
  amount: { color: '#1e293b', fontWeight: '700' },
  totalRow: { display: 'flex', justifyContent: 'space-between', fontSize: '1.8rem', fontWeight: '900', color: '#10b981' },
  hr: { border: 'none', borderTop: '1px solid #cbd5e1', margin: '15px 0' },
  formSection: { background: '#fff', padding: '30px', borderRadius: '24px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' },
  formTitle: { fontSize: '18px', fontWeight: '800', marginBottom: '20px', color: '#1e293b' },
  inputBox: { display: 'flex', alignItems: 'center', background: '#f8fafc', borderRadius: '12px', marginBottom: '15px', border: '1px solid #e2e8f0', padding: '0 15px' },
  icon: { color: '#94a3b8', fontSize: '18px' },
  input: { width: '100%', padding: '14px', border: 'none', background: 'transparent', outline: 'none', fontSize: '15px', color: '#334155' },
  dateRow: { display: 'flex', gap: '15px', marginBottom: '20px' },
  dateLabel: { fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '5px', display: 'block' },
  confirmBtn: { width: '100%', padding: '18px', background: '#1e293b', color: '#fff', border: 'none', borderRadius: '15px', fontWeight: '800', fontSize: '16px', cursor: 'pointer', transition: '0.3s', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' },
  loader: { textAlign: 'center', padding: '150px', fontSize: '1.5rem', fontWeight: 'bold', color: '#64748b' },
  errorPage: { textAlign: 'center', padding: '150px' }
};

export default ProductDetail;