import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = ({ addToCart }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('default');
  
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [toast, setToast] = useState({ show: false, message: '' });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('https://rentease-premium-furniture-appliances-at-4idp.onrender.com/api/products');
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

  const handleRentNow = (product) => {
    navigate('/checkout', { 
      state: { 
        product: {
          id: product._id || product.id,
          name: product.name,
          price: product.price,
          deposit: product.securityDeposit || 1500,
          image: product.image
        }
      } 
    });
  };

  return (
    <div style={styles.homeContainer}>
      
      {/* 🚀 RESPONSIVE NAVBAR */}
      <nav style={styles.nav}>
        <div style={styles.navContent}>
          <h2 style={styles.logo} onClick={() => setCategory('All')}>RentEase</h2>
          <div className="nav-links-desktop" style={styles.navLinks}>
            <span style={category === 'Furniture' ? styles.activeLink : styles.link} onClick={() => setCategory('Furniture')}>Furniture</span>
            <span style={category === 'Appliances' ? styles.activeLink : styles.link} onClick={() => setCategory('Appliances')}>Appliances</span>
            <span style={category === 'Electronics' ? styles.activeLink : styles.link} onClick={() => setCategory('Electronics')}>Electronics</span>
          </div>
          <div style={styles.cartIcon} onClick={() => navigate('/cart')}>🛒</div>
        </div>
      </nav>

      {/* Hero Banner - Responsive Height */}
      <div style={styles.heroSection} className="hero-box">
        <div style={styles.heroOverlay}>
          <h1 className="hero-title" style={styles.heroTitle}>Upgrade Your Lifestyle, <span style={{color: '#00d4ff'}}>RentEase</span> Se!</h1>
          <p className="hero-sub" style={styles.heroSub}>Premium Furniture & Appliances at Monthly Prices.</p>
          <button style={styles.heroBtn} onClick={() => window.scrollTo({top: 550, behavior: 'smooth'})}>Explore Now</button>
        </div>
      </div>

      {/* Filter Bar - Responsive Layout */}
      <div className="filter-bar" style={styles.filterBar}>
        <input 
          type="text" 
          placeholder="Search items... 🔍" 
          style={styles.searchInput}
          value={searchTerm}
          className="search-input"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="select-group" style={styles.selectGroup}>
          <select style={styles.select} value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="All">All Categories</option>
            <option value="Furniture">Furniture</option>
            <option value="Appliances">Appliances</option>
            <option value="Electronics">Electronics</option>
          </select>
          <select style={styles.select} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="default">Sort: Featured</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Product Grid - Responsive Columns */}
      <div className="product-grid" style={styles.productGrid}>
        {loading ? (
          <div style={styles.loader}>Loading premium items...</div>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id || product.id} style={styles.card} className="premium-card">
              <div style={styles.imgContainer}>
                <img src={product.image} alt={product.name} style={styles.img} />
                <div style={styles.badge}>{product.category}</div>
              </div>
              <div style={styles.details}>
                <h3 style={styles.pName}>{product.name}</h3>
                <p style={styles.pPrice}>₹{product.price.toLocaleString('en-IN')} <small>/ mo</small></p>
                <p style={styles.depositLabel}>+ ₹{product.securityDeposit?.toLocaleString('en-IN')} Deposit</p>
                <div style={styles.btnGroup}>
                  <button onClick={() => navigate(`/product/${product._id || product.id}`)} style={styles.detailsBtn}>Details</button>
                  <button onClick={() => handleRentNow(product)} style={styles.rentBtn}>Rent Now</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={styles.noData}>No products found.</div>
        )}
      </div>

      {/* 📱 MOBILE FIX - GLOBAL CSS */}
      <style>{`
        .premium-card:hover { transform: translateY(-10px); box-shadow: 0 15px 35px rgba(0,0,0,0.1) !important; }
        
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; } /* Hide links on mobile if needed or stack them */
          .hero-title { font-size: 2.2rem !important; }
          .hero-sub { font-size: 1rem !important; }
          .hero-box { height: 300px !important; }
          
          .filter-bar { 
            flex-direction: column !important; 
            margin: 20px 5% !important; 
            gap: 10px !important;
          }
          .search-input { width: 100% !important; flex: none !important; }
          .select-group { width: 100% !important; flex: none !important; }
          
          .product-grid { 
            grid-template-columns: 1fr !important; /* Single column on mobile */
            padding: 0 5% 50px !important;
          }
          
          .nav-content { padding: 10px 5% !important; }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .product-grid { grid-template-columns: 1fr 1fr !important; } /* Two columns on tablets */
        }
      `}</style>
    </div>
  );
};

