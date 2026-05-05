import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaTruck, FaTools, FaUndo, FaStar, FaSearch, FaFilter } from 'react-icons/fa';

const Home = ({ addToCart }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('default');
  
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://https://rentease-premium-furniture-appliances-at-aynp.onrender.com/api/products');
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
    if (searchTerm) {
      result = result.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (category !== 'All') {
      result = result.filter(p => p.category === category);
    }
    if (sortOrder === 'lowToHigh') result.sort((a, b) => a.price - b.price);
    else if (sortOrder === 'highToLow') result.sort((a, b) => b.price - a.price);
    
    setFilteredProducts(result);
  }, [searchTerm, category, sortOrder, products]);

  const handleCategoryClick = (catName) => {
    setCategory(catName);
    document.getElementById('explore-section').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={styles.homeContainer}>
      
      {/* 🚀 PREMIUM HERO SECTION */}
      <div style={styles.heroSection}>
        <div style={styles.heroOverlay}>
          <div className="fade-in">
            <h1 style={styles.heroTitle}>Upgrade Your Lifestyle,<br/><span style={{color: '#00d4ff'}}>RentEase</span> Se!</h1>
            <p style={styles.heroSub}>Premium Furniture & Appliances starting from <strong style={{color: '#10b981'}}>₹199/mo</strong>.</p>
            <div style={styles.heroBtnGroup}>
              <button style={styles.heroBtn} onClick={() => document.getElementById('categories').scrollIntoView({behavior: 'smooth'})}>
                Browse Collection
              </button>
              <div style={styles.offerBadge}>🎁 20% OFF on first month</div>
            </div>
          </div>
        </div>
      </div>

      {/* 🏢 BROWSE TOP CATEGORIES */}
      <div id="categories" style={styles.sectionPadding}>
        <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Browse our top categories</h2>
            <p style={styles.sectionSub}>Pick a category and see the best deals in your city.</p>
        </div>
        <div style={styles.categoryGrid}>
          {topCategories.map((cat, index) => (
            <div key={index} style={styles.catItem} onClick={() => handleCategoryClick(cat.name)}>
              <div style={styles.catIconBox} className="cat-hover">
                <img src={cat.img} alt={cat.name} style={styles.catImg} />
              </div>
              <span style={styles.catName}>{cat.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 🛡 TRUST BAR (Sleek Design) */}
      <div style={styles.trustBar}>
        <div style={styles.trustItem}><FaTruck color="#007bff"/> <span>Free Relocation</span></div>
        <div style={styles.trustItem}><FaTools color="#007bff"/> <span>Free Maintenance</span></div>
        <div style={styles.trustItem}><FaUndo color="#007bff"/> <span>Mint Condition</span></div>
      </div>

      {/* 🔍 FILTER & EXPLORE SECTION */}
      <div id="explore-section" style={styles.exploreHeader}>
        <div style={styles.filterFlex}>
            <h2 style={styles.sectionTitle}>Latest & Trending</h2>
            <div style={styles.filterGroup}>
                <div style={styles.searchWrapper}>
                    <FaSearch style={styles.searchIcon}/>
                    <input 
                        type="text" 
                        placeholder="Search items..." 
                        style={styles.searchInput}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
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
      </div>

      {/* PRODUCT GRID */}
      <div style={styles.productGrid}>
        {loading ? (
          <div style={styles.loader}>Curating your collection...</div>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id || product.id} style={styles.card} className="premium-card">
              <div style={styles.imgContainer}>
                <img src={product.image} alt={product.name} style={styles.img} />
                <div style={styles.badge}>{product.category}</div>
                <div style={styles.discountTag}>Up to 50% Off</div>
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
                <div style={styles.btnGroup}>
                  <button onClick={() => navigate(`/product/${product._id || product.id}`)} style={styles.detailsBtn}>Details</button>
                  <button onClick={() => navigate(`/product/${product._id || product.id}`)} style={styles.rentBtn}>Rent Now</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={styles.noData}>No items found in this category.</div>
        )}
      </div>

      <style>{`
        .premium-card { transition: all 0.3s ease; cursor: pointer; }
        .premium-card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(0,0,0,0.08) !important; }
        .cat-hover:hover { background: #007bff !important; transform: scale(1.05); }
        .cat-hover:hover img { filter: brightness(0) invert(1); }
        .fade-in { animation: fadeIn 0.8s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
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
  { id: "1", name: "Wooden Dining Table", category: "Furniture", price: 500, securityDeposit: 999, image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=500" },
  { id: "2", name: "Smart T.V.", category: "Electronics", price: 800, securityDeposit: 2000, image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500" },
  { id: "3", name: "Split A.C.", category: "Appliances", price: 1500, securityDeposit: 2500, image: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=500" }
];

const styles = {
  homeContainer: { background: '#fff', minHeight: '100vh' },
  heroSection: { height: '580px', backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.6), rgba(15, 23, 42, 0.3)), url(https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center' },
  heroOverlay: { padding: '0 8%', maxWidth: '800px' },
  heroTitle: { fontSize: '4.2rem', fontWeight: '900', color: '#fff', margin: 0, lineHeight: '1.1', letterSpacing: '-2px' },
  heroSub: { fontSize: '1.4rem', color: '#f1f5f9', margin: '20px 0 35px' },
  heroBtnGroup: { display: 'flex', alignItems: 'center', gap: '20px' },
  heroBtn: { padding: '18px 45px', background: '#007bff', border: 'none', color: '#fff', borderRadius: '16px', fontWeight: '800', cursor: 'pointer', fontSize: '16px', transition: '0.3s' },
  offerBadge: { background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', padding: '10px 15px', borderRadius: '10px', fontSize: '13px', fontWeight: '700', border: '1px solid #10b981' },

  sectionPadding: { padding: '80px 8% 40px' },
  sectionHeader: { marginBottom: '40px' },
  sectionTitle: { fontSize: '28px', fontWeight: '900', color: '#1e293b', margin: 0 },
  sectionSub: { fontSize: '15px', color: '#64748b', marginTop: '5px' },
  
  categoryGrid: { display: 'flex', gap: '40px', overflowX: 'auto', paddingBottom: '20px', scrollbarWidth: 'none' },
  catItem: { textAlign: 'center', cursor: 'pointer', minWidth: '100px' },
  catIconBox: { width: '90px', height: '90px', background: '#f1f5f9', borderRadius: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', transition: '0.4s' },
  catImg: { width: '55px', transition: '0.3s' },
  catName: { fontSize: '14px', fontWeight: '700', color: '#475569' },

  trustBar: { display: 'flex', justifyContent: 'space-around', background: '#f8fafc', padding: '40px 8%', margin: '40px 0', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9' },
  trustItem: { fontWeight: '800', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' },

  exploreHeader: { padding: '40px 8% 0' },
  filterFlex: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '20px', flexWrap: 'wrap' },
  filterGroup: { display: 'flex', gap: '15px', flex: 1, maxWidth: '600px' },
  searchWrapper: { position: 'relative', flex: 2 },
  searchIcon: { position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' },
  searchInput: { width: '100%', padding: '14px 15px 14px 45px', borderRadius: '14px', border: '2px solid #f1f5f9', outline: 'none', background: '#f8fafc', boxSizing: 'border-box' },
  selectWrapper: { position: 'relative', flex: 1 },
  filterIcon: { position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' },
  select: { width: '100%', padding: '14px 15px 14px 40px', borderRadius: '14px', border: '2px solid #f1f5f9', background: '#f8fafc', outline: 'none', fontWeight: '700', color: '#475569', cursor: 'pointer', appearance: 'none' },

  productGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '35px', padding: '40px 8% 100px' },
  card: { background: '#fff', borderRadius: '32px', overflow: 'hidden', border: '1px solid #f1f5f9', position: 'relative' },
  imgContainer: { position: 'relative', height: '260px', overflow: 'hidden' },
  img: { width: '100%', height: '100%', objectFit: 'cover' },
  badge: { position: 'absolute', top: '15px', left: '15px', background: '#fff', color: '#1e293b', padding: '6px 14px', borderRadius: '50px', fontSize: '11px', fontWeight: '800', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' },
  discountTag: { position: 'absolute', bottom: '15px', right: '15px', background: '#ef4444', color: '#fff', padding: '5px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: '900' },
  
  details: { padding: '25px' },
  pHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' },
  pName: { fontSize: '20px', fontWeight: '800', color: '#1e293b', margin: 0 },
  rating: { fontSize: '13px', fontWeight: '700', color: '#1e293b', background: '#f1f5f9', padding: '3px 10px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '5px' },
  
  pPrice: { fontSize: '24px', fontWeight: '900', color: '#0f172a', margin: 0 },
  depositRow: { display: 'flex', justifyContent: 'space-between', margin: '15px 0 25px' },
  depositLabel: { fontSize: '12px', fontWeight: '600', color: '#94a3b8' },
  refundableText: { fontSize: '11px', fontWeight: '800', color: '#10b981', textTransform: 'uppercase' },
  
  btnGroup: { display: 'flex', gap: '15px' },
  detailsBtn: { flex: 1, padding: '15px', borderRadius: '16px', border: '2px solid #f1f5f9', background: 'none', fontWeight: '800', cursor: 'pointer', transition: '0.3s', fontSize: '14px' },
  rentBtn: { flex: 1.5, padding: '15px', borderRadius: '16px', border: 'none', background: '#1e293b', color: '#fff', fontWeight: '800', cursor: 'pointer', transition: '0.3s', fontSize: '14px' },
  
  loader: { textAlign: 'center', padding: '100px 0', fontSize: '18px', fontWeight: '700', color: '#007bff' }
};

export default Home;