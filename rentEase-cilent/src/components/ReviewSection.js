import React from 'react';
import { FaStar, FaQuoteLeft, FaCheckCircle } from 'react-icons/fa';

const ReviewSection = () => {
  const reviews = [
    { id: 1, name: "Anjali Parmar", city: "Indore", text: "RentEase se fridge rent karna bohot easy tha. Delivery next day hi ho gayi!", rating: 5 },
    { id: 2, name: "Rahul Singh", city: "Bhopal", text: "The quality of the sofa is amazing. Maintenance team is very helpful.", rating: 5 },
    { id: 3, name: "Priya Sharma", city: "Indore", text: "Security deposit refund process is very transparent. Highly recommended!", rating: 4 }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>What our users say <span>❤</span></h2>
        <div style={styles.overallRating}>
          <FaStar color="#ffc107" /> <strong>4.9/5</strong> based on 10,000+ happy renters
        </div>
      </div>

      <div style={styles.scrollWrapper}>
        {reviews.map((rev) => (
          <div key={rev.id} style={styles.reviewCard}>
            <FaQuoteLeft style={styles.quoteIcon} />
            <p style={styles.reviewText}>{rev.text}</p>
            <div style={styles.userInfo}>
              <div style={styles.userAvatar}>{rev.name[0]}</div>
              <div>
                <h4 style={styles.userName}>{rev.name} <FaCheckCircle color="#10b981" size={12}/></h4>
                <p style={styles.userCity}>{rev.city}</p>
              </div>
            </div>
            <div style={styles.stars}>
              {[...Array(rev.rating)].map((_, i) => <FaStar key={i} color="#ffc107" size={14}/>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '80px 8%', background: '#f8fafc' },
  header: { textAlign: 'center', marginBottom: '50px' },
  title: { fontSize: '2.5rem', fontWeight: '900', color: '#1e293b', margin: 0 },
  overallRating: { marginTop: '10px', color: '#64748b', fontSize: '16px' },
  
  scrollWrapper: { display: 'flex', gap: '30px', overflowX: 'auto', paddingBottom: '30px', scrollbarWidth: 'none' },
  reviewCard: { 
    minWidth: '320px', background: '#fff', padding: '40px 30px', borderRadius: '30px', 
    boxShadow: '0 10px 30px rgba(0,0,0,0.03)', position: 'relative', border: '1px solid #f1f5f9' 
  },
  quoteIcon: { position: 'absolute', top: '20px', right: '30px', opacity: 0.1, fontSize: '40px' },
  reviewText: { fontSize: '15px', color: '#475569', lineHeight: '1.7', marginBottom: '25px', fontStyle: 'italic' },
  
  userInfo: { display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' },
  userAvatar: { width: '45px', height: '45px', background: '#007bff', color: '#fff', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' },
  userName: { margin: 0, fontSize: '16px', fontWeight: '800', color: '#1e293b' },
  userCity: { margin: 0, fontSize: '12px', color: '#94a3b8', fontWeight: '600' },
  stars: { display: 'flex', gap: '4px' }
};

export default ReviewSection;