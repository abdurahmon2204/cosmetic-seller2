import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiMenu, FiX, FiLogOut, FiUser } from 'react-icons/fi';
import './Navbar.css';

const Navbar = ({ cartCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // localStorage'dan login holatini olish
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    if (window.confirm("Tizimdan chiqmoqchimisiz?")) {
      localStorage.removeItem('isLoggedIn');
      // Foydalanuvchi ma'lumotlarini o'chirmaymiz (user qoladi), 
      // faqat login holatini o'chiramiz.
      navigate('/');
      window.location.reload(); 
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Mobile menu toggle */}
        <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </div>

        {/* Logo */}
        <Link to="/" className="navbar-logo">
          GLOW<span>SEUL</span>
        </Link>

        {/* Nav links */}
        <ul className={isMenuOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <NavLink to="/" className="nav-links" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/products" className="nav-links" onClick={() => setIsMenuOpen(false)}>Products</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about" className="nav-links" onClick={() => setIsMenuOpen(false)}>About</NavLink>
          </li>
          
          {/* Mobile versiyada login tugmalari */}
          <div className="nav-auth-mobile">
             {isLoggedIn ? (
               <button onClick={handleLogout} className="logout-btn-mobile">Chiqish</button>
             ) : (
               <Link to="/login" onClick={() => setIsMenuOpen(false)}>Kirish</Link>
             )}
          </div>
        </ul>

        <div className="navbar-actions">
          {/* Savatcha */}
          <Link to="/cart" className="cart-icon-container">
            <FiShoppingCart />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          
          {/* Desktop Auth Section */}
          <div className="nav-auth-desktop">
            {isLoggedIn ? (
              <div className="user-profile-nav">
                <FiUser className="user-icon" />
                <span className="user-name">{user?.name?.split(' ')[0]}</span>
                <button onClick={handleLogout} className="logout-icon-btn" title="Chiqish">
                  <FiLogOut />
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="login-link">Login</Link>
                <Link to="/login" className="signup-button">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;