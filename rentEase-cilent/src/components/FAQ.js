import React, { useState } from 'react';
import { FaChevronDown, FaQuestionCircle } from 'react-icons/fa';

const FAQ = () => {
  const [active, setActive] = useState(null);
  const faqs = [
    { q: "Security Deposit kab refund hoga?", a: "Pickup ke 7 days ke andar aapke bank account mein credit ho jayega." },
    { q: "Kya maintenance free hai?", a: "Haan! Kisi bhi breakage ya issues ke liye hum 24h repair guarantee dete hain." },
    { q: "KYC kyun zaroori hai?", a: "Rental items hamari property hain, isliye verification mandatory hai." }
  ];

  return (
    <div style={faqStyles.container}>
      <h2 style={faqStyles.title}>Common Questions</h2>
      {faqs.map((f, i) => (
        <div key={i} style={faqStyles.item} onClick={() => setActive(active === i ? null : i)}>
          <div style={faqStyles.question}>
            <span><FaQuestionCircle color="#007bff" /> {f.q}</span>
            <FaChevronDown style={{transform: active === i ? 'rotate(180deg)' : '0'}} />
          </div>
          {active === i && <p style={faqStyles.answer}>{f.a}</p>}
        </div>
      ))}
    </div>
  );
};

const faqStyles = {
  container: { padding: '40px 6%', maxWidth: '800px', margin: '0 auto' },
  title: { textAlign: 'center', marginBottom: '30px', fontWeight: '900' },
  item: { background: '#fff', border: '1px solid #f1f5f9', borderRadius: '15px', marginBottom: '10px', cursor: 'pointer', overflow: 'hidden' },
  question: { padding: '20px', display: 'flex', justifyContent: 'space-between', fontWeight: '700', fontSize: '14px' },
  answer: { padding: '0 20px 20px', color: '#64748b', fontSize: '13px' }
};

export default FAQ;