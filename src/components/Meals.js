import { useContext, useEffect } from 'react';

import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import MyContext from '../context/MyContext';
import RecipeCard from './RecipeCard';
import CategoryButton from './CategoryButton';

function Meals() {
  const {
    fetchedItems,
    firstLoadFetch,
    categories,
    loadCategories,
    filterRecipesByCategory,
  } = useContext(MyContext);

  useEffect(() => {
    firstLoadFetch('Meals');
    loadCategories('Meals');
  }, [firstLoadFetch, loadCategories]);

  return (
    <div>
      <Header title="Meals" />

      <div>
        {
          categories.map(({ strCategory }) => (
            <CategoryButton
              key={ strCategory }
              name={ strCategory }
              onClick={ () => filterRecipesByCategory('Meals', strCategory) }
            />
          ))
        }

        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => filterRecipesByCategory('Meals', 'All') }
        >
          All
        </button>
      </div>

      {
        fetchedItems.map((meal, index) => (
          <Link
            key={ meal.idMeal }
            to={ `/meals/${meal.idMeal}` }
          >
            <RecipeCard
              recipe={ {
                name: meal.strMeal,
                image: meal.strMealThumb,
              } }
              index={ index }
            />
          </Link>
        ))
      }
      <Footer />
    </div>
  );
}

export default Meals;
