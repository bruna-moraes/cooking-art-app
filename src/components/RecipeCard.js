import PropTypes from 'prop-types';

export default function RecipeCard({ index, imageSrc, name }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        data-testid={ `${index}-card-img` }
        src={ imageSrc }
        alt={ name }
      />
      <h3
        data-testid={ `${index}-card-name` }
      >
        { name }
      </h3>
    </div>
  );
}

RecipeCard.propTypes = {
  index: PropTypes.number,
  imageSrc: PropTypes.string,
  name: PropTypes.string,
}.isRequired;
