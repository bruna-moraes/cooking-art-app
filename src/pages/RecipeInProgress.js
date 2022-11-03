import '../styles/RecipeInProgress.css';
import PropTypes from 'prop-types';
import { useContext, useEffect, useCallback } from 'react';
import MyContext from '../context/MyContext';
import fetchDetailsApi from '../services/fetchDetailsApi';

function RecipesInProgress({
  history: { location: { pathname } },
  match: { params: { id } },
}) {
  const {
    detailedRecipe,
    getRecipeIngredients,
    setDetailedRecipe } = useContext(MyContext);
  console.log(id);
  console.log(detailedRecipe);

  const getPath = useCallback(() => {
    if (pathname.includes('meals')) {
      return 'themealdb';
    }
    if (pathname.includes('drinks')) {
      return 'thecocktaildb';
    }
  }, [pathname]);

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
    <div>

      <div>
        {
          detailedRecipe.map((e, index) => (
            <div key={ index }>
              <img
                data-testid="recipe-photo"
                src={ e.strMealThumb || e.strDrinkThumb }
                alt={ e.idDrink || e.idMeal }
                style={ { width: 200 } }
              />
              <h3
                data-testid="recipe-title"
              >
                { e.strMeal || e.strDrink }
              </h3>
              <p data-testid="recipe-category">
                {
                  detailedRecipe[0].idMeal ? e.strCategory : e.strAlcoholic
                }
              </p>
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
                        { value }
                        <input
                          className="check-input"
                          type="checkbox"
                          name={ `${i}-ingredient-step` }
                          // onChange={ handleCheck }
                        />
                      </label>
                    </li>
                  ))
                }
              </ol>
              <p data-testid="instructions">{ e.strInstructions }</p>
            </div>
          ))
        }
        <button
          data-testid="share-btn"
          type="button"
        >
          Compartilhar
        </button>

        <button
          data-testid="favorite-btn"
          type="button"
        >
          Favoritar
        </button>

        <button
          data-testid="finish-recipe-btn"
          type="button"
        >
          Finalizar Receita
        </button>
      </div>

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
