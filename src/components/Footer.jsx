import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <span>Фильтрация постов через <code>.filter()</code> по <code>user.id === post.userId</code></span>
        <span className="footer-separator">•</span>
        <span>Данные взяты из JSONPlaceholder API</span>
      </div>
      <div className="footer-glow"></div>
    </footer>
  );
};

export default Footer;