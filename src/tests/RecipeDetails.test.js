import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import Provider from '../context/Provider';
import mockFavoriteRecipe from '../mocks/mockFavoriteRecipe';

const IMG_TESTID = 'recipe-photo';
const TITLE_TESTID = 'recipe-title';
const CATEGORY_TESTID = 'recipe-category';
const INST_TESTID = 'instructions';
const VIDEO_TESTID = 'video';
const RECOMENDATION_TESTID = '0-recommendation-card';
const RECIPE_BTN = 'start-recipe-btn';
const mealMock = '/meals/52771';

describe('Tela de Detalhes da Receita', () => {
  it('Verifica os elementos na tela de comidas', async () => {
    const { history } = renderWithRouter(<Provider><App /></Provider>);

    act(() => history.push(mealMock));
    const image = await screen.findByTestId(IMG_TESTID);
    expect(image).toBeInTheDocument();

    const title = await screen.findByTestId(TITLE_TESTID);
    expect(title).toBeInTheDocument();

    const category = await screen.findByTestId(CATEGORY_TESTID);
    expect(category).toBeInTheDocument();

    const instructions = await screen.findByTestId(INST_TESTID);
    expect(instructions).toBeInTheDocument();

    const video = await screen.findByTestId(VIDEO_TESTID);
    expect(video).toBeInTheDocument();

    const recomendation = await screen.findByTestId(RECOMENDATION_TESTID);
    expect(recomendation).toBeInTheDocument();
  });

  it('Verifica os elementos na tela de bebidas', async () => {
    const { history } = renderWithRouter(<Provider><App /></Provider>);

    act(() => history.push('/drinks/178319'));
    const image = await screen.findByTestId(IMG_TESTID);
    expect(image).toBeInTheDocument();

    const title = await screen.findByTestId(TITLE_TESTID);
    expect(title).toBeInTheDocument();

    const category = await screen.findByTestId(CATEGORY_TESTID);
    expect(category).toBeInTheDocument();

    const instructions = await screen.findByTestId(INST_TESTID);
    expect(instructions).toBeInTheDocument();

    const recomendation = await screen.findByTestId(RECOMENDATION_TESTID);
    expect(recomendation).toBeInTheDocument();
  });

  it('Testa alteração do texto no botão de iniciar/continuar receita', () => {
    const inProgressStorage = { drinks: {}, meals: { 52771: [] } };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressStorage));

    const { history } = renderWithRouter(<Provider><App /></Provider>);

    act(() => history.push(mealMock));

    const btn = screen.getByRole('button', { name: /continue recipe/i });
    expect(btn).toBeInTheDocument();
  });

  it('Testa funcionalidade de desabilitar o botão caso receita esteja feita', async () => {
    const doneStorage = [{ id: 52771 }];
    localStorage.setItem('doneRecipes', JSON.stringify(doneStorage));

    const { history } = renderWithRouter(<Provider><App /></Provider>);

    act(() => history.push(mealMock));

    const btn = screen.getByTestId(RECIPE_BTN);
    await waitFor(() => expect(btn).not.toBeVisible());
  });

  it('Testa interação do botão de favorito com localStorage', async () => {
    localStorage.setItem('favoriteRecipes', mockFavoriteRecipe);

    jest.spyOn(Object.getPrototypeOf(global.localStorage), 'getItem').mockReturnValue(JSON.stringify(mockFavoriteRecipe));

    const { history } = renderWithRouter(<Provider><App /></Provider>);

    act(() => history.push(mealMock));

    const favoriteBtn = screen.getByRole('button', { name: /favorite-icon/i });
    userEvent.click(favoriteBtn);

    expect(localStorage.getItem).toHaveBeenCalled();
  });
});
