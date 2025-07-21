const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/top-picks', async (req, res) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=bestsellers&maxResults=10&orderBy=relevance&key=YOUR_GOOGLE_BOOKS_API_KEY`
    );

    const books = response.data.items.map((item) => ({
      id: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors,
      thumbnail: item.volumeInfo.imageLinks?.thumbnail || '',
      averageRating: item.volumeInfo.averageRating || 'N/A',
      description: item.volumeInfo.description || 'No description available.',
    }));

    res.json(books);
  } catch (error) {
    console.error('Top Picks fetch error:', error.message);
    res.status(500).json({ error: 'Failed to fetch top picks' });
  }
});


router.get('/top-picks/random', async (req, res) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=best+books&maxResults=40&orderBy=relevance&key=${process.env.GOOGLE_BOOKS_API_KEY}`
    );

    const books = response.data.items.map(item => ({
        id: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors || ['Unknown'],
        thumbnail: item.volumeInfo.imageLinks?.thumbnail || '',
        averageRating: item.volumeInfo.averageRating || 'N/A',
        description: item.volumeInfo.description || 'No description available.',
    }));


    const filtered = books.filter(b => b.averageRating >= 3.5);
    const randomBook = filtered[Math.floor(Math.random() * filtered.length)];
    res.json(randomBook);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get random top book' });
  }
});


module.exports = router;
