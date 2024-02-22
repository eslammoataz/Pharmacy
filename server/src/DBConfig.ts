import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();
// Define Mongoose connection options
const MONGO_URI = process.env.MONGODB_URI;
console.log('INSIDE DB CONFIG ', process.env.MONGODB_URI);

const mongooseOptions: mongoose.ConnectOptions = {};

// Function to establish Mongoose connection
export const connectToDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI, mongooseOptions);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

// Function to close Mongoose connection
export const closeDatabaseConnection = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error);
  }
};
