import React, { useState } from 'react'; // useState qo'shildi
import { Link } from 'react-router-dom';
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag, FiArrowLeft, FiCreditCard, FiMapPin, FiUser, FiPhone, FiX } from 'react-icons/fi';
import './Cart.css';

const Cart = ({ cart, setCart }) => {
  const [showModal, setShowModal] = useState(false); // To'lov modali uchun
  const [formData, setFormData] = useState({ name: '', phone: '', address: '', cardNumber: '' });

  const updateQuantity = (id, delta) => {
    const updatedCart = cart.map(item => {
      if ((item.id || item._id) === id) {
        const newQty = (item.quantity || 1) + delta;
        return { ...item, quantity: newQty > 0 ? newQty : 1 };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const removeItem = (id) => {
    if (window.confirm("O'chirishni xohlaysizmi?")) {
      setCart(cart.filter(item => (item.id || item._id) !== id));
    }
  };

  const totalPrice = cart.reduce((acc, item) => acc + (Number(item.price) * (item.quantity || 1)), 0);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = (e) => {
    e.preventDefault();
    alert(`Rahmat, ${formData.name}! Buyurtma qabul qilindi. Tez orada bog'lanamiz.`);
    setCart([]); // Savatchani tozalash
    setShowModal(false);
  };

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <FiShoppingBag size={80} color="#ccc" />
        <h2>Savatchangiz bo'sh</h2>
        <Link to="/" className="go-home-btn"><FiArrowLeft /> Do'konga qaytish</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1 className="cart-title">Sizning Savatchangiz</h1>
      <div className="cart-container">
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id || item._id} className="cart-item">
              <img src={`https://cosmetic-backend-2-1.onrender.com/uploads/${item.image}`} alt={item.name} className="cart-item-img" />
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p className="item-price">{Number(item.price).toLocaleString()} so'm</p>
              </div>
              <div className="cart-item-actions">
                <div className="quantity-control">
                  <button onClick={() => updateQuantity(item.id || item._id, -1)}><FiMinus /></button>
                  <span>{item.quantity || 1}</span>
                  <button onClick={() => updateQuantity(item.id || item._id, 1)}><FiPlus /></button>
                </div>
                <button className="remove-btn" onClick={() => removeItem(item.id || item._id)}><FiTrash2 /></button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>Buyurtma</h3>
          <div className="summary-row total">
            <span>Umumiy:</span>
            <span>{totalPrice.toLocaleString()} so'm</span>
          </div>
          <button className="checkout-btn" onClick={() => setShowModal(true)}>
            Rasmiylashtirishga o'tish
          </button>
        </div>
      </div>

      {/* --- TO'LOV MODAL OYNASI --- */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={() => setShowModal(false)}><FiX /></button>
            <h2><FiCreditCard /> To'lov ma'lumotlari</h2>
            <form onSubmit={handlePayment}>
              <div className="input-group">
                <FiUser className="input-icon" />
                <input type="text" name="name" placeholder="F.I.SH" required onChange={handleInputChange} />
              </div>
              <div className="input-group">
                <FiPhone className="input-icon" />
                <input type="tel" name="phone" placeholder="+998 90 123 45 67" required onChange={handleInputChange} />
              </div>
              <div className="input-group">
                <FiMapPin className="input-icon" />
                <input type="text" name="address" placeholder="Yetkazish manzili" required onChange={handleInputChange} />
              </div>
              <div className="input-group">
                <FiCreditCard className="input-icon" />
                <input type="text" name="cardNumber" placeholder="Karta raqami (8600 ...)" required onChange={handleInputChange} />
              </div>
              <button type="submit" className="pay-btn">
                To'lovni amalga oshirish: {totalPrice.toLocaleString()} so'm
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;