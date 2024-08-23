


///mongodb.ts 

// lib/mongodb.js
import mongoose from 'mongoose';

const MONGO_URL = process.env.MONGO_URL; // Ensure this is set in your .env.local file

let isConnected = false;

export const connectToDatabase = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

