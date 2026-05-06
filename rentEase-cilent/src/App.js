import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// --- Global UI Components ---
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// --- Public & User Components ---
import Home from './components/Home';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Login from './components/Login';
import Signup from './components/Signup';
import MyProfile from './components/MyProfile';
import FAQ from './components/FAQ';

// --- Protected User Components ---
import CheckoutForm from './components/CheckoutForm';
import Payment from './components/Payment';
import Success from './components/Success';
import OrderHistory from './components/OrderHistory';
import ReportIssue from './components/ReportIssue';
import Kyc from './components/Kyc'; 
import ReferAndEarn from './components/ReferAndEarn';

// --- Admin Components ---
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './components/AdminDashboard';
import ManageInventory from './components/ManageInventory';
import SetPricing from './components/SetPricing';
import MonitorOrders from './components/MonitorOrders';
import AdminMaintenance from './components/AdminMaintenance';

function App() {
  // --- States Management ---
  // Cart ko localStorage se load kar rahe hain taaki refresh par data na jaye
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('rentEaseCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || 'user');
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');

  // Cart update hote hi localStorage mein save karo
  useEffect(() => {
    localStorage.setItem('rentEaseCart', JSON.stringify(cart));
  }, [cart]);

  // --- Auth Logic ---
  const handleLoginSuccess = (userData) => {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userRole', userData.role || 'user');
    localStorage.setItem('userName', userData.name);
    setIsLoggedIn(true);
    setUserRole(userData.role || 'user');
    setUserName(userData.name);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserRole('user');
    setUserName('');
    setCart([]); // Logout par cart khali
    window.location.href = '/login';
  };

  // --- Cart Logic (Better handling for Tenure & Price) ---
  const addToCart = (product) => {
    const pId = product._id || product.id;
    // Check if item with SAME tenure already exists
    const exists = cart.find((item) => (item._id || item.id) === pId);
    
    if (exists) {
      alert("Item already in cart! Aap cart mein quantity change kar sakte hain.");
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
      // Notification ya alert de sakte ho yahan
    }
  };

  const removeFromCart = (product) => {
    const pId = product._id || product.id;
    setCart(cart.filter((item) => (item._id || item.id) !== pId));
  };

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: "'Plus Jakarta Sans', sans-serif", backgroundColor: '#ffffff' }}>
        
        <Navbar 
          cartCount={cart.length} 
          isLoggedIn={isLoggedIn} 
          userName={userName} 
          userRole={userRole}
          onLogout={handleLogout} 
        />
        
        <main style={{ flex: 1 }}>
          <Routes>
            {/* --- PUBLIC ROUTES --- */}
            <Route path="/" element={<Home addToCart={addToCart} />} />
            <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cartItems={cart} removeFromCart={removeFromCart} />} />
            <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/faq" element={<FAQ />} />
            
            {/* --- PROTECTED USER ROUTES --- */}
            <Route path="/checkout" element={isLoggedIn ? <CheckoutForm cartItems={cart} /> : <Navigate to="/login" />} />
            <Route path="/payment" element={isLoggedIn ? <Payment /> : <Navigate to="/login" />} />
            <Route path="/success" element={isLoggedIn ? <Success /> : <Navigate to="/login" />} />
            <Route path="/orders" element={isLoggedIn ? <OrderHistory /> : <Navigate to="/login" />} />
            <Route path="/profile" element={isLoggedIn ? <MyProfile /> : <Navigate to="/login" />} />
            <Route path="/report-issue" element={isLoggedIn ? <ReportIssue /> : <Navigate to="/login" />} />
            <Route path="/kyc" element={isLoggedIn ? <Kyc /> : <Navigate to="/login" />} />
            <Route path="/refer" element={isLoggedIn ? <ReferAndEarn /> : <Navigate to="/login" />} />

            {/* --- ADMIN SECTION --- */}
            <Route 
              path="/admin" 
              element={(isLoggedIn && userRole === 'admin') ? <AdminLayout /> : <Navigate to="/login" />}
            >
              <Route index element={<AdminDashboard />} /> 
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="inventory" element={<ManageInventory />} />
              <Route path="pricing" element={<SetPricing />} />
              <Route path="orders" element={<MonitorOrders />} />
              <Route path="maintenance" element={<AdminMaintenance />} /> 
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;