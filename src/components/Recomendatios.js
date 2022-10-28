import { useContext } from 'react';
import MyContext from '../context/MyContext';

export default function Recomendation() {
  const { recomendations } = useContext(MyContext);

  return (
    <div>
      {
        recomendations.map((recomendation, index) => (
          <article
            key={ index }
            data-testid={ `${index}-recommendation-card` }
          >
            <img
              src={ recomendation.strDrinkThumb }
              alt={ recomendation.strDrink }
            />
            <h3
              data-testid={ `${index}-recommendation-title` }
            >
              { recomendation.strDrink }
            </h3>
          </article>
        ))
      }
    </div>
  );
}
