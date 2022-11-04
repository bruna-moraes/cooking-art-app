import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import shareIcon from '../images/shareIcon.svg';

import '../pages/DoneRecipes/index.css';

const copy = require('clipboard-copy');

function DoneRecipeCard({
  doneRecipe: {
    id,
    type,
    name,
    image,
    category,
    nationality,
    alcoholicOrNot,
    doneDate,
    tags,
  },
  index,
}) {
  const [isCopied, setIsCopied] = useState(false);

  const linkCopy = () => {
    setIsCopied(true);

    copy(`http://localhost:3000/${type}s/${id}`);
  };

  return (
    <div className="recipe-card">
      <div className="image-and-name">
        <Link to={ `/${type}s/${id}` }>
          <div className="mask-recipe" />
          <img
            className="recipe-image"
            alt={ name }
            data-testid={ `${index}-horizontal-image` }
            src={ image }
          />
          <h1
            className="recipe-name"
            data-testid={ `${index}-horizontal-name` }
          >
            { name }
          </h1>
        </Link>
      </div>
      <div className="recipe-information">
        {
          type === 'meal'
            ? (
              <span data-testid={ `${index}-horizontal-top-text` }>
                {`${nationality} - ${category}`}
              </span>
            )
            : (
              <span data-testid={ `${index}-horizontal-top-text` }>
                {alcoholicOrNot}
              </span>
            )
        }
        <div className="date-and-share-button">
          <span data-testid={ `${index}-horizontal-done-date` }>
            { doneDate }
          </span>
          <button
            className="share-button"
            src={ shareIcon }
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ linkCopy }
          >
            <img
              src={ shareIcon }
              alt="Icone de compartilhar"
            />
          </button>
          {
            isCopied
              ? (
                <span>Link copied!</span>
              )
              : null
          }
        </div>
        {
          type === 'meal'
            ? (
              tags.map((tag) => (
                <span
                  key={ tag }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  { tag }
                </span>
              ))
            )
            : null
        }
      </div>
    </div>
  );
}

DoneRecipeCard.propTypes = {
  doneRecipe: PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    nationality: PropTypes.string.isRequired,
    alcoholicOrNot: PropTypes.string.isRequired,
    doneDate: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(
      PropTypes.string.isRequired,
    ).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default DoneRecipeCard;
