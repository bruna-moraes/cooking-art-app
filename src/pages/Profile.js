import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const history = useHistory();

  const user = JSON.parse(localStorage.getItem('user')) || {};

  const logoutProfile = () => {
    localStorage.clear();

    history.push('/');
  };

  return (
    <div>
      <Header title="Profile" notSearchIcon />
      <span data-testid="profile-email">{ user.email }</span>

      <section>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>

        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>

        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ logoutProfile }
        >
          Logout
        </button>
      </section>

      <Footer />
    </div>
  );
}

export default Profile;
