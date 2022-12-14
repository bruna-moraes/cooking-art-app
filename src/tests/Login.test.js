import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import Provider from '../context/Provider';

const idEmail = 'email-input';
const idPassword = 'password-input';
const idButton = 'login-submit-btn';

describe('Componente Login', () => {
  test('Verifica se os inputs são renderizados na tela', () => {
    renderWithRouter(<Provider><App /></Provider>);

    const inputEmail = screen.getByTestId(idEmail);
    const inputPassword = screen.getByTestId(idPassword);

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
  });

  test('Verifica se o botão é renderizado', () => {
    renderWithRouter(<Provider><App /></Provider>);

    const button = screen.getByTestId(idButton);
    expect(button).toBeInTheDocument(idButton);
  });

  test('Verifica se é possivel digitar nos inputs', () => {
    renderWithRouter(<Provider><App /></Provider>);

    const msgInput = 'Digitando...';

    const inputEmail = screen.getByTestId(idEmail);
    const inputPassword = screen.getByTestId(idPassword);

    userEvent.type(inputEmail, msgInput);
    userEvent.type(inputPassword, msgInput);
  });
});
