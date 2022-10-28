const fetchDetailsApi = async (pathname, id) => {
  const END_POINT = `https://www.${pathname}.com/api/json/v1/1/lookup.php?i=${id}`;

  const response = await fetch(END_POINT);

  if (pathname === 'themealdb') {
    const { meals } = await response.json();
    return meals;
  }

  if (pathname === 'thecocktaildb') {
    const { drinks } = await response.json();
    return drinks;
  }
};

export default fetchDetailsApi;
