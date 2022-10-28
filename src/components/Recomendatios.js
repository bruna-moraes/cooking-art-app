import { useContext } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import MyContext from '../context/MyContext';
import 'bootstrap/dist/css/bootstrap.css';

export default function Recomendation() {
  const { recomendations } = useContext(MyContext);
  const SIX = 6;

  return (
    <div style={ { display: 'block', width: 140, padding: 5 } }>
      <h5>Recomendações</h5>
      <Carousel>
        {
          recomendations.slice(0, SIX).map((recomendation, index) => (
            <Carousel.Item key={ index } data-testid={ `${index}-recommendation-card` }>
              <img
                src={ recomendation.strDrinkThumb || recomendation.strMealThumb }
                alt={ recomendation.strDrink || recomendation.strMeal }
                className="d-block w-100"
              />
              <Carousel.Caption>
                <h6
                  data-testid={ `${index}-recommendation-title` }
                >
                  { recomendation.strDrink || recomendation.strMeal }
                </h6>
              </Carousel.Caption>
            </Carousel.Item>
          ))
        }
      </Carousel>
    </div>
  );
}
