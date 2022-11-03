import PropTypes from 'prop-types';
import { useCallback, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import MyContext from '../context/MyContext';
import fetchDetailsApi from '../services/fetchDetailsApi';
import DetailedRecipeCard from '../components/DetailedRecipeCard';
import fetchRecomendations from '../services/fetchRecomendations';
import Recomendations from '../components/Recomendations';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

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
    detailedRecipe,
    favoriteRecipe,
    setFavoriteRecipe,
    hiddenStartBtn,
    setHiddenStartBtn } = useContext(MyContext);

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

  const hideStartBtn = useCallback(() => {
    const recipes = localStorage.getItem('doneRecipes')
      ? JSON.parse(localStorage.getItem('doneRecipes'))
      : [{}];
    const result = recipes.some((recipe) => recipe.id === id);
    setHiddenStartBtn(result);
  }, [id, setHiddenStartBtn]);

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

  const copy = () => {
    clipboardCopy(window.location.href);
    setCopiedLink(true);
  };

  const updateBtnCheck = (object, favoriteItem) => {
    if (object.some((item) => item.id === favoriteItem.id)) {
      const removeObj = object.filter((e) => e.id !== favoriteItem.id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(removeObj));
      setFavoriteRecipe(false);
    }
  };

  const handleSetFavorite = () => {
    const favoriteRecipes = localStorage.getItem('favoriteRecipes');

    if (pathname.includes('meals')) {
      const { idMeal, strArea, strCategory, strMeal, strMealThumb } = detailedRecipe[0];
      const favoriteMeal = {
        id: idMeal,
        type: 'meal',
        nationality: strArea || '',
        category: strCategory,
        alcoholicOrNot: '',
        name: strMeal,
        image: strMealThumb,
      };
      if (!favoriteRecipes) {
        localStorage.setItem('favoriteRecipes', JSON.stringify([favoriteMeal]));
        setFavoriteRecipe(true);
      } else {
        const parsedObj = JSON.parse(favoriteRecipes);
        localStorage.setItem('favoriteRecipes', JSON
          .stringify([...parsedObj, favoriteMeal]));
        setFavoriteRecipe(true);
        updateBtnCheck(parsedObj, favoriteMeal);
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
        setFavoriteRecipe(true);
      } else {
        const parsedObj = JSON.parse(favoriteRecipes);
        localStorage.setItem('favoriteRecipes', JSON
          .stringify([...parsedObj, favoriteDrink]));
        setFavoriteRecipe(true);
        updateBtnCheck(parsedObj, favoriteDrink);
      }
    }
  };

  const favoriteCheck = useCallback(() => {
    const favoriteRecipes = localStorage.getItem('favoriteRecipes')
      ? JSON.parse(localStorage.getItem('favoriteRecipes'))
      : [{ id: '' }];

    const check = favoriteRecipes.some((recipe) => recipe.id === id);
    setFavoriteRecipe(check);
  }, [id, setFavoriteRecipe]);

  useEffect(() => {
    getItem();
    getRecomendations();
    inProgressCheck();
    favoriteCheck();
    hideStartBtn();
  }, [getItem, getRecomendations, inProgressCheck, favoriteCheck, hideStartBtn]);

  return (
    <div>
      <div>
        <input
          type="image"
          data-testid="share-btn"
          onClick={ copy }
          src={ shareIcon }
          alt="shareicon"
          style={ { marginLeft: 10, marginRight: 10 } }
        />
        <input
          type="image"
          data-testid="favorite-btn"
          onClick={ handleSetFavorite }
          src={ favoriteRecipe ? blackHeartIcon : whiteHeartIcon }
          alt="favorite-icon"
        />
        {
          copiedLink ? <p>Link copied!</p> : null
        }
      </div>
      <DetailedRecipeCard />
      <Recomendations />
      {
        hiddenStartBtn
          ? null
          : (
            <Link to={ `${pathname}/in-progress` }>
              <button
                type="button"
                data-testid="start-recipe-btn"
                className="start-recipe-btn"
              >
                { inProgressRecipe ? 'Continue Recipe' : 'Start Recipe' }
              </button>
            </Link>
          )
      }

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
