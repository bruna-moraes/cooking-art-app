import { useContext } from 'react';

import MyContext from '../context/MyContext';

function FiltersDoneRecipes() {
  const { filterRecipesDone } = useContext(MyContext);

  return (
    <nav>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ filterRecipesDone }
      >
        All
      </button>

      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ filterRecipesDone }
      >
        Meals
      </button>

      <button
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
