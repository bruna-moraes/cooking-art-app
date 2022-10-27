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
  const { setDetailedRecipe } = useContext(MyContext);

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