const fallbackData = [
  { id: "1", name: "Wooden Dining Table", category: "Furniture", price: 500, securityDeposit: 999, image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=500" },
  { id: "2", name: "Smart T.V.", category: "Electronics", price: 800, securityDeposit: 2000, image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500" },
  { id: "3", name: "Split A.C.", category: "Appliances", price: 1500, securityDeposit: 2500, image: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=500" }
];

const styles = {
  homeContainer: { background: '#f8f9fa', minHeight: '100vh' },
  nav: { background: '#fff', padding: '15px 8%', position: 'sticky', top: 0, zIndex: 1000, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' },
  navContent: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  logo: { color: '#007bff', fontWeight: '900', cursor: 'pointer', margin: 0 },
  navLinks: { display: 'flex', gap: '30px' },
  link: { fontWeight: '600', cursor: 'pointer', color: '#475569', transition: '0.3s' },
  activeLink: { fontWeight: '700', cursor: 'pointer', color: '#007bff', borderBottom: '2px solid #007bff' },
  cartIcon: { fontSize: '20px', cursor: 'pointer' },
  heroSection: { height: '420px', backgroundImage: 'url(https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center' },
  heroOverlay: { background: 'rgba(0,0,0,0.5)', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 8%', color: '#fff' },
  heroTitle: { fontSize: '3.5rem', fontWeight: '900', margin: 0 },
  heroSub: { fontSize: '1.2rem', marginBottom: '25px' },
  heroBtn: { width: '150px', padding: '14px', background: '#007bff', border: 'none', color: '#fff', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer' },
  filterBar: { display: 'flex', gap: '20px', margin: '40px 8%', flexWrap: 'wrap' },
  searchInput: { flex: 2, padding: '14px 22px', borderRadius: '12px', border: '1px solid #ddd', outline: 'none', fontSize: '16px' },
  selectGroup: { display: 'flex', gap: '12px', flex: 1 },
  select: { flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid #ddd', background: '#fff' },
  productGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px', padding: '0 8% 50px' },
  card: { background: '#fff', borderRadius: '25px', overflow: 'hidden', border: '1px solid #f0f0f0' },
  imgContainer: { position: 'relative' },
  img: { width: '100%', height: '230px', objectFit: 'cover' },
  badge: { position: 'absolute', top: '15px', left: '15px', background: '#007bff', color: '#fff', padding: '5px 15px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' },
  details: { padding: '22px' },
  pName: { fontSize: '20px', fontWeight: 'bold', marginBottom: '8px', color: '#333' },
  pPrice: { fontSize: '24px', fontWeight: '900', color: '#28a745', margin: 0 },
  depositLabel: { fontSize: '12px', color: '#64748b', background: '#f1f5f9', padding: '4px 8px', borderRadius: '6px', display: 'inline-block', margin: '10px 0' },
  btnGroup: { display: 'flex', gap: '10px', marginTop: '10px' },
  detailsBtn: { flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid #007bff', color: '#007bff', background: 'none', fontWeight: 'bold', cursor: 'pointer' },
  rentBtn: { flex: 1.5, padding: '12px', borderRadius: '12px', border: 'none', background: '#007bff', color: '#fff', fontWeight: 'bold', cursor: 'pointer' },
  noData: { gridColumn: '1/-1', textAlign: 'center', padding: '50px', color: '#94a3b8' }
};

export default Home;