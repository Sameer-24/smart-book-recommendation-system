import React, { useEffect, useState } from 'react';
import axios from 'axios';
import confetti from 'canvas-confetti';
import './bingo.css';
import { useAuth } from '../context/AuthContext';

const TASKS = [
  "Read a book with a blue cover",
  "Read a mystery novel",
  "Read a classic",
  "Read a book by a female author",
  "Read a book under 200 pages",
  "Read a non-fiction book",
  "Read a book published this year",
  "Read a fantasy novel",
  "Read a book set in another country",
  "Read a book with a one-word title",
  "Read a graphic novel",
  "Read a debut novel",
  "Read a banned book",
  "Read a book about history",
  "Read a book with a number in the title",
  "Read a book recommended by a friend",
  "Read a book from your wishlist",
  "Read a book that became a movie",
  "Read a book from a different genre",
  "Read a book with animals",
  "Read a horror book",
  "Read a biography",
  "Read a romance book",
  "Read a sci-fi novel",
  "Read a book by an Indian author",
];

const getFortnightKey = () => {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const daysSince = Math.floor((now - startOfYear) / (1000 * 60 * 60 * 24));
  return Math.floor(daysSince / 14);
};

const BingoBoard = () => {
  const { user } = useAuth();
  const [board, setBoard] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [bingo, setBingo] = useState(false);

  const fortnightKey = getFortnightKey();

  const fetchBingoBoard = async () => {
    try {
      const res = await axios.get(`/bingo/${user._id}?fortnight=${fortnightKey}`);
      if (res.data && res.data.board) {
        setBoard(res.data.board);
        setCompleted(res.data.completed || []);
        checkBingo(res.data.completed || []);
      }
    } catch (err) {
      console.error('Bingo fetch failed:', err.message);
    }
  };

  const generateBooksForTasks = async () => {
    const tasks = [...TASKS].sort(() => 0.5 - Math.random()).slice(0, 25);
    const boardData = await Promise.all(
      tasks.map(async (task) => {
        try {
          const res = await axios.get(
            `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(task)}&maxResults=1&key=YOUR_GOOGLE_BOOKS_API_KEY`
          );
          const book = res.data.items?.[0];
          return {
            task,
            book: book ? {
              title: book.volumeInfo.title,
              authors: book.volumeInfo.authors?.join(', '),
              thumbnail: book.volumeInfo.imageLinks?.thumbnail,
              infoLink: book.volumeInfo.infoLink,
            } : null
          };
        } catch {
          return { task, book: null };
        }
      })
    );

    try {
      await axios.post(`/bingo`, {
        userId: user._id,
        fortnight: fortnightKey,
        board: boardData,
      });
      setBoard(boardData);
      setCompleted([]);
    } catch (err) {
      console.error('Error generating new bingo board:', err.message);
    }
  };

  const handleCellClick = async (index) => {
    const newCompleted = completed.includes(index)
      ? completed.filter(i => i !== index)
      : [...completed, index];

    setCompleted(newCompleted);
    await axios.put(`/bingo/${user._id}`, {
      fortnight: fortnightKey,
      completed: newCompleted,
    });

    checkBingo(newCompleted);
  };

  const checkBingo = (marked) => {
  const isComplete = (indices) => indices.every(i => marked.includes(i));
  const lines = [];

  for (let i = 0; i < 5; i++) {
    lines.push([0, 1, 2, 3, 4].map(j => i * 5 + j)); // rows
    lines.push([0, 1, 2, 3, 4].map(j => j * 5 + i)); // columns
  }
  lines.push([0, 6, 12, 18, 24]); // diagonal \
  lines.push([4, 8, 12, 16, 20]); // diagonal /

  for (const line of lines) {
    if (isComplete(line)) {
      if (!bingo) {
        setBingo(true);
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.6 }
        });
      }
      return;
    }
  }

  setBingo(false);
};


  const handleShare = () => {
    const shareText = `🎉 I just completed a row in Book Bingo on SmartGuide! 📚 #BookBingo`;
    if (navigator.share) {
      navigator.share({ title: 'Book Bingo', text: shareText, url: window.location.href });
    } else {
      navigator.clipboard.writeText(`${shareText} - ${window.location.href}`);
      alert('Bingo progress copied! Share it anywhere 🎉');
    }
  };

  const handleRefreshBoard = async () => {
    const confirmReset = window.confirm("Are you sure you want to reset your Bingo board?");
    if (!confirmReset) return;

    try {
      // Option 1: Reset completed only
      await axios.put(`/bingo/${user._id}`, {
        fortnight: fortnightKey,
        completed: [],
      });
      setCompleted([]);
      setBingo(false);

      // Option 2: Uncomment to regenerate board completely
      // await generateBooksForTasks();

      alert('✅ Bingo board reset!');
    } catch (err) {
      console.error("Error resetting board:", err.message);
      alert('❌ Failed to reset Bingo board');
    }
  };

  useEffect(() => {
    if (user) fetchBingoBoard();
  }, [user]);

  useEffect(() => {
    if (board.length === 0 && user) generateBooksForTasks();
  }, [board, user]);

  useEffect(() => {
    if (completed.length) checkBingo(completed);
  }, [completed]);

  if (!user) return <p>🔒 Please log in to play Book Bingo.</p>;

  return (
    <div className="bingo-container">
      <h2>📚 Book Bingo</h2>

      <button className="refresh-button" onClick={handleRefreshBoard}>
        🔁 Refresh Bingo Board
      </button>

      {board.length === 0 ? (
        <p>Loading your Bingo board...</p>
      ) : (
        <div className="bingo-grid">
          {board.map((cell, index) => (
            <div
              key={index}
              className={`bingo-cell ${completed.includes(index) ? 'completed' : ''}`}
              onClick={() => handleCellClick(index)}
            >
              <div className="task">{cell.task}</div>
              {cell.book && (
                <div className="book">
                  <img src={cell.book.thumbnail} alt={cell.book.title} />
                  <p>{cell.book.title}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {bingo && (
        <div className="bingo-popup">
          🎉 Bingo! You've completed a row or column!
          <button onClick={handleShare}>Share</button>
        </div>
      )}
    </div>
  );
};

export default BingoBoard;
