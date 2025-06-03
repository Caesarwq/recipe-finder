
import React from 'react';
import { Link } from 'react-router-dom';
import './RecipeList.css';

const RecipeList = ({ recipes }) => {
  if (!recipes || recipes.length === 0) {
    return <p>No recipes found.</p>;
  }

  return (
    <div className="recipe-grid">
      {recipes.map((recipe) => (
        <div className="recipe-card" key={recipe.id}>
          {recipe.image && (
            <img src={recipe.image} alt={recipe.title} />
          )}

          <div className="recipe-tags">
            {recipe.glutenFree && <span className="recipe-tag glutenFree">Gluten Free</span>}
            {recipe.vegan && <span className="recipe-tag vegan">Vegan</span>}
            {recipe.vegetarian && <span className="recipe-tag vegetarian">Vegetarian</span>}
            {recipe.dairyFree && <span className="recipe-tag dairyFree">Dairy Free</span>}
            {recipe.veryHealthy && <span className="recipe-tag healthy">Healthy</span>}
            {recipe.cheap && <span className="recipe-tag cheap">Cheap</span>}
            {recipe.readyInMinutes <= 30 && <span className="recipe-tag quick">Quick</span>}
            {recipe.calories && recipe.calories < 300 && <span className="recipe-tag lowcal">Low Cal</span>}
          </div>

          <h3>
            <Link to={`/recipe/${recipe.id}`} className="recipe-link">
              {recipe.title || 'No title'}
            </Link>
          </h3>

          <p
            dangerouslySetInnerHTML={{
              __html: recipe.summary || 'No summary available.',
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
