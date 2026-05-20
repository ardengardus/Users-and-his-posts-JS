import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1>Лента постов</h1>
        <p>Выберите пользователя для отображения всех его постов</p>
      </div>
      <div className="header-glow"></div>
    </header>
  );
};

export default Header;