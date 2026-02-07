import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Render'dagi yangi backend manzili
  const API_BASE_URL = "https://cosmetic-backend-2-1.onrender.com";

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/products/all`)
      .then((res) => res.json())
      .then((resData) => {
        // Backend'dan kelayotgan ma'lumot tuzilishiga qarab:
        // Agar backend res.status(200).json(products) qaytarsa, resData o'zi massiv bo'ladi
        // Agar res.json({ success: true, data: products }) bo'lsa, resData.data ishlatiladi
        const fetchedProducts = Array.isArray(resData) ? resData : (resData.data || resData.products || []);
        setProducts(fetchedProducts);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Xatolik yuz berdi:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <h2 className="loading-text">Mahsulotlar yuklanmoqda...</h2>;

  return (
    <div className="product-container">
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product._id || product.id} className="product-card">
            <div className="image-box">
              <img
                // DIQQAT: Endi API_BASE_URL va /uploads/ kerak emas!
                // Chunki Firebase to'liq URL manzilini taqdim etadi.
                src={product.image} 
                alt={product.name}
                className="product-image"
                onError={(e) => { 
                  e.target.onerror = null; 
                  e.target.src = 'https://via.placeholder.com/200x200?text=Rasm+topilmadi'; 
                }}
              />
            </div>
            
            <div className="product-info">
              <p className="product-brand">{product.brand}</p>
              <Link to={`/oneproduct/${product._id || product.id}`} className="product-title">
                {product.name}
              </Link>
              <p className="product-price">
                {Number(product.price).toLocaleString()} so'm
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className="no-products">
          <p>Hozircha mahsulotlar yo'q.</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;