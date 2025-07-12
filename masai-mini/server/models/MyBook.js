const mongoose = require('mongoose');

const myBookSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Book'
  },
  status: {
    type: String,
    enum: ['Want to Read', 'Reading', 'Completed'],
    default: 'Want to Read'
  },  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  }
});

module.exports = mongoose.model('MyBook', myBookSchema);
