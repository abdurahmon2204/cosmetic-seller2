import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLock, FiUser, FiArrowRight, FiBookOpen, FiActivity, FiPhone, FiCalendar } from 'react-icons/fi';
import './Login.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true); 
  
  const [formData, setFormData] = useState({ 
    username: '', 
    password: '', 
    role: 'user',
    jins: 'erkak',
    surname: '',
    status: 'active', 
    subject: '',
    age: '',
    phonenumber: ''
  });
  
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const BACKEND_URL = "http://localhost:5222"; 

    try {
      if (isLogin) {
        const response = await fetch(`${BACKEND_URL}/${formData.role}/login`, { 
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: formData.username, 
            password: formData.password
          })
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem('token', data.token); 
          localStorage.setItem('role', formData.role); 
          localStorage.setItem('isLoggedIn', 'true');
          alert("Xush kelibsiz!");
          navigate('/'); 
          window.location.reload(); 
        } else {
          alert(data.message || "Username yoki parol xato!");
        }

      } else {
        let signupData = {
          username: formData.username,
          password: formData.password,
          jins: formData.jins
        };

        if (formData.role === 'user') {
          signupData.surname = formData.surname;
          signupData.status = formData.status;
        } 
        else if (formData.role === 'teacher') {
          signupData.surname = formData.surname;
          signupData.subject = formData.subject;
        } 
        else if (formData.role === 'admin') {
          signupData.surname = formData.surname;
        } 
        else if (formData.role === 'superadmin') {
          signupData.age = Number(formData.age);
          signupData.phonenumber = formData.phonenumber;
        }

        const response = await fetch(`${BACKEND_URL}/${formData.role}/create`, { 
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
          {isLogin ? 'Xush kelibsiz! Ma’lumotlaringizni kiriting.' : 'Tizimda yangi profil ochish.'}
        </p>

        <form onSubmit={handleSubmit}>
          
          <div className="auth-input-group">
            <FiUser className="auth-icon" />
            <select 
              name="role" 
              className="auth-select" 
              value={formData.role} 
              onChange={handleInputChange} 
              required
              style={{ width: '100%', padding: '10px 35px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none', background: '#fff', fontWeight: 'bold' }}
            >
              <option value="user">Foydalanuvchi (User)</option>
              <option value="teacher">O'qituvchi (Teacher)</option>
              <option value="admin">Admin</option>
              <option value="superadmin">Super Admin</option>
            </select>
          </div>

          {!isLogin && (
            <>
              <div className="auth-input-group">
                <FiUser className="auth-icon" />
                <select 
                  name="jins" 
                  className="auth-select" 
                  value={formData.jins} 
                  onChange={handleInputChange} 
                  required
                  style={{ width: '100%', padding: '10px 35px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none', background: '#fff' }}
                >
                  <option value="erkak">Erkak</option>
                  <option value="ayol">Ayol</option>
                </select>
              </div>

              {(formData.role === 'user' || formData.role === 'teacher' || formData.role === 'admin') && (
                <div className="auth-input-group">
                  <FiUser className="auth-icon" />
                  <input 
                    type="text" 
                    name="surname" 
                    placeholder="Familyangiz (Surname)" 
                    required 
                    onChange={handleInputChange} 
                  />
                </div>
              )}

              {formData.role === 'user' && (
                <div className="auth-input-group">
                  <FiActivity className="auth-icon" />
                  <select 
                    name="status" 
                    className="auth-select" 
                    value={formData.status} 
                    onChange={handleInputChange} 
                    required
                    style={{ width: '100%', padding: '10px 35px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none', background: '#fff' }}
                  >
                    <option value="aktiv">Aktiv</option>
                    <option value="bloklangan">Bloklangan</option>
                  </select>
                </div>
              )}

              {formData.role === 'teacher' && (
                <div className="auth-input-group">
                  <FiBookOpen className="auth-icon" />
                  <input 
                    type="text" 
                    name="subject" 
                    placeholder="Dars beradigan faningiz (Subject)" 
                    required 
                    onChange={handleInputChange} 
                  />
                </div>
              )}

              {formData.role === 'superadmin' && (
                <div className="auth-input-group">
                  <FiCalendar className="auth-icon" />
                  <input 
                    type="number" 
                    name="age" 
                    placeholder="Yoshingiz (Age)" 
                    min="1"
                    max="120"
                    required 
                    onChange={handleInputChange} 
                  />
                </div>
              )}

              {formData.role === 'superadmin' && (
                <div className="auth-input-group">
                  <FiPhone className="auth-icon" />
                  <input 
                    type="text" 
                    name="phonenumber" 
                    placeholder="Telefon raqam (+998...)" 
                    required 
                    onChange={handleInputChange} 
                  />
                </div>
              )}
            </>
          )}

          <div className="auth-input-group">
            <FiUser className="auth-icon" />
            <input 
              type="text" 
              name="username" 
              placeholder="Username kiriting" 
              required 
              onChange={handleInputChange} 
            />
          </div>

          {/* PASSWORD (Hamma rejimda va hamma rolda majburiy) */}
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