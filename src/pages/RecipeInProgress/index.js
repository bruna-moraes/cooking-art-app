import PropTypes from 'prop-types';
import { useContext, useEffect, useCallback } from 'react';
import MyContext from '../../context/MyContext';
import fetchDetailsApi from '../../services/fetchDetailsApi';

import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

import './index.css';

const copy = require('clipboard-copy');

function RecipesInProgress({
  history: { location: { pathname } },
  match: { params: { id } },
}) {
  const {
    detailedRecipe,
    getRecipeIngredients,
    favoriteRecipe,
    setDetailedRecipe,
    setCopiedLink,
    copiedLink,
  } = useContext(MyContext);

  const getPath = useCallback(() => {
    if (pathname.includes('meals')) {
      return 'themealdb';
    }
    if (pathname.includes('drinks')) {
      return 'thecocktaildb';
    }
  }, [pathname]);

  const clipboardCopy = () => {
    copy(window.location.href);
    setCopiedLink(true);
  };

  const getItem = useCallback(async () => {
    const data = await fetchDetailsApi(getPath(), id);
    setDetailedRecipe(data);
  }, [id, setDetailedRecipe, getPath]);

  useEffect(() => {
    getItem();
  }, [getItem]);

  // const handleCheck = ({ target }) => {
  //   const { checked, name } = target;
  //   if (checked) {
  //     const inputChecked = document.getElementById(name);
  //     inputChecked.classList.add('checked');
  //   }
  // };
  return (
    <div className="recipe-details-page page">
      <div className="interactions-recipe">
        <input
          type="image"
          data-testid="share-btn"
          onClick={ clipboardCopy }
          src={ shareIcon }
          alt="shareicon"
        />
        <input
          type="image"
          data-testid="favorite-btn"
          src={ favoriteRecipe ? blackHeartIcon : whiteHeartIcon }
          alt="favorite-icon"
        />
      </div>
      {
        copiedLink ? <p>Link copied!</p> : null
      }
      <main className="recipe-details-main-content">
        {
          detailedRecipe.map((e, index) => (
            <div key={ index }>
              <img
                className="image-recipe image-recipe-in-progress"
                data-testid="recipe-photo"
                src={ e.strMealThumb || e.strDrinkThumb }
                alt={ e.idDrink || e.idMeal }
              />
              <div className="name-recipe-text">
                <h2
                  data-testid="recipe-title"
                >
                  { e.strMeal || e.strDrink }
                </h2>
                <p data-testid="recipe-category">
                  {
                    detailedRecipe[0].idMeal ? e.strCategory : e.strAlcoholic
                  }
                </p>
              </div>
              <section>
                <h5>Ingredients</h5>
                <ol>
                  {
                    getRecipeIngredients().map((value, i) => (
                      <li
                        key={ i }
                        data-testid={ `${i}-ingredient-name-and-measure` }
                        id={ `${i}-ingredient-step` }
                      >
                        <label
                          className="check-label"
                          htmlFor={ `${i}-ingredient-step` }
                          id={ `${i}-ingredient-step` }
                          data-testid={ `${i}-ingredient-step` }
                        >
                          <input
                            className="check-input"
                            type="checkbox"
                            name={ `${i}-ingredient-step` }
                            // onChange={ handleCheck }
                          />
                          { value }
                        </label>
                      </li>
                    ))
                  }
                </ol>
                <h5>Preparation Mode</h5>
                <p data-testid="instructions">{ e.strInstructions }</p>
              </section>
            </div>
          ))
        }
        <button
          className="start-recipe-button primary-button-enable"
          data-testid="finish-recipe-btn"
          type="button"
        >
          Finalizar Receita
        </button>
      </main>
    </div>
  );
}

RecipesInProgress.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default RecipesInProgress;
