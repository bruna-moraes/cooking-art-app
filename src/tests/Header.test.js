import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header';
import renderWithRouter from '../helpers/renderWithRouter';
import Provider from '../context/Provider';

const ICONPROFILEBTN = 'profile-top-btn';
const TITLEPAGE = 'page-title';
const ROUTEPROFILE = '/profile';
const SEARCHICONBTN = 'search-btn';
const INPUTSEARCH = 'search-input';

describe('Componente Header', () => {
  test('Testa se no "Header" estão sendo renderizados um "titulo" e um "icon de perfil"', () => {
    renderWithRouter(<Provider><Header /></Provider>);

    const IconProfilebtn = screen.getByTestId(ICONPROFILEBTN);
    const titlePage = screen.getByTestId(TITLEPAGE);
    const iconsearch = screen.getByTestId(SEARCHICONBTN);

    expect(IconProfilebtn).toBeInTheDocument();
    expect(titlePage).toBeInTheDocument();
    expect(iconsearch).toBeInTheDocument();
  });

  it('Testa se o botão "profile" quando clicado, redireciona pra rota "/profile"', () => {
    const { history } = renderWithRouter(<Provider><Header /></Provider>);

    const btnIconProfile = screen.getByTestId(ICONPROFILEBTN);

    userEvent.click(btnIconProfile);

    const { pathname } = history.location;

    expect(pathname).toBe(ROUTEPROFILE);
  });

  test('Testa se ao clicar na "lupa" o input de pesquisa aparece e se clicar novamente, desaparece', () => {
    renderWithRouter(<Provider><Header /></Provider>);
    const btnSearch = screen.getByAltText(SEARCHICONBTN);
    const input = screen.getByTestId(INPUTSEARCH);

    userEvent.click(btnSearch);
    expect(input).toBeInTheDocument();
    userEvent.type(input, 'cuzcuz');

    userEvent.click(btnSearch);
    expect(input).not.toBeInTheDocument();
  });
});
