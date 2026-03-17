const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/icecreamdb')
  .then(() => console.log('✅ Connected to MongoDB database'))
  .catch(err => console.error('❌ MongoDB connection error:', err.message));

// Routes
const iceCreamRoutes = require('./routes/icecream.routes');
app.use('/api/icecreams', iceCreamRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('🍦 Ice Cream Management API is running...');
});

// Start Server (only if not running in Vercel Serverless functions)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
}

module.exports = app;
