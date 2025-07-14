const express = require('express');
const router = express.Router();
const axios = require('axios');

// GET /api/author-books?name=William%20Shakespeare
router.get('/author-books', async (req, res) => {
  const authorName = req.query.name;

  if (!authorName) {
    return res.status(400).json({ error: 'Author name is required' });
  }

  try {
    const url = `https://openlibrary.org/search.json?author=${encodeURIComponent(authorName)}&limit=20`;
    const response = await axios.get(url);

    res.json(response.data);
  } catch (err) {
    console.error("Error fetching from Open Library:", err.message);
    res.status(500).json({ error: 'Failed to fetch books from Open Library' });
  }
});

module.exports = router;
