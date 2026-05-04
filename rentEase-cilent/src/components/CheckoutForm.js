import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaTruck, FaMapMarkerAlt, FaCalendarAlt, FaCreditCard, FaBuilding } from 'react-icons/fa';

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
  
  // Security Deposit fix
  const securityDeposit = state?.summary?.deposit || state?.product?.deposit || 1500;

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); 
    if (value.length <= 10) setFormData({ ...formData, phone: value });
  };

  const handleAddressChange = (e) => {
    const value = e.target.value;
    if (value.length <= 150) setFormData({ ...formData, address: value });
  };

  const handleStartDateChange = (e) => {
    const newStart = e.target.value;
    let updatedEnd = formData.endDate;
    if (formData.endDate && new Date(newStart) >= new Date(formData.endDate)) {
      updatedEnd = "";
    }
    setFormData({ ...formData, startDate: newStart, endDate: updatedEnd });
  };

  // --- RENT CALCULATION FIX ---
  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      
      if (end > start) {
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setDays(diffDays);

        // YAHAN FIX HAI: Sabhi possible names check honge
        const productPrice = 
          state?.product?.price || 
          state?.product?.rentPrice || 
          state?.product?.monthlyPrice || 
          state?.product?.rent || 
          1000; // Fallback: Agar kuch na mile toh 1000 maan lega (Testing ke liye)
        
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
  }, [formData.startDate, formData.endDate, state?.product, securityDeposit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.phone.length !== 10) {
      alert("Bhai, mobile number pure 10 digit ka hona chahiye!");
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
        <div style={styles.badge}>Step 2: Shipping & Schedule</div>
        <h2 style={styles.title}><FaTruck style={{marginRight:'10px', color:'#007bff'}}/> Delivery Details</h2>
        
        <form onSubmit={handleSubmit}>
          <div style={styles.row}>
            <div style={{flex: 1}}>
              <label style={styles.label}>Full Name</label>
              <input type="text" value={formData.fullName} style={styles.input} required onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
            </div>
            <div style={{flex: 1}}>
              <label style={styles.label}>Mobile Number</label>
              <input type="text" value={formData.phone} style={styles.input} placeholder="10-digit number" required onChange={handlePhoneChange} />
            </div>
          </div>
          
          <div style={{marginTop: '10px', position: 'relative'}}>
            <label style={styles.label}><FaMapMarkerAlt/> Complete Address (Flat, Street, Area)*</label>
            <textarea 
              value={formData.address} 
              placeholder="House No, Building Name, Street Name, Area..."
              style={{...styles.input, height: '80px', paddingTop:'12px', borderColor: formData.address.length >= 140 ? '#ef4444' : '#e2e8f0'}} 
              required 
              onChange={handleAddressChange} 
            />
            <div style={{textAlign: 'right', fontSize: '11px', color: formData.address.length >= 140 ? '#ef4444' : '#64748b', marginTop: '-5px', fontWeight: '600'}}>
              {formData.address.length} / 150
            </div>
          </div>

          <div style={styles.row}>
             <div style={{flex: 1}}>
              <label style={styles.label}><FaBuilding/> Landmark (Optional)</label>
              <input type="text" placeholder="e.g. Near Apollo Hospital" style={styles.input} onChange={(e) => setFormData({...formData, landmark: e.target.value})} />
            </div>
            <div style={{flex: 1}}>
              <label style={styles.label}>Pincode</label>
              <input type="text" maxLength="6" placeholder="6-digit code" style={styles.input} required onChange={(e) => setFormData({...formData, pincode: e.target.value.replace(/\D/g, "")})} />
            </div>
          </div>

          <div style={{...styles.row, marginTop: '10px'}}>
            <div style={{flex: 1}}>
              <label style={styles.label}><FaCalendarAlt/> Start Date</label>
              <input type="date" value={formData.startDate} min={today} style={styles.input} required onChange={handleStartDateChange} />
            </div>
            <div style={{flex: 1}}>
              <label style={styles.label}><FaCalendarAlt/> End Date</label>
              <input type="date" value={formData.endDate} min={formData.startDate || today} disabled={!formData.startDate} style={styles.input} required onChange={(e) => setFormData({...formData, endDate: e.target.value})} />
            </div>
          </div>

          <div style={styles.summaryBox}>
             <h4 style={{margin:'0 0 15px 0', color:'#1e3a8a'}}>Order Breakdown</h4>
             <div style={styles.summaryRow}><span>Item:</span> <strong>{state?.product?.name || "Product"}</strong></div>
             <div style={styles.summaryRow}><span>Tenure:</span> <strong>{days} Days</strong></div>
             <div style={styles.summaryRow}><span>Rent Amount:</span> <span>₹{calculatedRent}</span></div>
             <div style={styles.summaryRow}><span>Security Deposit:</span> <span>₹{securityDeposit}</span></div>
             <div style={styles.totalRow}><span>Final Payable:</span> <strong>₹{totalPrice}</strong></div>
          </div>

          <button type="submit" style={styles.btn}>
            <FaCreditCard style={{marginRight:'10px'}}/> Proceed to Secure Payment
          </button>
        </form>
      </div>
    </div>
  );
};

// Styles (same as before)
const styles = {
  container: { padding: '80px 20px', background: '#f8fafc', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  formCard: { background: '#fff', padding: '45px', borderRadius: '30px', boxShadow: '0 25px 50px rgba(0,0,0,0.06)', width: '100%', maxWidth: '700px', border: '1px solid #f1f5f9' },
  badge: { background: '#e0f2fe', color: '#0369a1', padding: '6px 16px', borderRadius: '30px', fontSize: '12px', fontWeight: '800', display: 'inline-block', marginBottom: '20px', textTransform: 'uppercase' },
  title: { marginBottom: '30px', color: '#0f172a', fontWeight: '900', fontSize: '28px' },
  row: { display: 'flex', gap: '20px', marginBottom: '10px' },
  input: { width: '100%', padding: '15px', margin: '8px 0', borderRadius: '14px', border: '1px solid #e2e8f0', fontSize: '15px', background: '#fcfcfc', outline: 'none', transition: '0.3s' },
  label: { fontSize: '13px', color: '#475569', fontWeight: '700', marginLeft: '4px', display: 'flex', alignItems: 'center', gap: '8px' },
  summaryBox: { background: '#f0f9ff', padding: '25px', borderRadius: '24px', margin: '30px 0', border: '1px solid #bae6fd' },
  summaryRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '15px', color: '#0369a1' },
  totalRow: { display: 'flex', justifyContent: 'space-between', borderTop: '2px dashed #bae6fd', marginTop: '15px', paddingTop: '15px', fontSize: '20px', fontWeight: '900', color: '#10b981' },
  btn: { width: '100%', padding: '20px', background: '#1e293b', color: '#fff', border: 'none', borderRadius: '16px', fontWeight: '800', cursor: 'pointer', fontSize: '17px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 15px 30px rgba(30,41,59,0.2)', transition: '0.3s' }
};

export default CheckoutForm;