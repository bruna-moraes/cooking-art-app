import { useContext } from 'react';

import MyContext from '../context/MyContext';

import '../pages/DoneRecipes/index.css';

function FiltersDoneRecipes() {
  const { filterRecipesDone } = useContext(MyContext);

  return (
    <nav className="categories-filters">
      <button
        className="recipe-category-button"
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ filterRecipesDone }
      >
        All
      </button>

      <button
        className="recipe-category-button"
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ filterRecipesDone }
      >
        Meals
      </button>

      <button
        className="recipe-category-button"
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ filterRecipesDone }
      >
        Drinks
      </button>
    </nav>
  );
}

export default FiltersDoneRecipes;
