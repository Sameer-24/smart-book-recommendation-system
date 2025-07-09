const mongoose = require('mongoose');

const bingoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // adjust to your actual User model name
    required: true,
  },
  fortnight: {
    type: Number,
    required: true,
  },
  board: [
    {
      task: String,
      book: {
        title: String,
        authors: String,
        thumbnail: String,
        infoLink: String,
      },
    },
  ],
  completed: {
    type: [Number], // indexes of completed cells
    default: [],
  },
});

bingoSchema.index({ userId: 1, fortnight: 1 }, { unique: true });

module.exports = mongoose.model('BingoBoard', bingoSchema);
