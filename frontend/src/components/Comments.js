import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Comments = ({ productId }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');

  const fetchComments = async () => {
    const res = await axios.get(`/api/products/${productId}/comments`);
    setComments(res.data);
  };

  const addComment = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!text.trim()) return;

    await axios.post(`/api/products/${productId}/comments`, { text }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    setText('');
    fetchComments();
  };

  useEffect(() => {
    fetchComments();
  }, [productId]);

  return (
    <div>
      <h4>Comments</h4>
      <form onSubmit={addComment}>
        <input
          type="text"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      <ul>
        {comments.map((c, index) => (
          <li key={index}>
            <strong>{c.user?.username || 'User'}</strong>: {c.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
