import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaTruck, FaMapMarkerAlt, FaCalendarAlt, FaCreditCard, FaBuilding, FaInfoCircle } from 'react-icons/fa';

const CheckoutForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    fullName: state?.customer?.fullName || '',
    phone: state?.customer?.phone || '',
    address: state?.customer?.address || '',
    landmark: '',
    pincode: '',
    startDate: state?.customer?.startDate || '',
    endDate: state?.customer?.endDate || '',
  });

  const [days, setDays] = useState(0);
  const [calculatedRent, setCalculatedRent] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  
  const securityDeposit = state?.summary?.deposit || state?.product?.deposit || 1500;
  const productPrice = state?.product?.price || state?.product?.rentPrice || 1000;

  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      
      if (end > start) {
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setDays(diffDays);

        const perDayRate = productPrice / 30;
        const rentAmount = Math.round(perDayRate * diffDays);
        
        setCalculatedRent(rentAmount);
        setTotalPrice(rentAmount + securityDeposit);
      } else {
        setDays(0);
        setCalculatedRent(0);
        setTotalPrice(securityDeposit);
      }
    }
  }, [formData.startDate, formData.endDate, productPrice, securityDeposit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.phone.length !== 10) {
      alert("Mobile number pure 10 digit ka hona chahiye!");
      return;
    }
    navigate('/payment', { 
      state: { 
        ...state, 
        shipping: formData, 
        summary: { days, rent: calculatedRent, deposit: securityDeposit, total: totalPrice } 
      } 
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.formCard}>
        {/* Step Indicator like RentoMojo */}
        <div style={styles.stepHeader}>
            <div style={styles.stepItemActive}>1. Review</div>
            <div style={styles.stepLine}></div>
            <div style={styles.stepItemActive}>2. Delivery</div>
            <div style={styles.stepLine}></div>
            <div style={styles.stepItem}>3. Payment</div>
        </div>

        <h2 style={styles.title}><FaTruck style={{marginRight:'12px', color:'#007bff'}}/> Delivery Details</h2>
        
        <form onSubmit={handleSubmit}>
          {/* User Info Section */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input type="text" placeholder="Enter your full name" value={formData.fullName} style={styles.input} required onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
          </div>

          <div style={styles.row}>
            <div style={{flex: 1}}>
              <label style={styles.label}>Phone Number</label>
              <input type="text" value={formData.phone} style={styles.input} placeholder="10-digit number" required onChange={(e) => setFormData({...formData, phone: e.target.value.replace(/\D/g, "").slice(0, 10)})} />
            </div>
            <div style={{flex: 1}}>
              <label style={styles.label}>Pincode</label>
              <input type="text" maxLength="6" placeholder="6-digit" style={styles.input} required onChange={(e) => setFormData({...formData, pincode: e.target.value.replace(/\D/g, "")})} />
            </div>
          </div>
          
          {/* Address Section with Progress Bar */}
          <div style={{marginTop: '15px'}}>
            <label style={styles.label}><FaMapMarkerAlt style={{marginRight: '5px'}}/> Detailed Address*</label>
            <textarea 
              value={formData.address} 
              placeholder="Flat/House No, Building, Street and Area..."
              style={{...styles.input, height: '90px', resize: 'none'}} 
              required 
              onChange={(e) => e.target.value.length <= 150 && setFormData({...formData, address: e.target.value})} 
            />
            <div style={styles.charCounter}>
                <div style={{...styles.charBar, width: `${(formData.address.length/150)*100}%`, background: formData.address.length > 130 ? '#ef4444' : '#007bff'}}></div>
                <span>{formData.address.length}/150 Characters</span>
            </div>
          </div>

          {/* Schedule Section */}
          <div style={{...styles.row, marginTop: '20px'}}>
            <div style={{flex: 1}}>
              <label style={styles.label}><FaCalendarAlt/> Start Date</label>
              <input type="date" value={formData.startDate} min={today} style={styles.input} required onChange={(e) => setFormData({...formData, startDate: e.target.value, endDate: ''})} />
            </div>
            <div style={{flex: 1}}>
              <label style={styles.label}><FaCalendarAlt/> End Date</label>
              <input type="date" value={formData.endDate} min={formData.startDate || today} disabled={!formData.startDate} style={{...styles.input, opacity: !formData.startDate ? 0.5 : 1}} required onChange={(e) => setFormData({...formData, endDate: e.target.value})} />
            </div>
          </div>

          {/* Pricing Summary (RentoMojo Style) */}
          <div style={styles.summaryBox}>
             <div style={styles.summaryHeader}>
                 <h4 style={{margin:0, color:'#1e293b'}}>Price Summary</h4>
                 <span style={styles.tenureBadge}>{days} Days Tenure</span>
             </div>
             
             <div style={styles.summaryContent}>
                <div style={styles.summaryRow}>
                    <span>Monthly Rent</span>
                    <span>₹{productPrice} / mo</span>
                </div>
                <div style={styles.summaryRow}>
                    <span>Calculated Rent ({days} days)</span>
                    <span>₹{calculatedRent}</span>
                </div>
                <div style={styles.summaryRow}>
                    <span>Refundable Deposit <FaInfoCircle style={styles.infoIcon} title="Deposit is 100% refundable after return"/></span>
                    <span>₹{securityDeposit}</span>
                </div>
                <div style={styles.totalRow}>
                    <span>Total Amount Payable</span>
                    <span>₹{totalPrice}</span>
                </div>
             </div>
          </div>

          <button type="submit" style={styles.btn} className="checkout-btn">
            Proceed to Payment <i className="fa fa-arrow-right" style={{marginLeft:'10px'}}></i>
          </button>
        </form>
      </div>

      <style>{`
        .checkout-btn:hover { background: #007bff !important; transform: translateY(-2px); box-shadow: 0 10px 20px rgba(0,123,255,0.2) !important; }
        input:focus, textarea:focus { border-color: #007bff !important; background: #fff !important; box-shadow: 0 0 0 4px rgba(0,123,255,0.05); }
      `}</style>
    </div>
  );
};

