import { screen } from '@testing-library/react';

import Provider from '../context/Provider';
import renderWithRouter from '../helpers/renderWithRouter';
import {
  mockDrinksCategories,
  mockMealsCategories,
} from '../mocks/mockCategories';
import {
  mockDrinksRecipes,
  mockMealsRecipes,
} from '../mocks/mockRecipes';
import Recipes from '../pages/Recipes';

describe('Tela Principal - Página Meals', () => {
  beforeEach(() => {

  });

  it('É renderizado o componente "Meals" ao passar um pathname: "meals"', async () => {
    global.fetch = jest.fn()
      .mockImplementationOnce(async () => ({
        json: async () => mockMealsRecipes,
      }))
      .mockImplementationOnce(async () => ({
        json: async () => mockMealsCategories,
      }));

    renderWithRouter(<Provider><Recipes location={ { pathname: 'meals' } } /></Provider>);

    const headingMeals = await screen.findByText('Meals');

    expect(headingMeals).toBeInTheDocument();
  });

  it('É renderizado o componente "Drinks" ao passar um pathname: "drinks"', async () => {
    global.fetch = jest.fn()
      .mockImplementationOnce(async () => ({
        json: async () => mockDrinksRecipes,
      }))
      .mockImplementationOnce(async () => ({
        json: async () => mockDrinksCategories,
      }));

    renderWithRouter(<Provider><Recipes location={ { pathname: 'drinks' } } /></Provider>);

    const headingMeals = await screen.findByText('Drinks');

    expect(headingMeals).toBeInTheDocument();
  });
});
