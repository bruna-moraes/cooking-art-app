function SearchBar() {
  return (
    <section>
      <label htmlFor="search-input">
        <input
          type="text"
          placeholder="Pesquisa"
          data-testid="search-input"
          id="search-input"
        />
      </label>
      <div>
        <label htmlFor="ingredient-search-radio">
          Ingrediente
          <input
            type="radio"
            data-testid="ingredient-search-radio"
            id="ingredient-search-radio"
            name="search-parameter"
          />
        </label>
        <label htmlFor="name-search-radio">
          Nome
          <input
            type="radio"
            data-testid="name-search-radio"
            id="name-search-radio"
            name="search-parameter"
          />
        </label>
        <label htmlFor="first-letter-search-radio">
          Primeira letra
          <input
            type="radio"
            data-testid="first-letter-search-radio"
            id="first-letter-search-radio"
            name="search-parameter"
          />
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Pesquisar
      </button>
    </section>
  );
}

export default SearchBar;
