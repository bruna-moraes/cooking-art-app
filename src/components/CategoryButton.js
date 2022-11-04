import PropTypes from 'prop-types';

function CategoryButton({ name, onClick }) {
  return (
    <button
      className="recipe-category-button"
      data-testid={ `${name}-category-filter` }
      type="button"
      onClick={ onClick }
    >
      { name }
    </button>
  );
}

CategoryButton.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CategoryButton;
