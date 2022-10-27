import PropTypes from 'prop-types';
import { useCallback, useContext, useEffect } from 'react';
import Meals from '../components/Meals';
import Drinks from '../components/Drinks';
import MyContext from '../context/MyContext';
import fetchDetailsApi from '../services/fetchDetailsApi';

function RecipesDetails({
  history: { location: { pathname } },
  match: { params: { id } },
}) {
  const { setDetailedRecipe, detailedRecipe } = useContext(MyContext);
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

  // const ingredients = Object
  //   .keys(detailedRecipe).filter((e) => e.includes('strIngredient'));
  // console.log(ingredients);

  return (
    <div>
      {
        pathname.includes('meals')
          ? <Meals />
          : <Drinks />
      }
      {
        detailedRecipe.map((e, index) => (
          <div key={ index }>

            <img
              data-testid="recipe-photo"
              src={ e.strMealThumb || e.strDrinkThumb }
              alt={ e.idDrink || e.idMeal }
            />
            <h3
              data-testid="recipe-title"
            >
              { e.strMeal }
            </h3>
            <p data-testid="recipe-category">{ e.strCategory}</p>
            <ul>
              {
                ingredients.map((el, indexIngredient) => (

                  <li
                    key={ indexIngredient }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    { `${Object.keys(el)[0]} - ${Object.values(el)[0]}` }

                  </li>
                ))
              }

            </ul>
            <p data-testid="instructions">{ e.strInstructions}</p>
            <iframe
              data-testid="video"
              width="853"
              height="480"
              title="Embedded youtube"
              src={ e.strYoutube }
            />
          </div>
        ))
      }
    </div>
  );
}

RecipesDetails.propTypes = {
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

export default RecipesDetails;
