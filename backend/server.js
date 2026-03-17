const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dns = require('dns');

// Force DNS resolution to use Google and Cloudflare DNS
// This often fixes ENOTFOUND issues with MongoDB SRV records in Serverless environments
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection (Cached for Serverless)
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) return cachedDb;

  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/icecreamdb';
  try {
    const db = await mongoose.connect(uri);
    cachedDb = db;
    console.log('✅ Connected to MongoDB database');
    return db;
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    throw err;
  }
}

// Ensure connection before handling routes
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    res.status(500).json({ 
      message: "Database connection failed", 
      error: error.message,
      uri: process.env.MONGODB_URI ? "URI is set" : "URI is MISSING"
    });
  }
});
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
