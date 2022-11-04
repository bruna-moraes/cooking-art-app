import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

import './index.css';

function Profile() {
  const history = useHistory();

  const user = JSON.parse(localStorage.getItem('user')) || {};

  const logoutProfile = () => {
    localStorage.clear();

    history.push('/');
  };

  return (
    <div className="profile-page page">
      <Header title="Profile" notSearchIcon />

      <main className="profile-main-content">
        <div className="profile-information">
          <h2>Suas informações</h2>
          <div className="profile-text">
            <span className="email-text">Email:</span>
            <span data-testid="profile-email">{ user.email }</span>
          </div>
        </div>

        <nav className="profile-nav">
          <h2>Explore o nosso aplicativo!</h2>
          <div className="button-nav">
            <button
              className="primary-button-enable"
              type="button"
              data-testid="profile-done-btn"
              onClick={ () => history.push('/done-recipes') }
            >
              Done Recipes
            </button>
            <button
              className="primary-button-enable"
              type="button"
              data-testid="profile-favorite-btn"
              onClick={ () => history.push('/favorite-recipes') }
            >
              Favorite Recipes
            </button>
            <button
              className="primary-button-enable"
              type="button"
              data-testid="profile-logout-btn"
              onClick={ logoutProfile }
            >
              Logout
            </button>
          </div>
        </nav>
      </main>

      <Footer />
    </div>
  );
}

export default Profile;
