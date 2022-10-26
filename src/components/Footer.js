import { Link } from 'react-router-dom';

import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer">
      <Link to="/drinks">
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="Ícone de Bebida"
        />
      </Link>

      <Link to="/meals">
        <img
          data-testid="meals-bottom-btn"
          src={ mealIcon }
          alt="Ícone de Comida"
        />
      </Link>
    </footer>
  );
}

export default Footer;
