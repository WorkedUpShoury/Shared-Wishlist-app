import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Wishlist.css';

const WishlistList = ({ user, onSelectWishlist }) => {
  const [wishlists, setWishlists] = useState([]);
  const [name, setName] = useState('');

  const fetchWishlists = async () => {
    const res = await axios.get('/api/wishlists', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setWishlists(res.data);
  };

  const createWishlist = async (e) => {
    e.preventDefault();
    await axios.post('/api/wishlists', { name }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setName('');
    fetchWishlists();
  };

  useEffect(() => {
    fetchWishlists();
  }, []);

  return (
    <div>
      <h2>My Wishlists</h2>
      <form onSubmit={createWishlist}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="New wishlist name" required />
        <button type="submit">Create</button>
      </form>
      <ul>
        {wishlists.map(w => (
          <li key={w._id} onClick={() => onSelectWishlist(w)}>{w.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default WishlistList;
