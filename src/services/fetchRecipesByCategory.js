const fetchRecipesByCategory = async (recipesType, category) => {
  const dict = {
    Meals: 'themealdb',
    Drinks: 'thecocktaildb',
  };

  const numberOfRecipes = 12;

  const ENDPOINT = `https://www.${dict[recipesType]}.com/api/json/v1/1/filter.php?c=${category}`;

  const response = await fetch(ENDPOINT);
  const data = await response.json();

  return data[recipesType.toLowerCase()].slice(0, numberOfRecipes);
};

export default fetchRecipesByCategory;
