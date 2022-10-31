import PropTypes from 'prop-types';
import { useContext } from 'react';
import MyContext from '../context/MyContext';

import Meals from '../components/Meals';
import Drinks from '../components/Drinks';

function RecipesInProgress({
  location: { pathname },
  match: { params: { id } },
}) {
  const { detailedRecipe, getRecipeIngredients } = useContext(MyContext);
  console.log(id);
  console.log(detailedRecipe);

  return (
    <div>
      {
        pathname.includes('meals')
          ? <Meals />
          : <Drinks />
      }

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
                    >
                      { value }
                      <label
                        htmlFor="check"
                        data-testid={ `${i}-ingredient-step` }
                      >
                        <input
                          name="check"
                          type="checkbox"
                        />
                      </label>
                    </li>))
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
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default RecipesInProgress;
