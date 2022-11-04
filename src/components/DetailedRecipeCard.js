import { useContext } from 'react';
import MyContext from '../context/MyContext';

import '../pages/RecipeDetails/index.css';

export default function DetailedRecipeCard() {
  const { detailedRecipe, getRecipeIngredients } = useContext(MyContext);

  return (
    <div>
      {
        detailedRecipe.map((e, index) => (
          <div key={ index }>
            <img
              className="image-recipe"
              data-testid="recipe-photo"
              src={ e.strMealThumb || e.strDrinkThumb }
              alt={ e.idDrink || e.idMeal }
            />
            <div className="name-recipe-text">
              <h2
                data-testid="recipe-title"
              >
                { e.strMeal || e.strDrink }
              </h2>
              <p data-testid="recipe-category">
                {
                  detailedRecipe[0].idMeal ? e.strCategory : e.strAlcoholic
                }
              </p>
            </div>
            <section className="preparation-mode">
              <h5>Ingredients</h5>
              <ol>
                {
                  getRecipeIngredients().map((value, i) => (
                    <li
                      key={ i }
                      data-testid={ `${i}-ingredient-name-and-measure` }
                    >
                      { value }
                    </li>))
                }
              </ol>
              <h5>Preparation Mode</h5>
              <p data-testid="instructions">{ e.strInstructions }</p>
            </section>
            {
              detailedRecipe[0].idMeal ? <iframe
                className="instructions-video"
                data-testid="video"
                title="Embedded youtube"
                src={ e.strYoutube.replace('watch?v=', 'embed/') }
              /> : null
            }
          </div>
        ))
      }
    </div>
  );
}
