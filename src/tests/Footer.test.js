import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Footer from '../components/Footer';
import Provider from '../context/Provider';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Componente Footer', () => {
  it('Ícones de bebida e comida estão na tela', () => {
    renderWithRouter(<Provider><Footer /></Provider>);

    const drinkIcon = screen.getByTestId('drinks-bottom-btn');
    const mealsIcon = screen.getByTestId('meals-bottom-btn');

    expect(drinkIcon).toBeInTheDocument();
    expect(mealsIcon).toBeInTheDocument();
  });

  it('É redirecionado para "meals" ao clicar no ícone "mealsDrink"', () => {
    const { history } = renderWithRouter(
      <Provider><Footer /></Provider>,
    );

    const mealsIcon = screen.getByTestId('meals-bottom-btn');

    userEvent.click(mealsIcon);

    const { pathname } = history.location;

    expect(pathname).toBe('/meals');
  });

  it('É redirecionado para "drinks" ao clicar no ícone "drinksIcon"', () => {
    const { history } = renderWithRouter(
      <Provider><Footer /></Provider>,
    );

    const drinkIcon = screen.getByTestId('drinks-bottom-btn');

    userEvent.click(drinkIcon);

    const { pathname } = history.location;

    expect(pathname).toBe('/drinks');
  });
});
