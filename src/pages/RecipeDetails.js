import PropTypes from 'prop-types';
import { useCallback, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../context/MyContext';
import fetchDetailsApi from '../services/fetchDetailsApi';
import DetailedRecipeCard from '../components/DetailedRecipeCard';
import fetchRecomendations from '../services/fetchRecomendations';
import Recomendations from '../components/Recomendations';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function RecipeDetails({
  history: { location: { pathname } },
  match: { params: { id } },
}) {
  const {
    setDetailedRecipe,
    setRecomendations,
    inProgressRecipe,
    setInProgressRecipe,
    copiedLink,
    setCopiedLink,
    detailedRecipe } = useContext(MyContext);

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

  const getRecomendations = useCallback(async () => {
    const data = await fetchRecomendations(pathname);
    setRecomendations(data);
  }, [setRecomendations, pathname]);

  const handleDisableBtn = () => {
    const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const result = recipes.some((recipe) => recipe.id === id);

    return result;
  };

  const inProgressCheck = useCallback(() => {
    let type;

    if (pathname.includes('meals')) {
      type = 'meals';
    }

    if (pathname.includes('drinks')) {
      type = 'drinks';
    }

    const inProgressRecipes = localStorage.getItem('inProgressRecipes')
      ? JSON.parse(localStorage.getItem('inProgressRecipes'))
      : { drinks: {}, meals: {} };

    const check = (
      Object.keys(inProgressRecipes[type]).some((recipeId) => recipeId === id));

    if (check === true) setInProgressRecipe(true);
  }, [id, pathname, setInProgressRecipe]);

  const clipboardCopy = () => {
    copy(window.location.href);
    setCopiedLink(true);
  };

  const handleSetFavorite = () => {
    const favoriteRecipes = localStorage.getItem('favoriteRecipes');

    if (pathname.includes('meals')) {
      const { idMeal, strArea, strCategory, strMeal, strMealThumb } = detailedRecipe[0];
      const favoriteMeal = {
        id: idMeal,
        type: 'meal',
        nationality: strArea,
        category: strCategory,
        alcoholicOrNot: '',
        name: strMeal,
        image: strMealThumb,
      };
      if (!favoriteRecipes) {
        localStorage.setItem('favoriteRecipes', JSON.stringify([favoriteMeal]));
      } else {
        const parsedObj = JSON.parse(favoriteRecipes);
        localStorage.setItem('favoriteRecipes', JSON
          .stringify([...parsedObj, favoriteMeal]));
      }
    }

    if (pathname.includes('drinks')) {
      const { idDrink, strArea, strCategory,
        strAlcoholic, strDrink, strDrinkThumb } = detailedRecipe[0];
      const favoriteDrink = {
        id: idDrink,
        type: 'drink',
        nationality: strArea || '',
        category: strCategory || '',
        alcoholicOrNot: strAlcoholic,
        name: strDrink,
        image: strDrinkThumb,
      };
      if (!favoriteRecipes) {
        localStorage.setItem('favoriteRecipes', JSON.stringify([favoriteDrink]));
      } else {
        const parsedObj = JSON.parse(favoriteRecipes);
        localStorage.setItem('favoriteRecipes', JSON
          .stringify([...parsedObj, favoriteDrink]));
      }
    }
  };

  useEffect(() => {
    getItem();
    getRecomendations();
    inProgressCheck();
  }, [getItem, getRecomendations, inProgressCheck]);

  return (
    <div>
      <div>
        <button
          type="button"
          data-testid="share-btn"
          onClick={ clipboardCopy }
        >
          <img src={ shareIcon } alt="shareicon" />
        </button>
        <button
          type="button"
          data-testid="favorite-btn"
          onClick={ handleSetFavorite }
        >
          Favoritar
        </button>
        {
          copiedLink ? <p>Link copied!</p> : null
        }
      </div>
      <DetailedRecipeCard />
      <Recomendations />
      <Link to={ `${pathname}/in-progress` }>
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="start-recipe-btn"
          disabled={ handleDisableBtn }
        >
          { inProgressRecipe ? 'Continue Recipe' : 'Start Recipe' }
        </button>
      </Link>
    </div>
  );
}

RecipeDetails.propTypes = {
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

export default RecipeDetails;
