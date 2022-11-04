import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import Footer from '../../components/Footer';

import './index.css';

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
    <div className="favorite-recipe-page page">
      <Header title="Favorite Recipes" notSearchIcon />
      <main className="recipe-main-content">
        <nav className="categories-filters">
          <button
            className="recipe-category-button"
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ () => getRecipeStorage('All') }
          >
            All
          </button>
          <button
            className="recipe-category-button"
            type="button"
            data-testid="filter-by-meal-btn"
            onClick={ () => getRecipeStorage('Food') }
          >
            Food
          </button>
          <button
            className="recipe-category-button"
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ () => getRecipeStorage('Drinks') }
          >
            Drinks
          </button>
        </nav>
        <section className="recipes-cards-list">
          {recipeStorage !== null && recipeStorage.map((recipe, index) => (
            <div key={ index } className="recipe-card">
              <div className="image-and-name">
                <Link to={ `/${recipe.type}s/${recipe.id}` }>
                  <div className="mask-recipe" />
                  <img
                    className="recipe-image"
                    data-testid={ `${index}-horizontal-image` }
                    src={ recipe.image }
                    alt={ recipe.name }
                  />
                  <h1
                    className="recipe-name"
                    data-testid={ `${index}-horizontal-name` }
                  >
                    {recipe.name}
                  </h1>
                </Link>
              </div>
              <div className="recipe-information">
                <h6
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  { recipe.type === 'meal' ? `${recipe.nationality} - ${recipe.category}`
                    : `${recipe.category}  - ${recipe.alcoholicOrNot}`}
                </h6>
                <div className="interactions-recipe-card">
                  <button
                    className="share-button"
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
                    className="share-button"
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
              </div>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </div>

  );
}

export default FavoriteRecipes;
