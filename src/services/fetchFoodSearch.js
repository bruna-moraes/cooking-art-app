const parameterCheck = (param, value) => {
  switch (param) {
  case 'ingrediente':
    return `https://www.themealdb.com/api/json/v1/1/filter.php?i=${value}`;
  case 'nome':
    return `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`;
  case 'first-letter':
    return `https://www.themealdb.com/api/json/v1/1/search.php?f=${value}`;
  default:
    break;
  }
};

const fetchFoodSearch = async (searchParam, value) => {
  const END_POINT = parameterCheck(searchParam, value);
  try {
    const response = await fetch(END_POINT);
    const { meals } = await response.json();
    return meals;
  } catch (err) {
    return err;
  }
};

export default fetchFoodSearch;
