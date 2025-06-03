
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IngredientInput from './components/IngredientInput';
import RecipeList from './components/RecipeList';
import RecipeDetail from './pages/RecipeDetail';
import { fetchRecipes } from './api';
import './App.css';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (ingredients, filters) => {
    if (!ingredients.length || ingredients[0] === "") return;
    setLoading(true);
    const result = await fetchRecipes(ingredients, filters);
    setRecipes(result);
    setLoading(false);
  };

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1>Recipe Finder</h1>
                <IngredientInput onSearch={handleSearch} />
                {loading ? <div className="loading-spinner"></div> : <RecipeList recipes={recipes} />}
              </>
            }
          />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
