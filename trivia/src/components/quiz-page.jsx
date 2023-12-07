import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuizPage = ({ categoryID }) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios.get(`https://opentdb.com/api.php?amount=10&category=${categoryID}`)
      .then((res) => setQuestions(res.data.results));
  }, [categoryID]);

  return (
    <div className="quiz-page">
      {questions.map((quiz) => (
        <Quiz
          key={quiz.id}
          question={quiz.question}
          correctAnswer={quiz.correct_answer}
          incorrectAnswers={quiz.incorrect_answers}
        />
      ))}
    </div>
  );
};

function Quiz({ question, correctAnswer, incorrectAnswers }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const answers = [...incorrectAnswers, correctAnswer];

  const handleAnswerClick = (value) => {
    setSelectedAnswer(value);
    alert(value === correctAnswer ? 'Correct! Well done!' : 'Oops! That\'s incorrect.');
  };

  return (
    <div>
      <h2>{question}</h2>
      <ul>
        {answers.map((answer, idx) => (
          <p
            key={idx}
            onClick={() => handleAnswerClick(answer)}
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