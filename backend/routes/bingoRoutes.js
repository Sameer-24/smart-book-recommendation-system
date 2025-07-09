const express = require('express');
const router = express.Router();
const BingoBoard = require('../models/BingoBoard');

// GET Bingo board for user and fortnight
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Bingo route working!' });
});

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  const { fortnight } = req.query;

  if (!fortnight) return res.status(400).json({ message: 'Missing fortnight' });

  try {
    const board = await BingoBoard.findOne({ userId, fortnight });
    if (!board) return res.status(404).json({ message: 'Board not found' });

    res.status(200).json({ board: board.board, completed: board.completed });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST Create new Bingo board
router.post('/', async (req, res) => {
  const { userId, fortnight, board } = req.body;

  if (!userId || !fortnight || !board) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const existing = await BingoBoard.findOne({ userId, fortnight });
    if (existing) {
      return res.status(409).json({ message: 'Board already exists for this fortnight' });
    }

    const newBoard = new BingoBoard({ userId, fortnight, board });
    await newBoard.save();
    res.status(201).json({ message: 'Bingo board created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT Update completed cells
router.put('/:userId', async (req, res) => {
  const { userId } = req.params;
  const { fortnight, completed } = req.body;

  if (!fortnight || !Array.isArray(completed)) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  try {
    const board = await BingoBoard.findOneAndUpdate(
      { userId, fortnight },
      { completed },
      { new: true }
    );

    if (!board) return res.status(404).json({ message: 'Board not found' });

    res.status(200).json({ message: 'Completed cells updated', completed: board.completed });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
