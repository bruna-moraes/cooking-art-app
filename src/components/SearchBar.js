import { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import MyContext from '../context/MyContext';
import fetchApi from '../services/fetchApi';

function SearchBar({ title }) {
  const {
    setSearchBarValue,
    setSearchBarParameter,
    searchBarParameter,
    searchBarValue,
    setFetchedItems,
    redirect,
    setRedirect,
    fetchedItems,
  } = useContext(MyContext);

  const handleSearchValue = ({ target: { value } }) => setSearchBarValue(value);

  const handleSearchParameter = ({ target: { value } }) => setSearchBarParameter(value);

  const handleClickFetch = useCallback(async () => {
    const data = await fetchApi(searchBarParameter, searchBarValue, title);
    if (data === null) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }

    const numberOfRecipes = 12;
    setFetchedItems(data.slice(0, numberOfRecipes));
    setRedirect(true);
  }, [searchBarValue, searchBarParameter, title, setFetchedItems, setRedirect]);

  if (redirect && fetchedItems.length === 1 && title === 'Meals') {
    const { idMeal } = fetchedItems[0];
    return <Redirect to={ `/meals/${idMeal}` } />;
  }

  if (redirect && fetchedItems.length === 1 && title === 'Drinks') {
    const { idDrink } = fetchedItems[0];
    return <Redirect to={ `/drinks/${idDrink}` } />;
  }

  return (
    <section>
      <label htmlFor="search-input">
        <input
          type="text"
          placeholder="Pesquisa"
          data-testid="search-input"
          id="search-input"
          name="headerSearchValue"
          onChange={ handleSearchValue }
        />
      </label>
      <div>
        <label htmlFor="ingredient-search-radio">
          <input
            type="radio"
            data-testid="ingredient-search-radio"
            id="ingredient-search-radio"
            name="headerSearchValue"
            value="ingrediente"
            onChange={ handleSearchParameter }
          />
          Ingrediente
        </label>
        <label htmlFor="name-search-radio">
          <input
            type="radio"
            data-testid="name-search-radio"
            id="name-search-radio"
            name="headerSearchValue"
            value="nome"
            onChange={ handleSearchParameter }
          />
          Nome
        </label>
        <label htmlFor="first-letter-search-radio">
          <input
            type="radio"
            data-testid="first-letter-search-radio"
            id="first-letter-search-radio"
            name="headerSearchValue"
            value="primeira-letra"
            onChange={ handleSearchParameter }
          />
          Primeira letra
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => handleClickFetch(title) }
      >
        Pesquisar
      </button>
    </section>
  );
}

SearchBar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SearchBar;
