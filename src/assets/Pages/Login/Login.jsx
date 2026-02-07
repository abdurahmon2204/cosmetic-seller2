import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiUser, FiArrowRight } from 'react-icons/fi';
import './Login.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true); // Login yoki SignUp holati
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      // Login logikasi
      const savedUser = JSON.parse(localStorage.getItem('user'));
      
      if (savedUser && savedUser.email === formData.email && savedUser.password === formData.password) {
        localStorage.setItem('isLoggedIn', 'true');
        alert("Xush kelibsiz!");
        navigate('/'); // Asosiy sahifaga o'tish
        window.location.reload(); // Navbardagi holatni yangilash uchun
      } else {
        alert("Email yoki parol xato!");
      }
    } else {
      // SignUp logikasi
      localStorage.setItem('user', JSON.stringify(formData));
      alert("Ro'yxatdan o'tdingiz! Endi login qiling.");
      setIsLogin(true); // Login sahifasiga o'tkazish
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>{isLogin ? 'Kirish' : "Ro'yxatdan o'tish"}</h2>
        <p className="auth-subtitle">
          {isLogin ? 'Hush kelibsiz! Ma’lumotlaringizni kiriting.' : 'Bizga qo‘shiling va go‘zallikdan bahra oling.'}
        </p>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="auth-input-group">
              <FiUser className="auth-icon" />
              <input 
                type="text" 
                name="name" 
                placeholder="To'liq ismingiz" 
                required 
                onChange={handleInputChange} 
              />
            </div>
          )}

          <div className="auth-input-group">
            <FiMail className="auth-icon" />
            <input 
              type="email" 
              name="email" 
              placeholder="Email manzilingiz" 
              required 
              onChange={handleInputChange} 
            />
          </div>

          <div className="auth-input-group">
            <FiLock className="auth-icon" />
            <input 
              type="password" 
              name="password" 
              placeholder="Parolingiz" 
              required 
              onChange={handleInputChange} 
            />
          </div>

          <button type="submit" className="auth-submit-btn">
            {isLogin ? 'Kirish' : "Ro'yxatdan o'tish"} <FiArrowRight />
          </button>
        </form>

        <p className="auth-switch">
          {isLogin ? "Profilingiz yo'qmi?" : "Profilingiz bormi?"}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? " Ro'yxatdan o'tish" : " Kirish"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;