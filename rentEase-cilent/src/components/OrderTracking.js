import React from 'react';
import { FaCheckCircle, FaTruck, FaIdCard, FaBoxOpen } from 'react-icons/fa';

const OrderTracking = ({ status }) => {
  const steps = [
    { label: 'Order Placed', icon: <FaBoxOpen />, done: true },
    { label: 'KYC Verification', icon: <FaIdCard />, done: status === 'Verified' || status === 'Delivered' },
    { label: 'Out for Delivery', icon: <FaTruck />, done: status === 'Delivered' },
    { label: 'Delivered', icon: <FaCheckCircle />, done: status === 'Delivered' }
  ];

  return (
    <div style={trackStyles.container}>
      <h4 style={trackStyles.title}>Live Tracking</h4>
      <div style={trackStyles.timeline}>
        {steps.map((step, index) => (
          <div key={index} style={trackStyles.stepWrapper}>
            <div style={{...trackStyles.iconBox, color: step.done ? '#10b981' : '#cbd5e1'}}>
              {step.icon}
            </div>
            <p style={{...trackStyles.label, fontWeight: step.done ? '800' : '400'}}>{step.label}</p>
            {index !== steps.length - 1 && <div style={{...trackStyles.line, background: step.done ? '#10b981' : '#f1f5f9'}}></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

const trackStyles = {
  container: { marginTop: '20px', padding: '20px', background: '#f8fafc', borderRadius: '20px' },
  title: { fontSize: '13px', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '20px' },
  timeline: { display: 'flex', justifyContent: 'space-between', position: 'relative' },
  stepWrapper: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 1, flex: 1 },
  iconBox: { fontSize: '20px', transition: '0.3s' },
  label: { fontSize: '10px', color: '#475569', textAlign: 'center' },
  line: { position: 'absolute', top: '10px', left: '15%', width: '70%', height: '2px', zIndex: 0 }
};

export default OrderTracking;