import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiMenu, FiX, FiLogOut, FiUser } from 'react-icons/fi';
import './Navbar.css';

const Navbar = ({ cartCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  // "undefined" yoki null qiymat kelsa, crash bo'lishini oldini oluvchi xavfsiz funksiya
  const getUserData = () => {
    try {
      const savedUser = localStorage.getItem('user');
      if (!savedUser || savedUser === "undefined") return null;
      return JSON.parse(savedUser);
    } catch (error) {
      console.error("Local storage o'qishda xatolik:", error);
      return null;
    }
  };

  const user = getUserData();

  const handleLogout = () => {
    if (window.confirm("Tizimdan chiqmoqchimisiz?")) {
      // Tizimdan chiqishda barcha eski qoldiqlarni tozalash
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      
      navigate('/');
      window.location.reload(); 
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </div>

        <Link to="/" className="navbar-logo">
          GLOW<span>SEUL</span>
        </Link>

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
          
          <div className="nav-auth-mobile">
             {isLoggedIn ? (
               <button onClick={handleLogout} className="logout-btn-mobile">Chiqish</button>
             ) : (
               <Link to="/login" onClick={() => setIsMenuOpen(false)}>Kirish</Link>
             )}
          </div>
        </ul>

        <div className="navbar-actions">
          <Link to="/cart" className="cart-icon-container">
            <FiShoppingCart />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          
          <div className="nav-auth-desktop">
            {isLoggedIn && user ? (
              <div className="user-profile-nav">
                <FiUser className="user-icon" />
                {/* user?.name o'rniga user?.username qo'yildi */}
                <span className="user-name">{user?.username?.split(' ')[0]}</span>
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