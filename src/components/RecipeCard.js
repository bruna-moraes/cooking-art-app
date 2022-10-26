import PropTypes from 'prop-types';

function RecipeCard({ recipe, index }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        data-testid={ `${index}-card-img` }
        src={ recipe.image }
        alt={ recipe.name }
      />
      <span
        data-testid={ `${index}-card-name` }
      >
        { recipe.name }
      </span>
    </div>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipeCard;
