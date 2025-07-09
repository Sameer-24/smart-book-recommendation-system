import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import './favourite.css';

const authorsList = [

  { name: "J.K. Rowling", image: "https://upload.wikimedia.org/wikipedia/commons/5/5d/J._K._Rowling_2010.jpg" },
  { name: "George Orwell", image: "https://upload.wikimedia.org/wikipedia/commons/9/9f/George_Orwell_press_photo.jpg" },
  { name: "Jane Austen", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/CassandraAusten-JaneAusten%28c.1810%29_hires.jpg/800px-CassandraAusten-JaneAusten%28c.1810%29_hires.jpg" },
  { name: "Agatha Christie", image: "https://upload.wikimedia.org/wikipedia/commons/d/d6/Agatha_Christie.png" },
  { name: "Mark Twain", image: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Mark_Twain_by_AF_Bradley.jpg" },
  { name: "Ernest Hemingway", image: "https://upload.wikimedia.org/wikipedia/commons/5/5d/ErnestHemingway.jpg" },
  { name: "Stephen King", image: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Stephen_King%2C_Comicon.jpg" },
  { name: "J.R.R. Tolkien", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Tolkien_1916.jpg/800px-Tolkien_1916.jpg" },
  { name: "Leo Tolstoy", image: "https://upload.wikimedia.org/wikipedia/commons/4/4f/L.N.Tolstoy_Prokudin-Gorsky.jpg" },
  { name: "Harper Lee", image: "https://upload.wikimedia.org/wikipedia/commons/8/89/Harper_Lee_Nov07.jpg" },
  { name: "Charles Dickens", image: "https://upload.wikimedia.org/wikipedia/commons/2/23/Dickens_Gurney_head.jpg" },
  { name: "F. Scott Fitzgerald", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/F_Scott_Fitzgerald_1921.jpg/800px-F_Scott_Fitzgerald_1921.jpg" },
  { name: "Virginia Woolf", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/George_Charles_Beresford_-_Virginia_Woolf_in_1902_-_Restoration.jpg/800px-George_Charles_Beresford_-_Virginia_Woolf_in_1902_-_Restoration.jpg" },
  { name: "Oscar Wilde", image: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Oscar_Wilde_Sarony.jpg" },
  { name: "H.G. Wells", image: "https://upload.wikimedia.org/wikipedia/commons/b/be/H_G_Wells_pre_1922.jpg" },
  { name: "J.D. Salinger", image: "https://upload.wikimedia.org/wikipedia/commons/7/77/Jd_salinger.jpg" },
  { name: "Toni Morrison", image: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Toni_Morrison_2008.jpg" },
  { name: "Kurt Vonnegut", image: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Kurt_Vonnegut_1972.jpg" },
  { name: "Sylvia Plath", image: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Sylvia_Plath.jpg" },
  { name: "Chinua Achebe", image: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Chinua_Achebe%2C_Nigeria_%28cropped%29.jpg" },
  { name: "Gabriel García Márquez", image: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Gabriel_Garcia_Marquez.jpg" },
  { name: "C.S. Lewis", image: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Cs_lewis.jpg" },
  { name: "Neil Gaiman", image: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Neil_Gaiman_2009.jpg" },
  { name: "Margaret Atwood", image: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Margaret_Atwood.jpg" },
  { name: "Dan Brown", image: "https://upload.wikimedia.org/wikipedia/commons/8/85/Dan_Brown_Nov_2015.jpg" }


];

const genresList = [
  { name: "Fantasy", image: "https://images.unsplash.com/photo-1527771832931-37996c89f5a1" },
  { name: "Science Fiction", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" },
  { name: "Romance", image: "https://images.unsplash.com/photo-1495555687392-4d71bcdd2085" },
  { name: "Mystery", image: "https://images.unsplash.com/photo-1495653797063-114787b77b23" },
  { name: "Thriller", image: "https://images.unsplash.com/photo-1549921296-3a23b748f9a5" },
  { name: "Historical", image: "https://images.unsplash.com/photo-1473755504818-b72b6dfdc226" },
  { name: "Biography", image: "https://images.unsplash.com/photo-1544717305-996b815c338c" },
  { name: "Horror", image: "https://images.unsplash.com/photo-1507962539432-9f1f0455a1e3" },
  { name: "Self-help", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f" },
  { name: "Travel", image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800" },
  { name: "Adventure", image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828" },
  { name: "Drama", image: "https://images.unsplash.com/photo-1603575448363-3ab9cfb52556" },
  { name: "Poetry", image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66" },
  { name: "Classic", image: "https://images.unsplash.com/photo-1576103456075-837a0aa5f518" },
  { name: "Young Adult", image: "https://images.unsplash.com/photo-1613554353927-e4852d6c1515" },
  { name: "Children", image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f" },
  { name: "Cooking", image: "https://images.unsplash.com/photo-1498579809087-ef1e558fd1da" },
  { name: "Health", image: "https://images.unsplash.com/photo-1603398938378-990d4b18397f" },
  { name: "Psychology", image: "https://images.unsplash.com/photo-1588776814546-bcdb5e2e7841" },
  { name: "Business", image: "https://images.unsplash.com/photo-1533750516457-a7f992034fec" },
  { name: "Spiritual", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" },
  { name: "Philosophy", image: "https://images.unsplash.com/photo-1532614338840-ab30cf10ed1c" },
  { name: "Comics", image: "https://images.unsplash.com/photo-1578926276527-6d57db768826" },
  { name: "Art", image: "https://images.unsplash.com/photo-1529101091764-c3526daf38fe" },
  { name: "Education", image: "https://images.unsplash.com/photo-1556012018-0dfc29c7e117" }
];

function FavoriteOnboarding() {
  const [step, setStep] = useState(1);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const userData = location.state;

  if (!userData || !userData.id) {
    navigate('/signup');
    return null;
  }

  const toggleItem = (name, setSelected) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const handleContinue = async () => {
    if (step === 1) {
      setStep(2);
    } else {
      try {
        const res = await axios.post(
          'http://localhost:5000/api/auth/finalize-signup',
          {
            id: userData.id,
            favoriteGenres: selectedGenres,
            favoriteAuthors: selectedAuthors
          },
          { withCredentials: true }
        );

        if (res.status === 200) {
          const meRes = await axios.get('http://localhost:5000/api/auth/me', {
            withCredentials: true
          });

          login(meRes.data);
          navigate('/');
        } else {
          setErrorMsg('Failed to save preferences. Please try again.');
        }
      } catch (err) {
        console.error('❌ Finalize error:', err.message);
        setErrorMsg('Something went wrong. Try again.');
      }
    }
  };

  return (
    <div className="fav-page">
      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

      {step === 1 ? (
        <>
          <h2>Select Your Favorite Authors</h2>
          <div className="circle-grid">
            {authorsList.map((author) => (
              <div
                key={author.name}
                className={`circle-item ${selectedAuthors.includes(author.name) ? "selected" : ""}`}
                onClick={() => toggleItem(author.name, setSelectedAuthors)}
              >
                <img src={author.image} alt={author.name} />
                <span>{author.name}</span>
              </div>
            ))}
          </div>
          <button
            className="continue-btn"
            onClick={handleContinue}
            disabled={selectedAuthors.length === 0}
          >
            Continue
          </button>
        </>
      ) : (
        <>
          <h2>Select Your Favorite Genres</h2>
          <div className="circle-grid">
            {genresList.map((genre) => (
              <div
                key={genre.name}
                className={`circle-item ${selectedGenres.includes(genre.name) ? "selected" : ""}`}
                onClick={() => toggleItem(genre.name, setSelectedGenres)}
              >
                <img src={genre.image} alt={genre.name} />
                <span>{genre.name}</span>
              </div>
            ))}
          </div>
          <button
            className="continue-btn"
            onClick={handleContinue}
            disabled={selectedGenres.length === 0}
          >
            Create Account
          </button>
        </>
      )}
    </div>
  );
}

export default FavoriteOnboarding;
