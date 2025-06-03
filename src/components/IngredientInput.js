
import React, { useState, useEffect, useRef } from 'react';
import './IngredientInput.css';

const IngredientInput = ({ onSearch }) => {
  const [input, setInput] = useState('');
  const [filters, setFilters] = useState({
    vegan: false,
    vegetarian: false,
    glutenFree: false,
    dairyFree: false
  });
  const [showFilters, setShowFilters] = useState(true);

  const inputRef = useRef(null);
  const debounceTimer = useRef(null);

  useEffect(() => {
    const savedFilters = localStorage.getItem('filters');
    const savedInput = localStorage.getItem('ingredients');
    if (savedFilters) setFilters(JSON.parse(savedFilters));
    if (savedInput) setInput(savedInput);
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    localStorage.setItem('filters', JSON.stringify(filters));
    if (input.trim()) {
      const ingredients = input.split(',').map(item => item.trim());
      onSearch(ingredients, filters);
    }
  }, [filters]);

  const handleSearch = () => {
    const ingredients = input.split(',').map(item => item.trim());
    if (!ingredients.length || ingredients[0] === "") return;
    localStorage.setItem('ingredients', input);
    onSearch(ingredients, filters);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => handleSearch(), 500);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFilters(prev => ({ ...prev, [name]: checked }));
  };

  const resetFilters = () => {
    setFilters({ vegan: false, vegetarian: false, glutenFree: false, dairyFree: false });
  };

  return (
    <div className="ingredient-input-wrapper">
      <h2>What ingredients do you have?</h2>
      <div className="search-box">
        <input
          type="text"
          placeholder="e.g. chicken, tomato, garlic"
          value={input}
          onChange={handleInputChange}
          ref={inputRef}
        />
        <button onClick={handleSearch}>Search Recipes</button>
      </div>

      <div className="collapsible-toggle">
        <button className="toggle-button" onClick={() => setShowFilters(!showFilters)}>
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      <div className={`collapsible-content ${showFilters ? "" : "hidden"}`}>
        <div className="filter-options">
          <label><input type="checkbox" name="vegan" checked={filters.vegan} onChange={handleCheckboxChange} /> 🥦 Vegan</label>
          <label><input type="checkbox" name="vegetarian" checked={filters.vegetarian} onChange={handleCheckboxChange} /> 🥕 Vegetarian</label>
          <label><input type="checkbox" name="glutenFree" checked={filters.glutenFree} onChange={handleCheckboxChange} /> 🌾 Gluten-Free</label>
          <label><input type="checkbox" name="dairyFree" checked={filters.dairyFree} onChange={handleCheckboxChange} /> 🥛 Dairy-Free</label>
        </div>
        <div className="filter-actions">
          <button className="reset-button" onClick={resetFilters}>Reset Filters</button>
        </div>
      </div>
    </div>
  );
};

export default IngredientInput;
