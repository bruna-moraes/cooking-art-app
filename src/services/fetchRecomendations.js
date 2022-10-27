const fetchRecomendations = async (pathname) => {
  let path;

  if (pathname.includes('meals')) {
    path = 'thecocktaildb';
  }
  if (pathname.includes('drinks')) {
    path = 'themealdb';
  }

  const END_POINT = `https://www.${path}.com/api/json/v1/1/search.php?s=`;

  const response = await fetch(END_POINT);

  if (pathname.includes('meals')) {
    const { drinks } = await response.json();
    return drinks;
  }

  if (pathname.includes('drinks')) {
    const { meals } = await response.json();
    return meals;
  }
};

export default fetchRecomendations;
