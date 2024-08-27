// lib/dbConnect.ts
import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URL || '';

if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URL environment variable inside .env.local');
}

let cachedClient: mongoose.Mongoose | null = null;

async function dbConnect() {
  if (cachedClient) return;

  try {
    cachedClient = await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    throw new Error('Failed to connect to MongoDB');
  }
}

export default dbConnect;





