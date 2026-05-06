import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaTruck, FaTools, FaUndo, FaStar, FaFilter } from 'react-icons/fa';

const Home = ({ addToCart }) => { // Props se addToCart function le rahe hain
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
    document.getElementById('explore-section').scrollIntoView({ behavior: 'smooth' });
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

      {/* 🛡 TRUST BAR */}
      <div style={styles.trustBar}>
        <div style={styles.trustItem}><FaTruck color="#007bff"/> <span>Free Relocation</span></div>
        <div style={styles.trustItem}><FaTools color="#007bff"/> <span>Free Maintenance</span></div>
        <div style={styles.trustItem}><FaUndo color="#007bff"/> <span>Cancel Anytime</span></div>
      </div>

      {/* 🏢 CATEGORIES */}
      <div id="categories" style={styles.sectionPadding}>
        <h2 style={styles.sectionTitle}>Browse our top categories</h2>
        <div style={styles.categoryGrid}>
          {topCategories.map((cat, index) => (
            <div key={index} style={styles.catItem} onClick={() => handleCategoryClick(cat.name)}>
              <div style={{...styles.catIconBox, border: category === cat.name ? '2px solid #007bff' : 'none'}} className="cat-hover">
                <img src={cat.img} alt={cat.name} style={styles.catImg} />
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
            
            {/* Image click par Details page */}
            <div 
              style={styles.imgContainer} 
              onClick={() => navigate(`/product/${product._id || product.id}`)}
            >
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

              {/* Sirf Add to Cart Button */}
              <button 
                onClick={() => addToCart(product)} 
                style={styles.addToCartBtn}
              >
                Add to Cart
              </button>
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
        .cat-hover:hover { transform: scale(1.05); background: #e0f0ff !important; }
      `}</style>
    </div>
  );
};

const topCategories = [
  { name: 'Packages', img: 'https://p.rmjo.in/category_nodes/vvy75bsh-1629881335.png' },
  { name: 'Furniture', img: 'https://p.rmjo.in/category_nodes/x5zst486-1629881358.png' },
  { name: 'Appliances', img: 'https://p.rmjo.in/category_nodes/5v7v6p6e-1629881372.png' },
  { name: 'Electronics', img: 'https://p.rmjo.in/category_nodes/j9q4v2m8-1629881389.png' },
  { name: 'Fitness', img: 'https://p.rmjo.in/category_nodes/h4k19v56-1629881403.png' }
];

const fallbackData = [
  { id: "1", name: "Wooden Dining Table", category: "Furniture", price: 500, securityDeposit: 999, image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=500" }
];

const styles = {
  homeContainer: { background: '#fff' },
  heroSection: { height: '450px', backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center' },
  heroOverlay: { padding: '0 8%' },
  heroTitle: { fontSize: '3rem', color: '#fff', fontWeight: '900' },
  heroSub: { color: '#eee', fontSize: '1.2rem', marginBottom: '25px' },
  heroBtn: { padding: '15px 30px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' },
  
  trustBar: { display: 'flex', justifyContent: 'center', gap: '40px', padding: '25px', background: '#f8fafc', borderBottom: '1px solid #eee' },
  trustItem: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '700', color: '#475569' },

  sectionPadding: { padding: '50px 8% 20px' },
  sectionTitle: { fontSize: '24px', fontWeight: '800', marginBottom: '25px' },
  categoryGrid: { display: 'flex', gap: '20px', overflowX: 'auto' },
  catIconBox: { width: '80px', height: '80px', background: '#f1f5f9', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.3s' },
  catImg: { width: '45px' },
  catName: { fontSize: '12px', fontWeight: '700', textAlign: 'center', display: 'block', marginTop: '8px' },

  exploreHeader: { padding: '30px 8% 0' },
  filterFlex: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  selectWrapper: { position: 'relative' },
  filterIcon: { position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' },
  select: { padding: '10px 15px 10px 35px', borderRadius: '10px', border: '1px solid #e2e8f0', fontWeight: '600' },

  productGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px', padding: '30px 8% 80px' },
  card: { position: 'relative' },
  imgContainer: { height: '200px', overflow: 'hidden', position: 'relative', cursor: 'pointer' },
  img: { width: '100%', height: '100%', objectFit: 'cover' },
  badge: { position: 'absolute', top: '10px', left: '10px', background: '#fff', padding: '4px 10px', borderRadius: '20px', fontSize: '10px', fontWeight: '800' },
  
  details: { padding: '20px' },
  pName: { fontSize: '18px', fontWeight: '800', margin: '0 0 5px' },
  pPrice: { fontSize: '20px', fontWeight: '900', color: '#007bff' },
  depositRow: { display: 'flex', justifyContent: 'space-between', margin: '10px 0 20px', fontSize: '11px', color: '#94a3b8' },
  refundableText: { color: '#10b981', fontWeight: '700' },
  
  addToCartBtn: { width: '100%', padding: '12px', background: '#1e293b', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', transition: '0.3s' },
  loader: { textAlign: 'center', padding: '50px', fontWeight: '700' }
};

export default Home;