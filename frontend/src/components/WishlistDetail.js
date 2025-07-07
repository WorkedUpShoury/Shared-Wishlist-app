import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import Comments from './Comments';
import '../styles/Product.css';
import '../styles/Form.css'; // if needed


const socket = io('http://localhost:5000'); // Backend origin

const WishlistDetail = ({ wishlist }) => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ productName: '', productImage: '', price: '' });

  useEffect(() => {
    socket.emit('join_wishlist', wishlist._id);

    socket.on('product_added', (product) => {
      if (product.wishlistId === wishlist._id) {
        setProducts(prev => [...prev, product]);
      }
    });

    return () => {
      socket.off('product_added');
    };
  }, [wishlist]);

  const fetchWishlist = async () => {
    const res = await axios.get(`/api/wishlists/${wishlist._id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setProducts(res.data.products || []);
  };

  const addProduct = async (e) => {
    e.preventDefault();
    await axios.post(`/api/wishlists/${wishlist._id}/products`, form, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setForm({ productName: '', productImage: '', price: '' });
    // Socket will update the UI
  };

  useEffect(() => {
    fetchWishlist();
  }, [wishlist]);

  return (
    <div>
      <h3>{wishlist.name}</h3>
      
      <form onSubmit={addProduct}>
        <input
          value={form.productName}
          onChange={(e) => setForm({ ...form, productName: e.target.value })}
          placeholder="Product name"
          required
        />
        <input
          value={form.productImage}
          onChange={(e) => setForm({ ...form, productImage: e.target.value })}
          placeholder="Image URL"
          required
        />
        <input
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          placeholder="Price"
          required
        />
        <button type="submit">Add Product</button>
      </form>

      <div className="product-list">
  {products.map(p => (
    <div className="product-item" key={p._id}>
      <img src={p.productImage} alt={p.productName} />
      <h4>{p.productName}</h4>
      <p>${p.price}</p>
      <Comments productId={p._id} />
      <Reactions productId={p._id} />
    </div>
  ))}
</div>
    </div>
  );
};

export default WishlistDetail;
