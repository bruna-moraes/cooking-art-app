import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Footer from './Footer';
import Header from './Header';
import MyContext from '../context/MyContext';
import RecipeCard from './RecipeCard';
import CategoryButton from './CategoryButton';

function Drinks() {
  const {
    fetchedItems,
    firstLoadFetch,
    categories,
    loadCategories,
    filterRecipesByCategory,
  } = useContext(MyContext);

  useEffect(() => {
    firstLoadFetch('Drinks');
    loadCategories('Drinks');
  }, [firstLoadFetch, loadCategories]);

  return (
    <div className="recipe-page page">

      <Header title="Drinks" />

      <main className="recipe-main-content">
        <nav className="recipe-categories-nav">
          <button
            className="recipe-category-button"
            type="button"
            data-testid="All-category-filter"
            onClick={ () => filterRecipesByCategory('Drinks', 'All') }
          >
            All
          </button>
          {
            categories.map(({ strCategory }) => (
              <CategoryButton
                key={ strCategory }
                name={ strCategory }
                onClick={ () => filterRecipesByCategory('Drinks', strCategory) }
              />
            ))
          }
        </nav>

        <section className="recipes-cards-list">
          {
            fetchedItems.map((drink, index) => (
              <Link
                className="recipe-card-link"
                key={ drink.idDrink }
                to={ `/drinks/${drink.idDrink}` }
              >
                <RecipeCard
                  key={ drink.idDrink }
                  recipe={ {
                    name: drink.strDrink,
                    image: drink.strDrinkThumb,
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

export default Drinks;
