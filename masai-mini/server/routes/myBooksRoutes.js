const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const MyBook = require('../models/MyBook');
const mongoose=require('mongoose')

const router = express.Router();

router.use(authMiddleware);

router.get('/',  async (req, res) => {
  try {
    const books = await MyBook.find({ userId: req.user._id }).populate('bookId');
    console.log(books,"qwd")
    res.json(books);

  } catch (err) {
    res.status(500).json({ message: 'Error fetching books' });
  }
});



router.post('/:bookId', async (req, res) => {
 const { bookId } = req.params;

  // ✅ Validate that bookId is a proper MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return res.status(400).json({ message: 'Invalid book ID format' });
  }

  // ✅ Check if the book actually exists
  // const bookExists = await MyBook.findById({ _id: bookId });
  // if (!bookExists) {
  //   return res.status(404).json({ message: 'Book not found' });
  // }

  const existing = await MyBook.findOne({ userId: req.user._id, bookId });
  if (existing) {
    return res.status(400).json({ message: 'Book already added to MyBooks' });
  }

  const newEntry = new MyBook({ userId: req.user._id, bookId });
  await newEntry.save()
  res.status(201).json(newEntry);
});





router.patch('/:bookId/status', async (req, res) => {
  const { bookId } = req.params;
  const { status } = req.body;
// console.log(req.user)
  const updated = await MyBook.findOneAndUpdate(
    { _id: bookId, userId: req.user._id }, // ✅ use _id instead of bookId
    { status },
    { new: true }
  );
  
if (!updated) {
  return res.status(404).json({ message: 'Book not found or not updated' });
}


  res.json(updated);
});



router.patch('/:bookId/rating', async (req, res) => {
  const { bookId } = req.params;
  const { rating } = req.body;

  const updated = await MyBook.findOneAndUpdate(
     { _id: bookId, userId: req.user._id },
    { rating },
    { new: true }
  );
  console.log(updated,"hhhhhhhhhh")
  console.log(bookId,"fvjv")
if (!updated) {
  return res.status(404).json({ message: 'Book not found or not updated' });
}
  res.json(updated);
});

module.exports = router;
