import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import SearchBar from '../SearchBar';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import MyContext from '../../context/MyContext';

import './index.css';

function Header({ title, notSearchIcon }) {
  const { handleVisivelInput, inputVisivel } = useContext(MyContext);

  const history = useHistory();

  const profileRoute = () => (
    history.push('/profile')
  );

  return (
    <header>
      <div className="header-content">
        <div className="header-top">
          { !notSearchIcon && (
            <button
              className="icon-button"
              type="button"
              data-testid="search-btn"
              onClick={ handleVisivelInput }
            >
              <img
                data-testid="search-top-btn"
                src={ searchIcon }
                alt="search-btn"
              />
            </button>
          )}

          <h1 data-testid="page-title">{ title }</h1>
          <button
            className="icon-button"
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
        </div>

        {inputVisivel && (
          <>
            <h2>Encontre a receita perfeita para você:</h2>
            <SearchBar title={ title } />
          </>
        )}
      </div>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.any,
}.isRequired;

export default Header;
