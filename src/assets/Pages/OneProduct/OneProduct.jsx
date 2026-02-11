import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./OneProduct.css";

const ProductDetail = ({ cart, setCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // API bazaviy manzili
  const API_BASE_URL = "https://cosmetic-backend-2-1.onrender.com";

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/products/${id}`)
      .then((res) => res.json())
      .then((resData) => {
        // Agar backend mahsulotni to'g'ridan-to'g'ri yoki 'data' ichida yuborsa
        const data = resData.data || resData;

        if (data && (data._id || data.id)) {
          setProduct(data);
          setError(false);
        } else {
          setError(true);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ma'lumot olishda xato:", err);
        setError(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="loading">Yuklanmoqda...</p>;
  if (error || !product) return <p className="error">Mahsulot topilmadi yoki serverda xatolik.</p>;

  const handleAddToCart = () => {
    // Savatchada bir xil mahsulot takrorlanmasligi uchun tekshiruv (ixtiyoriy)
    setCart([...cart, { ...product }]);
    alert(`${product.name} savatchaga qo‘shildi!`);
  };

  return (
    <div className="detail-container">
      <Link to="/" className="back-btn">
        &larr; Orqaga
      </Link>

      <div className="detail-content">
        <div className="detail-image-wrapper">
          <img
            // DIQQAT: API_BASE_URL/uploads/ olib tashlandi
            src={product.image}
            alt={product.name}
            className="detail-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/400x400?text=Rasm+topilmadi';
            }}
          />
        </div>

        <div className="detail-info">
          <h2 className="detail-title">{product.name}</h2>

          <p className="detail-brand">
            <strong>Brend:</strong> {product.brand || "Mavjud emas"}
          </p>

          <p className="detail-description">
            <strong>Tavsif:</strong> {product.description || "Tavsif berilmagan"}
          </p>

          <p className="detail-price">
            {Number(product.price).toLocaleString()} so'm
          </p>

          <button className="add-cart-btn" onClick={handleAddToCart}>
            Savatchaga qo‘shish
          </button>
          <br />
          <a
            href="https://t.me/glow_seul_cosmetics"
            target="_blank"
            rel="noopener noreferrer"
            className="telegram-link"
          >
            Telegram kanalimizga obuna bo'ling
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;