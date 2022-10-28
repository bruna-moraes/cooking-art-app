import PropTypes from 'prop-types';
import { useCallback, useContext, useEffect } from 'react';
import MyContext from '../context/MyContext';
import fetchDetailsApi from '../services/fetchDetailsApi';
import DetailedRecipeCard from '../components/DetailedRecipeCard';
import fetchRecomendations from '../services/fetchRecomendations';
import Recomendations from '../components/Recomendations';

function RecipeDetails({
  history: { location: { pathname } },
  match: { params: { id } },
}) {
  const { setDetailedRecipe,
    setRecomendations } = useContext(MyContext);

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

  useEffect(() => {
    getItem();
    getRecomendations();
  }, [getItem, getRecomendations]);

  return (
    <div>
      <DetailedRecipeCard />
      <Recomendations />
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="start-recipe-btn"
        disabled={ handleDisableBtn }
      >
        Iniciar Receita
      </button>
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
