const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});

const Book = mongoose.model("Bookslibrary", bookSchema);

module.exports = Book;