import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from '../helpers/renderWithRouter';
import Provider from '../context/Provider';
import Profile from '../pages/Profile';

describe('Página Profile', () => {
  it('Informações são renderizadas na tela', () => {
    renderWithRouter(<Provider><Profile /></Provider>);

    const emailText = screen.getByTestId('profile-email');
    const DoneRecipesButton = screen
      .getByRole('button', { name: 'Done Recipes' });
    const FavoriteRecipesButton = screen
      .getByRole('button', { name: 'Favorite Recipes' });
    const LogoutButton = screen
      .getByRole('button', { name: 'Logout' });

    expect(emailText).toBeInTheDocument();
    expect(DoneRecipesButton).toBeInTheDocument();
    expect(FavoriteRecipesButton).toBeInTheDocument();
    expect(LogoutButton).toBeInTheDocument();
  });

  it('Redireciona para pagina DoneRecipes', async () => {
    const { history } = renderWithRouter(<Provider><Profile /></Provider>);

    const DoneRecipesButton = await screen
      .findByRole('button', { name: 'Done Recipes' });

    userEvent.click(DoneRecipesButton);

    const { pathname } = history.location;

    expect(pathname).toBe('/done-recipes');
  });

  it('Redireciona para pagina FavoriteRecipes', async () => {
    const { history } = renderWithRouter(<Provider><Profile /></Provider>);

    const favoriteRecipesButton = await screen
      .findByRole('button', { name: 'Favorite Recipes' });

    userEvent.click(favoriteRecipesButton);

    const { pathname } = history.location;

    expect(pathname).toBe('/favorite-recipes');
  });

  it('Redireciona para pagina Logout', async () => {
    const { history } = renderWithRouter(<Provider><Profile /></Provider>);

    const logoutButton = await screen
      .findByRole('button', { name: 'Logout' });

    userEvent.click(logoutButton);

    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });
});
