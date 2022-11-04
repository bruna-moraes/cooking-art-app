import { useContext, useEffect } from 'react';

import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import MyContext from '../context/MyContext';
import RecipeCard from './RecipeCard';
import CategoryButton from './CategoryButton';

import '../pages/Recipes/index.css';

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
    <div className="recipe-page page">

      <Header title="Meals" />

      <main className="recipe-main-content">
        <nav className="recipe-categories-nav">
          <button
            className="recipe-category-button"
            type="button"
            data-testid="All-category-filter"
            onClick={ () => filterRecipesByCategory('Meals', 'All') }
          >
            All
          </button>
          {
            categories.map(({ strCategory }) => (
              <CategoryButton
                key={ strCategory }
                name={ strCategory }
                onClick={ () => filterRecipesByCategory('Meals', strCategory) }
              />
            ))
          }
        </nav>

        <section className="recipes-cards-list">
          {
            fetchedItems.map((meal, index) => (
              <Link
                className="recipe-card-link"
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
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Meals;
