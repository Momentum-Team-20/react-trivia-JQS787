import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import QuizPage from './components/quiz-page';

function App() {
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://opentdb.com/api_category.php');
        setCategoryList(response.data.trivia_categories);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const chooseCategory = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  if (loading) {
    return <h1>Page loading 💬</h1>;
  }

  return (
    <div>
      <h1>Trivia Game</h1>
      <div className="category-list">
        {categoryList.map((category) => (
          <Category
            key={category.id}
            categoryId={category.id}
            name={category.name}
            selectedCategoryId={selectedCategoryId}
            chooseCategory={chooseCategory}
          />
        ))}
      </div>
    </div>
  );
}

function Category({ categoryId, name, selectedCategoryId, chooseCategory }) {
  const categoryIsSelected = categoryId === selectedCategoryId;

  return (
    <div onClick={() => chooseCategory(categoryId)}>
      {categoryIsSelected ? (
        <QuizPage categoryID={categoryId} />
      ) : (
        <div>{name}</div>
      )}
    </div>
  );
}

export default App;