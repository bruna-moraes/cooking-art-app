import PropTypes from 'prop-types';

function RecipeCard({ recipe, index }) {
  return (
    <div
      className="recipe-card-container"
      data-testid={ `${index}-recipe-card` }
    >
      <div className="mask" />
      <img
        className="recipe-card-image"
        data-testid={ `${index}-card-img` }
        src={ recipe.image }
        alt={ recipe.name }
      />
      <span
        className="recipe-card-name"
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
