import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiUser, FiArrowRight } from 'react-icons/fi';
import './Login.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true); 
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'superadmin', jins: 'erkak', age: 25, phonenumber: '' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const BACKEND_URL = "http://localhost:5222"; 

    try {
      if (isLogin) {
        const response = await fetch(`${BACKEND_URL}/superadmin/login`, { 
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: formData.email, 
            password: formData.password
          })
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem('token', data.token); 
          localStorage.setItem('isLoggedIn', 'true');
          alert("Xush kelibsiz!");
          navigate('/'); 
          window.location.reload(); 
        } else {
          alert(data.message || "Email yoki parol xato!");
        }

      } else {
        const signupData = {
          username: formData.email, 
          password: formData.password,
          jins: formData.jins,
          role: formData.role,
          phonenumber: formData.phonenumber, 
          age: Number(formData.age)
        };

        const response = await fetch(`${BACKEND_URL}/superadmin/create`, { 
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(signupData)
        });

        const data = await response.json();

        if (response.ok) {
          alert("Ro'yxatdan muvaffaqiyatli o'tdingiz! Endi tizimga kiring.");
          setIsLogin(true); 
        } else {
          alert(data.message || "Ro'yxatdan o'tishda xatolik!");
        }
      }
    } catch (error) {
      console.error("Server bilan bog'lanishda xatolik:", error);
      alert("Serverga ulanib bo'lmadi. Backend yoniq ekanligini tekshiring!");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>{isLogin ? 'Kirish' : "Ro'yxatdan o'tish"}</h2>
        <p className="auth-subtitle">
          {isLogin ? 'Xush kelibsiz! Ma’lumotlaringizni kiriting.' : 'Bizga qo‘shiling va tizimni boshqaring.'}
        </p>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
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
              <div className="auth-input-group">
                <FiUser className="auth-icon" />
                <input 
                  type="text" 
                  name="phonenumber" 
                  placeholder="Telefon raqamingiz (+998...)" 
                  required 
                  onChange={handleInputChange} 
                />
              </div>
            </>
          )}

          <div className="auth-input-group">
            <FiMail className="auth-icon" />
            <input 
              type="email" 
              name="email" 
              placeholder="Email manzilingiz (Username)" 
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