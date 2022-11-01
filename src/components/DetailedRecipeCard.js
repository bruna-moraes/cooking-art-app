import { useContext } from 'react';
import MyContext from '../context/MyContext';

export default function DetailedRecipeCard() {
  const { detailedRecipe, getRecipeIngredients } = useContext(MyContext);

  return (
    <div>
      {
        detailedRecipe.map((e, index) => (
          <div key={ index }>
            <img
              data-testid="recipe-photo"
              src={ e.strMealThumb || e.strDrinkThumb }
              alt={ e.idDrink || e.idMeal }
              style={ { width: 200 } }
            />
            <h3
              data-testid="recipe-title"
            >
              { e.strMeal || e.strDrink }
            </h3>
            <p data-testid="recipe-category">
              {
                detailedRecipe[0].idMeal ? e.strCategory : e.strAlcoholic
              }
            </p>
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
            <p data-testid="instructions">{ e.strInstructions }</p>
            {
              detailedRecipe[0].idMeal ? <iframe
                data-testid="video"
                width="400"
                height="250"
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
