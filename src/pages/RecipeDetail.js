import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const API_KEY = 'b564a3113f4c41bab793ed6de4cb07ad';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipeDetail = async () => {
      const res = await fetch(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
      );
      const data = await res.json();
      setRecipe(data);
    };
    fetchRecipeDetail();
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div>
      <h1>{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} width="400" />
      <h2>Instructions</h2>
      <p dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
      <h3>Ingredients:</h3>
      <ul>
        {recipe.extendedIngredients.map((ing) => (
          <li key={ing.id}>{ing.original}</li>
        ))}
      </ul>
      <p>
        <a href={recipe.sourceUrl} target="_blank" rel="noreferrer">
          View Source
        </a>
      </p>
    
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <a
          href={recipe.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="view-button"
          style={{
            backgroundColor: '#e74c3c',
            color: 'white',
            padding: '10px 20px',
            fontSize: '1rem',
            borderRadius: '30px',
            textDecoration: 'none',
            display: 'inline-block',
            boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
            transition: 'background-color 0.3s ease'
          }}
        >
          View Full Instructions
        </a>
      </div>
    </div>

  );
};

export default RecipeDetail;
