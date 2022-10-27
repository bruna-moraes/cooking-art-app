const fetchCategories = async (recipesType) => {
  const dict = {
    Meals: 'themealdb',
    Drinks: 'thecocktaildb',
  };

  const numberOfCategories = 5;

  const ENDPOINT = `https://www.${dict[recipesType]}.com/api/json/v1/1/list.php?c=list`;

  const response = await fetch(ENDPOINT);
  const data = await response.json();

  return data[recipesType.toLowerCase()].slice(0, numberOfCategories);
};

export default fetchCategories;
