import { useContext } from 'react';
import MyContext from '../context/MyContext';

function SearchBar() {
  const {
    handleSearchValue,
    handleSearchParameter,
    handleSearchClick,
  } = useContext(MyContext);

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
          Ingrediente
          <input
            type="radio"
            data-testid="ingredient-search-radio"
            id="ingredient-search-radio"
            name="headerSearchValue"
            value="ingrediente"
            onChange={ handleSearchParameter }
          />
        </label>
        <label htmlFor="name-search-radio">
          Nome
          <input
            type="radio"
            data-testid="name-search-radio"
            id="name-search-radio"
            name="headerSearchValue"
            value="nome"
            onChange={ handleSearchParameter }
          />
        </label>
        <label htmlFor="first-letter-search-radio">
          Primeira letra
          <input
            type="radio"
            data-testid="first-letter-search-radio"
            id="first-letter-search-radio"
            name="headerSearchValue"
            value="primeira-letra"
            onChange={ handleSearchParameter }
          />
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleSearchClick }
      >
        Pesquisar
      </button>
    </section>
  );
}

export default SearchBar;
