import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Premium Global Styles
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* Humne App.js ko render kiya hai jo hamare saare routes aur logic ko handle kar raha hai */}
    <App />
  </React.StrictMode>
);

/**
 * 💡 RentEase Performance Logic:
 * Agar tum chaho toh console.log ki jagah kisi analytics endpoint 
 * (jaise Google Analytics) par metrics bhej sakte ho.
 */
reportWebVitals(console.log);