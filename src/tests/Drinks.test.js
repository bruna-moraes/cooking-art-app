import { screen } from '@testing-library/react';
import Drinks from '../components/Drinks';
import Provider from '../context/Provider';
import renderWithRouter from '../helpers/renderWithRouter';
import { mockDrinksCategories } from '../mocks/mockCategories';
import { mockDrinksRecipes } from '../mocks/mockRecipes';

describe('Tela Principal - Página Drinks', () => {
  beforeEach(() => {
    global.fetch = jest.fn()
      .mockImplementationOnce(async () => ({
        json: async () => mockDrinksRecipes,
      }))
      .mockImplementationOnce(async () => ({
        json: async () => mockDrinksCategories,
      }));
  });

  it('Botões de categorias e receitas são renderizados na tela', async () => {
    renderWithRouter(<Provider><Drinks /></Provider>);

    const buttonCategory1 = await screen
      .findByRole('button', { name: 'Categoria drinks 1' });
    const buttonCategory2 = await screen
      .findByRole('button', { name: 'Categoria drinks 2' });
    const buttonCategory3 = await screen
      .findByRole('button', { name: 'Categoria drinks 3' });

    const nameRecipeCorba = await screen.findByText('GG');
    const nameRecipeBurek = await screen.findByText('A1');
    const nameRecipeSushi = await screen.findByText('ABC');

    expect(buttonCategory1).toBeInTheDocument();
    expect(buttonCategory2).toBeInTheDocument();
    expect(buttonCategory3).toBeInTheDocument();
    expect(nameRecipeCorba).toBeInTheDocument();
    expect(nameRecipeBurek).toBeInTheDocument();
    expect(nameRecipeSushi).toBeInTheDocument();
  });
});
