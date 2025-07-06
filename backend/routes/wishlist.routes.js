const express = require('express');
const router = express.Router();
const Wishlist = require('../models/wishlist.model');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new wishlist
// POST /api/wishlists
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;
    const newWishlist = new Wishlist({
      name,
      createdBy: req.user.userId,
      members: [req.user.userId],
      products: []
    });
    const savedWishlist = await newWishlist.save();
    res.status(201).json(savedWishlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all wishlists for logged-in user
// GET /api/wishlists
router.get('/', authMiddleware, async (req, res) => {
  try {
    const wishlists = await Wishlist.find({ members: req.user.userId })
      .populate('products')
      .populate('createdBy', 'username email');
    res.json(wishlists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single wishlist by ID
// GET /api/wishlists/:id
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const wishlist = await Wishlist.findById(req.params.id)
      .populate('products')
      .populate('createdBy', 'username email');
    if (!wishlist || !wishlist.members.includes(req.user.userId)) {
      return res.status(403).json({ message: 'Not authorized or wishlist not found' });
    }
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a wishlist
// DELETE /api/wishlists/:id
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const wishlist = await Wishlist.findById(req.params.id);
    if (!wishlist || String(wishlist.createdBy) !== req.user.userId) {
      return res.status(403).json({ message: 'Only the creator can delete this wishlist' });
    }
    await wishlist.deleteOne();
    res.json({ message: 'Wishlist deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
