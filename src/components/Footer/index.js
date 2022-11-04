import { Link, useHistory } from 'react-router-dom';

import drinkIconActive from '../../images/drinkIconActive.svg';
import drinkIconInactive from '../../images/drinkIconInactive.svg';
import mealIconActive from '../../images/mealIconActive.svg';
import mealIconInactive from '../../images/mealIconInactive.svg';

import './index.css';

function Footer() {
  const { location: { pathname } } = useHistory();

  const isMealPage = pathname.includes('meals');
  const isDrinkPage = pathname.includes('drinks');

  return (
    <footer data-testid="footer">
      <div className="footer-content">
        <Link to="/drinks">
          <img
            data-testid="drinks-bottom-btn"
            src={ isDrinkPage ? drinkIconActive : drinkIconInactive }
            alt="Ícone de Bebida"
          />
        </Link>
        <Link to="/meals">
          <img
            data-testid="meals-bottom-btn"
            src={ isMealPage ? mealIconActive : mealIconInactive }
            alt="Ícone de Comida"
          />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
