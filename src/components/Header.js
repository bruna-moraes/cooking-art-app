import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, notSearchIcon }) {
  const history = useHistory();
  const profileRoute = () => (
    history.push('/profile')
  );

  return (
    <div>
      <button
        type="button"
        data-testid="profile-btn"
        onClick={ profileRoute }
      >
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="Icon Profile"
        />
      </button>
      <h1 data-testid="page-title">{ title }</h1>
      { !notSearchIcon && (
        <button
          type="button"
          data-testid="search-btn"
        >
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="search-btn"
          />
        </button>
      )}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.any,
}.isRequired;

export default Header;
