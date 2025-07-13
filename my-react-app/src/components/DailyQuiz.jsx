import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DailyQuiz.css';

function DailyQuiz() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/daily-quiz')
      .then(res => res.json())
      .then(data => {
        const shuffled = data.map(q => ({
          ...q,
          options: shuffleArray([...q.options])
        }));
        setQuestions(shuffled);
      })
      .catch(err => console.error('Failed to load quiz:', err));
  }, []);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleSelect = (option) => {
    setSelected(option);
  };

  const handleSubmit = () => {
    if (!selected) return;

    const correct = questions[current].correct;

    if (selected === correct) {
      setScore(prev => prev + 1);
    } else {
      setWrongAnswers(prev => [...prev, {
        question: questions[current].question,
        correctAnswer: correct,
        userAnswer: selected
      }]);
    }

    setSelected(null);

    if (current < questions.length - 1) {
      setCurrent(prev => prev + 1);
    } else {
      setSubmitted(true);
    }
  };

  const handleRetry = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setSubmitted(false);
    setWrongAnswers([]);
  };

  if (!questions.length) return <p>Loading quiz...</p>;

  return (
    <div className="quiz-container">
      <h2 style={{ marginTop: '40px' }}>📘 Daily Book Quiz</h2>


      {!submitted ? (
        <div className="question-box">
          <h4>{questions[current].question}</h4>
          <ul>
            {questions[current].options.map((opt, idx) => (
              <li
                key={idx}
                onClick={() => handleSelect(opt)}
                className={selected === opt ? 'selected' : ''}
              >
                {opt}
              </li>
            ))}
          </ul>
          <button onClick={handleSubmit} disabled={!selected}>Submit</button>
        </div>
      ) : (
        <div className="result-box">
          <h4 style={{ color: 'green' }}>You scored {score} out of {questions.length}!</h4>

          {wrongAnswers.length > 0 && (
            <>
              <h5>❌ Questions you got wrong:</h5>
              <ul>
                {wrongAnswers.map((item, i) => (
                  <li key={i} style={{ marginBottom: '1rem' }}>
                    <strong>Q:</strong> {item.question} <br />
                    <strong>Your answer:</strong> {item.userAnswer} <br />
                    <strong>Correct answer:</strong> {item.correctAnswer}
                  </li>
                ))}
              </ul>
            </>
          )}

          <div className="mt-3">
            <button onClick={handleRetry} className="btn btn-primary me-2"> Retry</button>
            <button onClick={() => navigate('/')} className="btn btn-secondary"> Go to Home</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DailyQuiz;
