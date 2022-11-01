/* import { act } from 'react-dom/test-utils';
import mockFavoriteRecipes from '../components/Header';
import renderWithRouter from '../helpers/renderWithRouter';
import Provider from '../context/Provider';
import FavoriteRecipes from '../pages/FavoriteRecipes';

describe('Testando componente FavoriteRecipes', () => {
  it('Testa se fetch é chamado ao clicar no botão de pesquisa', () => {
    const { history } = renderWithRouter(<Provider><FavoriteRecipes /></Provider>);
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockFavoriteRecipes),
    });

    window.localStorage.setItem('favoriteRecipes', JSON.stringify(mockFavoriteRecipes));
    act(() => {
      history.push('/favorite-recipes');
    });
  });
});
 */
