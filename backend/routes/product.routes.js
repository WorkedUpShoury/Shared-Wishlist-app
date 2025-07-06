const express = require('express');
const router = express.Router();
const Product = require('../models/product.model');
const Wishlist = require('../models/wishlist.model');
const authMiddleware = require('../middleware/authMiddleware');

// POST /api/wishlists/:wishlistId/products
// Add a product to a specific wishlist
router.post('/wishlists/:wishlistId/products', authMiddleware, async (req, res) => {
  try {
    const { productName, productImage, price } = req.body;
    const { wishlistId } = req.params;

    const wishlist = await Wishlist.findById(wishlistId);
    if (!wishlist || !wishlist.collaborators.includes(req.user.userId)) {
      return res.status(403).json({ message: 'You are not authorized to add to this wishlist' });
    }

    const newProduct = new Product({
      productName,
      productImage,
      price,
      wishlistId,
      addedBy: req.user.userId,
    });

    const savedProduct = await newProduct.save();

    wishlist.products.push(savedProduct._id);
    await wishlist.save();

    // Emit to all users in this wishlist room
    const io = req.app.get('io');
    io.to(wishlistId).emit('product_added', {
      ...savedProduct._doc,
      wishlistId,
    });

    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/products/:productId
// Edit a product's details
router.put('/:productId', authMiddleware, async (req, res) => {
  try {
    const { productName, productImage, price } = req.body;
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    product.productName = productName || product.productName;
    product.productImage = productImage || product.productImage;
    product.price = price || product.price;
    product.lastEditedBy = req.user.userId;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/products/:productId
// Remove a product from a wishlist
router.delete('/:productId', authMiddleware, async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const wishlist = await Wishlist.findById(product.wishlistId);
    if (!wishlist || !wishlist.collaborators.includes(req.user.userId)) {
      return res.status(403).json({ message: 'You are not authorized to delete from this wishlist' });
    }

    wishlist.products = wishlist.products.filter(
      id => String(id) !== String(product._id)
    );
    await wishlist.save();

    await product.deleteOne();
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// POST /api/products/:productId/comments
// Add a comment to a product
router.post('/:productId/comments', authMiddleware, async (req, res) => {
  try {
    const { text } = req.body;
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const comment = {
      text,
      user: req.user.userId,
      createdAt: new Date()
    };

    product.comments.push(comment);
    await product.save();

    res.status(201).json(product.comments[product.comments.length - 1]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/products/:productId/comments
// Get all comments for a product
router.get('/:productId/comments', async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId).populate('comments.user', 'username');
    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.json(product.comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
