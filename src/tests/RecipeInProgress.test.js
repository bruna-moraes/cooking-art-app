import { screen, waitFor } from '@testing-library/react';
import React from 'react';

import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';

describe('RecipeInProgress', () => {
  test('Verifica elementos na tela', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(fetch),
    }));

    const { history } = renderWithRouter(<App />, '/meals/52977/in-progress');
    await waitFor(() => expect(history.location.pathname).toBe('/meals/52977/in-progress'));
    await waitFor(() => expect(screen.getByTestId('share-btn')).toBeInTheDocument());
  });
});
