import PropTypes from 'prop-types';

import Meals from '../components/Meals';
import Drinks from '../components/Drinks';

function RecipesInProgress({
  location: { pathname },
  match: { params: { id } },
}) {
  console.log(id);
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
