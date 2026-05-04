import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        
        {/* 1. Brand Section */}
        <div style={styles.section}>
          <h2 style={styles.logo}>Rent<span style={{color: '#007bff'}}>Ease</span></h2>
          <p style={styles.description}>
            Upgrade your lifestyle without the burden of ownership. Rent premium furniture and appliances at affordable monthly prices.
          </p>
          <div style={styles.socialIcons}>
            <a href="#" style={styles.socialLink}><FaFacebook /></a>
            <a href="#" style={styles.socialLink}><FaTwitter /></a>
            <a href="#" style={styles.socialLink}><FaInstagram /></a>
            <a href="#" style={styles.socialLink}><FaLinkedin /></a>
          </div>
        </div>

        {/* 2. Quick Links */}
        <div style={styles.section}>
          <h4 style={styles.heading}>Quick Links</h4>
          <ul style={styles.list}>
            <li><Link to="/" style={styles.link}>Furniture</Link></li>
            <li><Link to="/" style={styles.link}>Appliances</Link></li>
            <li><Link to="/orders" style={styles.link}>My Rentals</Link></li>
            <li><Link to="/profile" style={styles.link}>My Profile</Link></li>
          </ul>
        </div>

        {/* 3. Support & Legal */}
        <div style={styles.section}>
          <h4 style={styles.heading}>Support</h4>
          <ul style={styles.list}>
            <li><Link to="/report-issue" style={styles.link}>Maintenance Request</Link></li>
            <li><Link to="/" style={styles.link}>FAQs</Link></li>
            <li><Link to="/" style={styles.link}>Privacy Policy</Link></li>
            <li><Link to="/" style={styles.link}>Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* 4. Contact Info */}
        <div style={styles.section}>
          <h4 style={styles.heading}>Contact Us</h4>
          <div style={styles.contactItem}>
            <FaPhoneAlt style={styles.contactIcon} /> <span>+91 98765 43210</span>
          </div>
          <div style={styles.contactItem}>
            <FaEnvelope style={styles.contactIcon} /> <span>support@rentease.com</span>
          </div>
          <div style={styles.contactItem}>
            <FaMapMarkerAlt style={styles.contactIcon} /> <span>Indore, Madhya Pradesh, India</span>
          </div>
        </div>

      </div>

      <div style={styles.bottomBar}>
        <p style={styles.copyText}>© 2026 RentEase – Furniture & Appliance Rental Platform. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

const styles = {
  footer: { background: '#1e293b', color: '#f8fafc', padding: '60px 0 20px', marginTop: '50px' },
  container: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', padding: '0 6%', maxWidth: '1200px', margin: '0 auto' },
  section: { display: 'flex', flexDirection: 'column', gap: '15px' },
  logo: { fontSize: '28px', fontWeight: '800', color: '#fff', margin: 0 },
  description: { fontSize: '14px', color: '#94a3b8', lineHeight: '1.6' },
  heading: { fontSize: '18px', fontWeight: '700', marginBottom: '10px', color: '#fff' },
  list: { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' },
  link: { color: '#94a3b8', textDecoration: 'none', fontSize: '14px', transition: '0.3s' },
  socialIcons: { display: 'flex', gap: '15px', marginTop: '10px' },
  socialLink: { color: '#fff', fontSize: '20px', transition: '0.3s' },
  contactItem: { display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#94a3b8' },
  contactIcon: { color: '#007bff' },
  bottomBar: { borderTop: '1px solid #334155', marginTop: '50px', paddingTop: '20px', textAlign: 'center' },
  copyText: { fontSize: '12px', color: '#64748b' }
};

export default Footer;