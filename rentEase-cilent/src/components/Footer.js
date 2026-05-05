import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        
        {/* 1. Brand & Newsletter */}
        <div style={styles.sectionLarge}>
          <h2 style={styles.logo}>Rent<span style={{color: '#00d4ff'}}>Ease</span></h2>
          <p style={styles.description}>
            India's most loved rental platform for premium furniture and appliances. 
            Upgrade your home lifestyle with zero commitment and free maintenance.
          </p>
          <div style={styles.newsletter}>
            <input type="email" placeholder="Email for offers" style={styles.newsInput} />
            <button style={styles.newsBtn}><FaPaperPlane /></button>
          </div>
          <div style={styles.socialIcons}>
            <a href="#" style={styles.socialLink} className="social-hover"><FaFacebook /></a>
            <a href="#" style={styles.socialLink} className="social-hover"><FaTwitter /></a>
            <a href="#" style={styles.socialLink} className="social-hover"><FaInstagram /></a>
            <a href="#" style={styles.socialLink} className="social-hover"><FaLinkedin /></a>
          </div>
        </div>

        {/* 2. Rent by Categories (SEO Links like RentoMojo) */}
        <div style={styles.section}>
          <h4 style={styles.heading}>Rent by Type</h4>
          <ul style={styles.list}>
            <li><Link to="/furniture" style={styles.link} className="footer-link">Bedroom Furniture</Link></li>
            <li><Link to="/furniture" style={styles.link} className="footer-link">Living Room Sets</Link></li>
            <li><Link to="/appliances" style={styles.link} className="footer-link">Kitchen Appliances</Link></li>
            <li><Link to="/electronics" style={styles.link} className="footer-link">Smart Home Devices</Link></li>
            <li><Link to="/fitness" style={styles.link} className="footer-link">Fitness Equipment</Link></li>
          </ul>
        </div>

        {/* 3. Support & Policies */}
        <div style={styles.section}>
          <h4 style={styles.heading}>Information</h4>
          <ul style={styles.list}>
            <li><Link to="/report-issue" style={styles.link} className="footer-link">Raise a Ticket</Link></li>
            <li><Link to="/faq" style={styles.link} className="footer-link">How it Works</Link></li>
            <li><Link to="/privacy" style={styles.link} className="footer-link">Privacy Policy</Link></li>
            <li><Link to="/terms" style={styles.link} className="footer-link">Rental Terms</Link></li>
          </ul>
        </div>

        {/* 4. Get the App & Contact */}
        <div style={styles.section}>
          <h4 style={styles.heading}>Get the App</h4>
          <div style={styles.appLinks}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="PlayStore" style={styles.appBadge} />
            <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="AppStore" style={styles.appBadge} />
          </div>
          <div style={styles.contactSection}>
             <p style={styles.contactItem}><FaPhoneAlt color="#00d4ff"/> +91 98765 43210</p>
             <p style={styles.contactItem}><FaEnvelope color="#00d4ff"/> support@rentease.com</p>
             <p style={styles.contactItem}><FaMapMarkerAlt color="#00d4ff"/> Indore, MP, India</p>
          </div>
        </div>

      </div>

      <div style={styles.bottomBar}>
        <div style={styles.bottomContent}>
            <p style={styles.copyText}>© 2026 RentEase – Designed for a better lifestyle.</p>
            <div style={styles.paymentIcons}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" style={styles.payIcon} />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" style={styles.payIcon} />
                <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" alt="Razorpay" style={styles.payIcon} />
            </div>
        </div>
      </div>

      <style>{`
        .footer-link:hover { color: #fff !important; transform: translateX(5px); }
        .footer-link { transition: 0.3s; display: block; }
        .social-hover:hover { color: #00d4ff !important; transform: translateY(-3px); }
      `}</style>
    </footer>
  );
};

const styles = {
  footer: { background: '#0f172a', color: '#f8fafc', padding: '80px 0 30px', borderTop: '4px solid #007bff' },
  container: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '50px', padding: '0 8%', maxWidth: '1400px', margin: '0 auto' },
  sectionLarge: { display: 'flex', flexDirection: 'column', gap: '20px', gridColumn: 'span 1' },
  section: { display: 'flex', flexDirection: 'column', gap: '20px' },
  logo: { fontSize: '32px', fontWeight: '900', color: '#fff', margin: 0, letterSpacing: '-1px' },
  description: { fontSize: '14px', color: '#94a3b8', lineHeight: '1.8' },
  heading: { fontSize: '16px', fontWeight: '800', marginBottom: '10px', color: '#fff', textTransform: 'uppercase', letterSpacing: '1px' },
  
  newsletter: { display: 'flex', background: '#1e293b', borderRadius: '12px', padding: '5px', overflow: 'hidden', border: '1px solid #334155' },
  newsInput: { flex: 1, background: 'none', border: 'none', padding: '10px 15px', color: '#fff', outline: 'none', fontSize: '13px' },
  newsBtn: { background: '#007bff', color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '8px', cursor: 'pointer' },

  list: { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' },
  link: { color: '#64748b', textDecoration: 'none', fontSize: '14px', fontWeight: '500' },
  
  socialIcons: { display: 'flex', gap: '20px', marginTop: '10px' },
  socialLink: { color: '#94a3b8', fontSize: '20px', transition: '0.3s' },
  
  appLinks: { display: 'flex', flexDirection: 'column', gap: '10px' },
  appBadge: { width: '130px', cursor: 'pointer', transition: '0.3s' },
  
  contactSection: { marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' },
  contactItem: { display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: '#94a3b8', margin: 0 },

  bottomBar: { borderTop: '1px solid #1e293b', marginTop: '80px', paddingTop: '30px', padding: '30px 8% 0' },
  bottomContent: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' },
  copyText: { fontSize: '13px', color: '#475569', margin: 0 },
  paymentIcons: { display: 'flex', gap: '20px', alignItems: 'center', opacity: 0.6 },
  payIcon: { height: '18px' }
};

export default Footer;