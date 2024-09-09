//lib/mongodb.ts 
import mongoose from 'mongoose';

const MONGO_URL = process.env.MONGO_URL as string;

let isConnected = false;

export const connectToDatabase = async (): Promise<void> => {
  if (isConnected) return;

  if (!MONGO_URL) {
    throw new Error('MONGO_URL environment variable is not defined.');
  }

  try {
    await mongoose.connect(MONGO_URL);
    isConnected = true;
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); 
  }
};

  





