import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import chickenMeals from '../../cypress/mocks/chickenMeals';
import oneMeal from '../../cypress/mocks/oneMeal';
import oneDrink from '../../cypress/mocks/oneDrink';
import Provider from '../context/Provider';

const searchTestId = 'search-input';
const ingredientTestId = 'ingredient-search-radio';
const nameRadioTestId = 'name-search-radio';
const firstLetterTestId = 'first-letter-search-radio';
const btnTestId = 'exec-search-btn';

describe('Componente SearchBar', () => {
  it('Verifica se o componente é renderizado com os inputs esperados', () => {
    const { history } = renderWithRouter(<Provider><App /></Provider>);
    act(() => history.push('/meals'));

    const textInput = screen.getByTestId(searchTestId);
    expect(textInput).toBeInTheDocument();

    const ingredientRadio = screen.getByTestId(ingredientTestId);
    expect(ingredientRadio).toBeInTheDocument();

    const nameRadio = screen.getByTestId(nameRadioTestId);
    expect(nameRadio).toBeInTheDocument();

    const firstLetterRadio = screen.getByTestId(firstLetterTestId);
    expect(firstLetterRadio).toBeInTheDocument();

    const btn = screen.getByTestId(btnTestId);
    expect(btn).toBeInTheDocument();
  });

  it('Testa se fetch é chamado ao clicar no botão de pesquisa', () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(chickenMeals),
    }));

    const { history } = renderWithRouter(<Provider><App /></Provider>);
    act(() => history.push('/meals'));

    const textInput = screen.getByTestId(searchTestId);
    const ingredientRadio = screen.getByTestId(ingredientTestId);
    const btn = screen.getByTestId(btnTestId);

    act(() => {
      userEvent.type(textInput, 'chicken');
      userEvent.click(ingredientRadio);
      userEvent.click(btn);
    });

    expect(global.fetch).toHaveBeenCalled();
  });

  it('Testa se a página é redirecionada para a URL correta de acordo com pesquisa de comidas', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneMeal),
    });

    const { history } = renderWithRouter(<Provider><App /></Provider>);
    act(() => history.push('/meals'));

    const textInput = screen.getByTestId(searchTestId);
    const nameRadio = screen.getByTestId(nameRadioTestId);
    const btn = screen.getByTestId(btnTestId);

    act(() => {
      userEvent.type(textInput, 'Arrabiata');
      userEvent.click(nameRadio);
      userEvent.click(btn);
    });

    await waitFor(() => {
      expect(history.location.pathname).toBe('/meals/52771');
    }, { timeout: 3000 });
  });

  it('Testa se a página é redirecionada para a URL correta de acordo com pesquisa de bebidas', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneDrink),
    });

    const { history } = renderWithRouter(<Provider><App /></Provider>);
    act(() => history.push('/drinks'));

    const textInput = screen.getByTestId(searchTestId);
    const nameRadio = screen.getByTestId(nameRadioTestId);
    const btn = screen.getByTestId(btnTestId);

    act(() => {
      userEvent.type(textInput, 'Aquamarine');
      userEvent.click(nameRadio);
      userEvent.click(btn);
    });

    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks/178319');
    }, { timeout: 3000 });
  });
});
