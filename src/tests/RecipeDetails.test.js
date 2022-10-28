import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import Provider from '../context/Provider';

const IMG_TESTID = 'recipe-photo';
const TITLE_TESTID = 'recipe-title';
const CATEGORY_TESTID = 'recipe-category';
const INST_TESTID = 'instructions';
const VIDEO_TESTID = 'video';
const RECOMENDATION_TESTID = '0-recommendation-card';
const BTN_TESTID = 'start-recipe-btn';

describe('Tela de Detalhes da Receita', () => {
  it('Verifica os elementos na tela de comidas', async () => {
    const { history } = renderWithRouter(<Provider><App /></Provider>);

    act(() => history.push('/meals/52771'));
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

    const btn = await screen.findByTestId(BTN_TESTID);
    expect(btn).toBeInTheDocument();
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

    const btn = await screen.findByTestId(BTN_TESTID);
    expect(btn).toBeInTheDocument();
    expect(btn).not.toHaveAttribute('disabled');
  });
});
