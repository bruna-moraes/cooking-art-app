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
    <div>
      <Header title="Drinks" />

      <div>
        {
          categories.map(({ strCategory }) => (
            <CategoryButton
              key={ strCategory }
              name={ strCategory }
              onClick={ () => filterRecipesByCategory('Drinks', strCategory) }
            />
          ))
        }

        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => filterRecipesByCategory('Drinks', 'All') }
        >
          All
        </button>
      </div>

      {
        fetchedItems.map((drink, index) => (
          <Link
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
      <Footer />
    </div>
  );
}

export default Drinks;
