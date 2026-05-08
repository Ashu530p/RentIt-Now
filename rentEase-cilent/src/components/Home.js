import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaTruck, FaTools, FaUndo, FaStar, FaFilter } from 'react-icons/fa';

// --- FIXED CATEGORIES DATA (Using Reliable Online Icons) ---
const topCategories = [
  { name: 'Packages', img: 'https://cdn-icons-png.flaticon.com/512/679/679922.png' },
  { name: 'Furniture', img: 'https://cdn-icons-png.flaticon.com/512/2590/2590525.png' },
  { name: 'Appliances', img: 'https://cdn-icons-png.flaticon.com/512/3659/3659929.png' },
  { name: 'Electronics', img: 'https://cdn-icons-png.flaticon.com/512/2777/2777142.png' },
  { name: 'Fitness', img: 'https://cdn-icons-png.flaticon.com/512/2964/2964514.png' }
];

const fallbackData = [
  { id: "1", name: "Wooden Dining Table", category: "Furniture", price: 500, securityDeposit: 999, image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=500" }
];

const Home = ({ addToCart }) => {
  const navigate = useNavigate();
  const [category, setCategory] = useState('All');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('https://rentease-premium-furniture-appliances-at-aynp.onrender.com/api/products');
        setProducts(res.data.length > 0 ? res.data : fallbackData);
      } catch (err) {
        setProducts(fallbackData);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let result = [...products];
    if (category !== 'All') {
      result = result.filter(p => p.category === category);
    }
    setFilteredProducts(result);
  }, [category, products]);

  const handleCategoryClick = (catName) => {
    setCategory(catName);
    const exploreSection = document.getElementById('explore-section');
    if (exploreSection) {
      exploreSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={styles.homeContainer}>
      
      {/* 🚀 HERO SECTION */}
      <div style={styles.heroSection}>
        <div style={styles.heroOverlay}>
          <div className="fade-in">
            <h1 style={styles.heroTitle}>Upgrade Your Lifestyle,<br/><span style={{color: '#00d4ff'}}>RentEase</span> Se!</h1>
            <p style={styles.heroSub}>Premium Furniture & Appliances starting from <strong style={{color: '#10b981'}}>₹199/mo</strong>.</p>
            <button style={styles.heroBtn} onClick={() => document.getElementById('categories').scrollIntoView({behavior: 'smooth'})}>
                Browse Collection
            </button>
          </div>
        </div>
      </div>

      {/* 🛡️ TRUST BAR */}
      <div style={styles.trustBar}>
        <div style={styles.trustItem}><FaTruck color="#007bff"/> <span>Free Relocation</span></div>
        <div style={styles.trustItem}><FaTools color="#007bff"/> <span>Free Maintenance</span></div>
        <div style={styles.trustItem}><FaUndo color="#007bff"/> <span>Cancel Anytime</span></div>
      </div>

      {/* 🏢 CATEGORIES SECTION - Fixed Image Loading Logic */}
      <div id="categories" style={styles.sectionPadding}>
        <h2 style={styles.sectionTitle}>Browse our top categories</h2>
        <div style={styles.categoryGrid}>
          {topCategories.map((cat, index) => (
            <div key={index} style={styles.catItem} onClick={() => handleCategoryClick(cat.name)}>
              <div 
                style={{
                    ...styles.catIconBox, 
                    border: category === cat.name ? '2px solid #007bff' : '1px solid #f1f5f9',
                    background: category === cat.name ? '#e0f0ff' : '#ffffff'
                }} 
                className="cat-hover"
              >
                <img 
                  src={cat.img} 
                  alt={cat.name} 
                  style={styles.catImg} 
                  onError={(e) => { 
                    e.target.style.display = 'none'; 
                    e.target.parentNode.innerHTML = '<span style="font-size:24px">📦</span>';
                  }}
                />
              </div>
              <span style={styles.catName}>{cat.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 🔍 EXPLORE HEADER */}
      <div id="explore-section" style={styles.exploreHeader}>
        <div style={styles.filterFlex}>
            <h2 style={styles.sectionTitle}>{category === 'All' ? 'Latest & Trending' : `${category} Collection`}</h2>
            <div style={styles.selectWrapper}>
                <FaFilter style={styles.filterIcon}/>
                <select style={styles.select} value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="All">All Categories</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Appliances">Appliances</option>
                    <option value="Electronics">Electronics</option>
                </select>
            </div>
        </div>
      </div>

      {/* 📦 PRODUCT GRID */}
      <div style={styles.productGrid}>
        {loading ? (
          <div style={styles.loader}>Curating your collection...</div>
        ) : filteredProducts.map((product) => (
          <div key={product._id || product.id} style={styles.card} className="premium-card">
            <div style={styles.imgContainer} onClick={() => navigate(`/product/${product._id || product.id}`)}>
              <img src={product.image} alt={product.name} style={styles.img} />
              <div style={styles.badge}>{product.category}</div>
              <div className="view-details-overlay">Click for Details</div>
            </div>
            <div style={styles.details}>
              <div style={styles.pHeader}>
                  <h3 style={styles.pName}>{product.name}</h3>
                  <div style={styles.rating}><FaStar color="#ffc107"/> 4.8</div>
              </div>
              <p style={styles.pPrice}>₹{product.price.toLocaleString('en-IN')} <small>/ mo</small></p>
              <div style={styles.depositRow}>
                  <span style={styles.depositLabel}>Deposit: ₹{product.securityDeposit?.toLocaleString('en-IN')}</span>
                  <span style={styles.refundableText}>Refundable</span>
              </div>
              <button onClick={() => addToCart(product)} style={styles.addToCartBtn}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .premium-card { transition: 0.3s; background: #fff; border-radius: 24px; overflow: hidden; border: 1px solid #f1f5f9; }
        .premium-card:hover { transform: translateY(-8px); box-shadow: 0 12px 24px rgba(0,0,0,0.06); }
        .view-details-overlay { 
            position: absolute; top: 0; left: 0; width: 100%; height: 100%; 
            background: rgba(0,0,0,0.2); color: #fff; display: flex; 
            justify-content: center; align-items: center; opacity: 0; 
            transition: 0.3s; font-weight: 700; font-size: 14px;
        }
        .imgContainer:hover .view-details-overlay { opacity: 1; }
        .cat-hover { cursor: pointer; transition: 0.3s; }
        .cat-hover:hover { transform: scale(1.05); }
        .fade-in { animation: fadeIn 0.8s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

const styles = {
  homeContainer: { background: '#fff', minHeight: '100vh' },
  heroSection: { height: '500px', backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center' },
  heroOverlay: { padding: '0 8%', maxWidth: '800px' },
  heroTitle: { fontSize: '3.5rem', color: '#fff', fontWeight: '900', margin: 0, lineHeight: '1.2' },
  heroSub: { color: '#eee', fontSize: '1.2rem', margin: '20px 0 35px' },
  heroBtn: { padding: '15px 35px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', transition: '0.3s' },
  trustBar: { display: 'flex', justifyContent: 'center', gap: '50px', padding: '30px', background: '#f8fafc', borderBottom: '1px solid #f1f5f9' },
  trustItem: { display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', fontWeight: '700', color: '#475569' },
  sectionPadding: { padding: '60px 8% 20px' },
  sectionTitle: { fontSize: '28px', fontWeight: '800', marginBottom: '30px', color: '#1e293b' },
  categoryGrid: { display: 'flex', gap: '30px', overflowX: 'auto', paddingBottom: '10px', scrollbarWidth: 'none' },
  catItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '100px' },
  catIconBox: { width: '85px', height: '85px', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.3s', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' },
  catImg: { width: '45px', height: '45px', objectFit: 'contain' },
  catName: { fontSize: '13px', fontWeight: '700', textAlign: 'center', display: 'block', marginTop: '10px', color: '#475569' },
  exploreHeader: { padding: '40px 8% 0' },
  filterFlex: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  selectWrapper: { position: 'relative' },
  filterIcon: { position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' },
  select: { padding: '12px 20px 12px 40px', borderRadius: '12px', border: '1px solid #e2e8f0', fontWeight: '600', background: '#fff', cursor: 'pointer' },
  productGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px', padding: '40px 8% 100px' },
  card: { position: 'relative' },
  imgContainer: { height: '220px', overflow: 'hidden', position: 'relative', cursor: 'pointer' },
  img: { width: '100%', height: '100%', objectFit: 'cover' },
  badge: { position: 'absolute', top: '15px', left: '15px', background: '#fff', padding: '5px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '800', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' },
  details: { padding: '25px' },
  pHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  pName: { fontSize: '20px', fontWeight: '800', margin: '0 0 8px', color: '#1e293b' },
  pPrice: { fontSize: '24px', fontWeight: '900', color: '#007bff' },
  rating: { display: 'flex', alignItems: 'center', gap: '5px', fontSize: '14px', fontWeight: '700' },
  depositRow: { display: 'flex', justifyContent: 'space-between', margin: '15px 0 25px', fontSize: '12px', color: '#94a3b8' },
  refundableText: { color: '#10b981', fontWeight: '700' },
  addToCartBtn: { width: '100%', padding: '15px', background: '#1e293b', color: '#fff', border: 'none', borderRadius: '14px', fontWeight: '700', cursor: 'pointer', transition: '0.3s' },
  loader: { textAlign: 'center', padding: '100px', fontWeight: '700', fontSize: '20px', color: '#007bff' }
};

export default Home;