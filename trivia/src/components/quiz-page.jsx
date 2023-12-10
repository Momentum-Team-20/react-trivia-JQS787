import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './QuizPage.css';

const QuizPage = ({ categoryID }) => {
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    axios.get(`https://opentdb.com/api.php?amount=10&category=${categoryID}`)
      .then((res) => setQuestions(res.data.results));
  }, [categoryID]);

  const handleAnswerClick = (value, correctAnswer) => {
    if (value === correctAnswer) {
      setScore(score + 1);
    }
    // Add your logic for handling correct/incorrect answers
  };

  return (
    <div className="quiz-page">
      {questions.map((quiz, index) => (
        <Quiz
          key={index}
          question={quiz.question}
          correctAnswer={quiz.correct_answer}
          incorrectAnswers={quiz.incorrect_answers}
          onAnswerClick={(value) => handleAnswerClick(value, quiz.correct_answer)}
        />
      ))}
      <div className="score">Score: {score} / {questions.length}</div>
    </div>
  );
};

function Quiz({ question, correctAnswer, incorrectAnswers, onAnswerClick }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const answers = [...incorrectAnswers, correctAnswer];

  const handleAnswerClickInternal = (value) => {
    setSelectedAnswer(value);
    onAnswerClick(value);
  };

  return (
    <div>
      <h2>{question}</h2>
      <ul>
        {answers.map((answer, idx) => (
          <p
            key={idx}
            onClick={() => handleAnswerClickInternal(answer)}
            className={selectedAnswer === answer ? (answer === correctAnswer ? 'correct' : 'incorrect') : ''}
          >
            {answer}
          </p>
        ))}
      </ul>
    </div>
  );
}

export default QuizPage;
