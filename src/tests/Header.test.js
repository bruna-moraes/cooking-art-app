import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header';
import renderWithRouter from '../helpers/renderWithRouter';
import Provider from '../context/Provider';

const ICONPROFILEBTN = 'profile-top-btn';
const TITLEPAGE = 'page-title';
const ROUTEPROFILE = '/profile';

describe('Componente Header', () => {
  test('Testa se no "Header" estão sendo renderizados um "titulo" e um "icon de perfil"', () => {
    renderWithRouter(<Provider><Header title="Meals" /></Provider>);

    const IconProfilebtn = screen.getByTestId(ICONPROFILEBTN);
    const titlePage = screen.getByTestId(TITLEPAGE);

    expect(IconProfilebtn).toBeInTheDocument();
    expect(titlePage).toBeInTheDocument();
  });

  it('Testa se o botão "profile" quando clicado, redireciona pra rota "/profile"', () => {
    const { history } = renderWithRouter(<Provider><Header title="Meals" /></Provider>);

    const btnIconProfile = screen.getByTestId(ICONPROFILEBTN);

    userEvent.click(btnIconProfile);

    const { pathname } = history.location;

    expect(pathname).toBe(ROUTEPROFILE);
  });
});
