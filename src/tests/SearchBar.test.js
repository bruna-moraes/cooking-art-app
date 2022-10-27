import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import Provider from '../context/Provider';
import SearchBar from '../components/SearchBar';
import chickenMeals from '../../cypress/mocks/chickenMeals';

describe('Componente SearchBar', () => {
  it('Verifica se o componente é renderizado com os inputs esperados', () => {
    renderWithRouter(<Provider><SearchBar title="Meals" /></Provider>);

    const textInput = screen.getByTestId('search-input');
    expect(textInput).toBeInTheDocument();

    const ingredientRadio = screen.getByRole('radio', { name: /ingrediente/i });
    expect(ingredientRadio).toBeInTheDocument();

    const nameRadio = screen.getByRole('radio', { name: /nome/i });
    expect(nameRadio).toBeInTheDocument();

    const firstLetterRadio = screen.getByRole('radio', { name: /primeira letra/i });
    expect(firstLetterRadio).toBeInTheDocument();

    const btn = screen.getByRole('button', { name: /pesquisar/i });
    expect(btn).toBeInTheDocument();
  });

  it('Testa se fetch é chamado ao clicar no botão de pesquisa', () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(chickenMeals),
    }));

    renderWithRouter(<Provider><SearchBar title="Meals" /></Provider>);

    const textInput = screen.getByTestId('search-input');
    const ingredientRadio = screen.getByRole('radio', { name: /ingrediente/i });
    const btn = screen.getByRole('button', { name: /pesquisar/i });

    userEvent.type(textInput, 'chicken');
    userEvent.click(ingredientRadio);
    userEvent.click(btn);

    expect(global.fetch).toHaveBeenCalled();
  });
});