const styles = {
  container: { padding: '60px 20px', background: '#f8fafc', minHeight: '100vh', display: 'flex', justifyContent: 'center' },
  formCard: { background: '#fff', padding: '40px', borderRadius: '25px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', width: '100%', maxWidth: '650px' },
  
  stepHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' },
  stepItemActive: { fontSize: '13px', fontWeight: '700', color: '#007bff' },
  stepItem: { fontSize: '13px', fontWeight: '600', color: '#94a3b8' },
  stepLine: { flex: 1, height: '2px', background: '#f1f5f9', margin: '0 15px' },

  title: { marginBottom: '30px', color: '#1e293b', fontWeight: '800', fontSize: '26px', display: 'flex', alignItems: 'center' },
  inputGroup: { marginBottom: '15px' },
  row: { display: 'flex', gap: '20px' },
  label: { fontSize: '12px', color: '#64748b', fontWeight: '700', marginBottom: '8px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' },
  input: { width: '100%', padding: '14px 18px', borderRadius: '12px', border: '2px solid #f1f5f9', fontSize: '15px', outline: 'none', transition: '0.3s', boxSizing: 'border-box' },
  
  charCounter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', fontSize: '11px', color: '#94a3b8' },
  charBar: { height: '3px', borderRadius: '10px', transition: '0.3s' },

  summaryBox: { background: '#f8fafc', padding: '25px', borderRadius: '20px', margin: '35px 0', border: '1px solid #f1f5f9' },
  summaryHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '15px', borderBottom: '1px solid #edf2f7' },
  tenureBadge: { background: '#e0f2fe', color: '#0369a1', padding: '4px 12px', borderRadius: '50px', fontSize: '11px', fontWeight: '800' },
  summaryRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px', color: '#475569', fontWeight: '500' },
  infoIcon: { fontSize: '12px', color: '#94a3b8', cursor: 'pointer' },
  totalRow: { display: 'flex', justifyContent: 'space-between', marginTop: '15px', paddingTop: '15px', borderTop: '2px dashed #e2e8f0', fontSize: '18px', fontWeight: '800', color: '#1e293b' },
  
  btn: { width: '100%', padding: '18px', background: '#1e293b', color: '#fff', border: 'none', borderRadius: '14px', fontWeight: '700', cursor: 'pointer', fontSize: '16px', transition: '0.3s' }
};

export default CheckoutForm;