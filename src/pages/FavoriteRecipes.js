import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
// Refatorar codigo
function FavoriteRecipes() {
  const [recipeStorage, setRecipeStorage] = useState(['All']);

  const getRecipeStorage = (type) => {
    const getFavoriteRecipe = JSON.parse(localStorage.getItem('favoriteRecipes'));

    switch (type) {
    case 'All':
      setRecipeStorage(JSON.parse(localStorage.getItem('favoriteRecipes')));
      break;
    case 'Food':
      setRecipeStorage(getFavoriteRecipe.filter((comida) => comida.type === 'meal'));
      break;
    case 'Drinks':
      setRecipeStorage(getFavoriteRecipe.filter((bebida) => bebida.type === 'drink'));
      break;
    default:
      setRecipeStorage(recipeStorage);
    }
  };

  useEffect(() => {
    setRecipeStorage(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }, []);

  return (
    <div>
      <Header title="Favorite Recipes" notSearchIcon />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => getRecipeStorage('All') }
        >
          All
        </button>

        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => getRecipeStorage('Food') }
        >
          Food
        </button>

        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => getRecipeStorage('Drinks') }
        >
          Drinks
        </button>
      </div>
      {recipeStorage !== null && recipeStorage.map((recipe, index) => (
        <div key={ index }>
          <div>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                alt={ recipe.name }
              />
            </Link>
            <h6
              data-testid={ `${index}-horizontal-top-text` }
            >
              { recipe.type === 'meal' ? `${recipe.nationality} - ${recipe.category}`
                : `${recipe.category}  - ${recipe.alcoholicOrNot}`}
            </h6>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <h4
                data-testid={ `${index}-horizontal-name` }
              >
                {recipe.name}
              </h4>
            </Link>
          </div>
          <button
            type="button"
            data-testid="share-btn"
          >
            <img
              src={ shareIcon }
              alt="share icon"
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>
          <button
            type="button"
            data-testid="favorite-btn"
          >
            <img
              src={ blackHeartIcon }
              alt="black Heart icon"
              data-testid={ `${index}-horizontal-favorite-btn` }
            />
          </button>
        </div>
      ))}

    </div>

  );
}

export default FavoriteRecipes;
