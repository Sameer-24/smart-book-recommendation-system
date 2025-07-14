// server.js
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');
const cron = require('node-cron');
const axios = require('axios');
const fs = require('fs');
const he = require('he');
const cookieParser = require('cookie-parser');
const booksRoute = require('./routes/books');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const bingoRoutes = require('./routes/bingoRoutes');
const Article = require('./models/Article');
const Book = require('./models/TrendingBook');
const Review = require('./models/Review');
const fetchRSSArticles = require('./rssFetcher');



const app = express();
const server = http.createServer(app);

// ✅ CORS Config
const allowedOrigins = [
  'http://localhost:5173',
  'https://qxrw0bs9-5173.inc1.devtunnels.ms'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// ✅ Socket.io CORS
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  }
});

// ✅ Middleware
app.use(cookieParser());
app.use(express.json());


// ✅ MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    fetchRSSArticles(io);
    fetchTrendingBooks();
    updateDailyQuiz();
  })
  .catch(err => console.error('❌ MongoDB error:', err));

// ✅ Real-time socket
io.on('connection', (socket) => {
  console.log('🟢 User connected');
  socket.on('disconnect', () => console.log('🔴 User disconnected'));
});

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/bingo', bingoRoutes);
app.use('/api', booksRoute);


// ✅ Article routes
app.post('/api/articles', async (req, res) => {
  const article = new Article(req.body);
  await article.save();
  io.emit('new-article', article);
  res.status(201).json(article);
});

app.get('/api/articles', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: -1 }).limit(13);
  res.json(articles);
});

// ✅ Trending books
app.get('/api/trending', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    console.error('❌ Trending fetch failed:', err.message);
    res.status(500).json({ error: 'Trending fetch failed' });
  }
});

// ✅ Reviews
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 }).limit(8);
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

app.post('/api/reviews', async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    io.emit('new-review', review);
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save review' });
  }
});

// ✅ Quiz logic
let dailyQuizCache = null;
let cachedDate = '';

function getShuffledOptions(options) {
  const shuffled = [...options];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const fallbackQuestions = [
  {
    question: "Who wrote 'Pride and Prejudice'?",
    options: ["Charlotte Brontë", "Jane Austen", "Emily Dickinson", "George Eliot"],
    correct: "Jane Austen"
  },
  {
    question: "Which book series is authored by J.K. Rowling?",
    options: ["The Chronicles of Narnia", "Percy Jackson", "Harry Potter", "Eragon"],
    correct: "Harry Potter"
  }
];

const updateDailyQuiz = async () => {
  try {
    const tokenRes = await fetch('https://opentdb.com/api_token.php?command=request');
    const tokenData = await tokenRes.json();
    const token = tokenData.token;
    const quizURL = `https://opentdb.com/api.php?amount=5&type=multiple&token=${token}`;

    const { data } = await axios.get(quizURL);

    if (data.response_code !== 0 || !data.results.length) {
      throw new Error('Invalid OpenTDB response');
    }

    const formatted = data.results.map(q => {
      const allOptions = [...q.incorrect_answers, q.correct_answer];
      return {
        question: he.decode(q.question),
        options: allOptions.map(opt => he.decode(opt)),
        correct: he.decode(q.correct_answer)
      };
    });

    fs.writeFileSync('./quiz.json', JSON.stringify(formatted, null, 2));
    dailyQuizCache = formatted;
    cachedDate = new Date().toISOString().split('T')[0];
    console.log('✅ Daily quiz updated');
  } catch (err) {
    console.error('❌ Fetch quiz failed:', err.message);
    fs.writeFileSync('./quiz.json', JSON.stringify(fallbackQuestions, null, 2));
    dailyQuizCache = fallbackQuestions;
    cachedDate = new Date().toISOString().split('T')[0];
  }
};

app.get('/api/daily-quiz', (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  if (dailyQuizCache && cachedDate === today) {
    return res.json(dailyQuizCache);
  }

  try {
    const data = fs.readFileSync('./quiz.json');
    const allQuestions = JSON.parse(data);
    const dailyQuestions = allQuestions.map(q => ({
      question: q.question,
      options: getShuffledOptions(q.options),
      correct: q.correct
    }));
    dailyQuizCache = dailyQuestions;
    cachedDate = today;
    res.json(dailyQuizCache);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load daily quiz' });
  }
});

// ✅ Homepage route
app.get('/', (req, res) => {
  res.send('✅ SmartGuide API is running!');
});

// ✅ CRON Schedules
cron.schedule('*/10 * * * *', () => {
  console.log('⏰ Cron: Fetching latest articles...');
  fetchRSSArticles(io);
});

cron.schedule('0 * * * *', async () => {
  console.log('📚 Cron: Updating trending books...');
  await fetchTrendingBooks();
});

cron.schedule('0 0 * * *', () => {
  console.log('🧠 Cron: Updating daily quiz...');
  updateDailyQuiz();
});

// ✅ Trending books fetch
async function fetchTrendingBooks() {
  const GOOGLE_API_KEY = process.env.GOOGLE_BOOKS_API_KEY;
  const url = `https://www.googleapis.com/books/v1/volumes?q=subject:fiction&orderBy=relevance&maxResults=18&key=${GOOGLE_API_KEY}`;

  try {
    const response = await axios.get(url);
    const books = response.data.items.map((item) => ({
      title: item.volumeInfo.title,
      author: item.volumeInfo.authors?.[0] || 'Unknown',
      thumbnail: item.volumeInfo.imageLinks?.thumbnail || '',
      infoLink: item.volumeInfo.infoLink || '',
      description: item.volumeInfo.description || '',
    }));

    await Book.deleteMany({});
    await Book.insertMany(books);
    console.log('✅ Trending books updated.');
  } catch (error) {
    console.error('❌ Error fetching trending books:', error.message);
  }
}

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
