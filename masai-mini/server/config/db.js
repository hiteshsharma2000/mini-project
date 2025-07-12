const mongoose = require('mongoose');
require('dotenv').config()
const Book = require('../models/Book');
const booksData = require('../sample/books.json').books;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    // await Book.deleteMany();
    //   await Book.insertMany(booksData);
    console.log('✅ Books seeded successfully');
    console.log('MongoDB connected');
  } catch (error) {
    console.error('DB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
