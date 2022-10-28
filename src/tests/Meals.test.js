import { screen } from '@testing-library/react';
import Meals from '../components/Meals';
import Provider from '../context/Provider';
import renderWithRouter from '../helpers/renderWithRouter';
import { mockMealsCategories } from '../mocks/mockCategories';
import { mockMealsRecipes } from '../mocks/mockRecipes';

describe('Tela Principal - Página Meals', () => {
  beforeEach(() => {
    global.fetch = jest.fn()
      .mockImplementationOnce(async () => ({
        json: async () => mockMealsRecipes,
      }))
      .mockImplementationOnce(async () => ({
        json: async () => mockMealsCategories,
      }));
  });

  it('Botões de categorias e receitas são renderizados na tela', async () => {
    renderWithRouter(<Provider><Meals /></Provider>);

    const buttonCategory1 = await screen
      .findByRole('button', { name: 'Categoria meals 1' });
    const buttonCategory2 = await screen
      .findByRole('button', { name: 'Categoria meals 2' });
    const buttonCategory3 = await screen
      .findByRole('button', { name: 'Categoria meals 3' });
    const buttonAll = await screen
      .findByRole('button', { name: 'All' });

    const nameRecipeCorba = await screen.findByText('Corba');
    const nameRecipeBurek = await screen.findByText('Burek');
    const nameRecipeSushi = await screen.findByText('Sushi');

    expect(buttonCategory1).toBeInTheDocument();
    expect(buttonCategory2).toBeInTheDocument();
    expect(buttonCategory3).toBeInTheDocument();
    expect(nameRecipeCorba).toBeInTheDocument();
    expect(nameRecipeBurek).toBeInTheDocument();
    expect(nameRecipeSushi).toBeInTheDocument();
    expect(buttonAll).toBeInTheDocument();
  });
});
