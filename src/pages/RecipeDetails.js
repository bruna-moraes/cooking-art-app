import PropTypes from 'prop-types';
import { useCallback, useContext, useEffect } from 'react';
import Meals from '../components/Meals';
import Drinks from '../components/Drinks';
import MyContext from '../context/MyContext';
import fetchDetailsApi from '../services/fetchDetailsApi';
import fetchRecomendations from '../services/fetchRecomendations';

function RecipesDetails({
  history: { location: { pathname } },
  match: { params: { id } },
}) {
  const { setDetailedRecipe, setRecomendations } = useContext(MyContext);

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

  useEffect(() => {
    getItem();
    getRecomendations();
  }, [getItem, getRecomendations]);

  return (
    <div>
      {
        pathname.includes('meals')
          ? <Meals />
          : <Drinks />
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
