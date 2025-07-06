const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const http = require('http');
const { Server } = require('socket.io');
const winston = require('winston');

// Load environment variables
dotenv.config();

// App & server
const app = express();
const server = http.createServer(app);

// Socket.io
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // logs to console
app.set('io', io);

// Logger to file
const logger = winston.createLogger({
  transports: [new winston.transports.File({ filename: 'logs/server.log' })],
});

// Example usage
logger.info('🟢 Server booting up');
logger.error('❌ Example error log');

// Socket.io connection
io.on('connection', (socket) => {
  console.log(`🟢 Socket connected: ${socket.id}`);

  socket.on('join_wishlist', (wishlistId) => {
    socket.join(wishlistId);
    console.log(`📦 Socket ${socket.id} joined room: ${wishlistId}`);
  });

  socket.on('disconnect', () => {
    console.log(`🔴 Socket disconnected: ${socket.id}`);
  });
});

// Routes
const authRoutes = require('./routes/auth.routes');
const wishlistRoutes = require('./routes/wishlist.routes');
const productRoutes = require('./routes/product.routes');

app.use('/api/auth', authRoutes);
app.use('/api/wishlists', wishlistRoutes);
app.use('/api/products', productRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected');
  logger.info('✅ MongoDB connected');
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
  logger.error('❌ MongoDB connection error: ' + err.message);
});

// Server start
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  logger.info(`🚀 Server running on http://localhost:${PORT}`);
});
