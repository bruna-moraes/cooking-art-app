const fetchApi = async (param, value, title) => {
  let searchUrl;

  switch (param) {
  case 'ingrediente':
    searchUrl = `filter.php?i=${value}`;
    break;
  case 'nome':
    searchUrl = `search.php?s=${value}`;
    break;
  default:
    if (value.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      searchUrl = `search.php?f=${value}`;
    }
    break;
  }

  const item = (title === 'Meals' ? 'themealdb' : 'thecocktaildb');

  const END_POINT = `https://www.${item}.com/api/json/v1/1/${searchUrl}`;
  try {
    const response = await fetch(END_POINT);
    if (title === 'Meals') {
      const { meals } = await response.json();
      return meals;
    }
    if (title === 'Drinks') {
      const { drinks } = await response.json();
      return drinks;
    }
  } catch (err) {
    return [];
  }
};

export default fetchApi;
