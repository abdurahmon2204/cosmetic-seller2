import React from 'react';
import { FiTarget, FiHeart, FiCheckCircle, FiUsers } from 'react-icons/fi';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <div className="about-hero">
        <div className="hero-content">
          <h1>GLOWSEUL Haqida</h1>
          <p>Go'zallik va parvarish olamidagi sizning eng ishonchli hamrohingiz.</p>
        </div>
      </div>

      <div className="about-container">
        {/* Story Section */}
        <section className="about-section">
          <div className="section-text">
            <h2>Bizning Tariximiz</h2>
            <p>
              GLOWSEUL 2025-yilda ayollarga yuqori sifatli va tabiiy kosmetika mahsulotlarini 
              oson topishga yordam berish maqsadida tashkil etilgan. Biz dunyodagi eng yetakchi 
              brendlar bilan to'g'ridan-to'g'ri hamkorlik qilib, faqatgina original va xavfsiz 
              mahsulotlarni yetkazib beramiz.
            </p>
          </div>
          <div className="section-image">
            <img src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800" alt="Cosmetics" />
          </div>
        </section>

        {/* Features Grid */}
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon"><FiHeart /></div>
            <h3>Sifat kafolati</h3>
            <p>Barcha mahsulotlarimiz 100% original va sertifikatlangan.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><FiCheckCircle /></div>
            <h3>Tabiiy tarkib</h3>
            <p>Biz faqatgina teri uchun xavfsiz bo'lgan tarkibiy qismlarni tanlaymiz.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><FiTarget /></div>
            <h3>Tezkor yetkazish</h3>
            <p>O'zbekiston bo'ylab buyurtmalar 24 soat ichida yo'lga chiqadi.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><FiUsers /></div>
            <h3>Mijozlar mehri</h3>
            <p>50,000 dan ortiq mamnun mijozlar bizga ishonishadi.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;