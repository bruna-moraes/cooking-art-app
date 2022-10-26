import Header from './Header';
import Footer from './Footer';
// import MyContext from '../context/MyContext';
import RecipeCard from './RecipeCard';

function Meals() {
  // const { meals } = useContext(MyContext);
  const meals = [{
    idMeal: '52977',
    strMeal: 'Corba',
    strDrinkAlternate: null,
    strCategory: 'Side',
    strArea: 'Turkish',
    strInstructions: 'Pick through your lentils for any foreign debris, rinse them 2 or 3 times, drain, and set aside.  Fair warning, this will probably turn your lentils into a solid block that you’ll have to break up later\r\nIn a large pot over medium-high heat, sauté the olive oil and the onion with a pinch of salt for about 3 minutes, then add the carrots and cook for another 3 minutes.\r\nAdd the tomato paste and stir it around for around 1 minute. Now add the cumin, paprika, mint, thyme, black pepper, and red pepper as quickly as you can and stir for 10 seconds to bloom the spices. Congratulate yourself on how amazing your house now smells.\r\nImmediately add the lentils, water, broth, and salt. Bring the soup to a (gentle) boil.\r\nAfter it has come to a boil, reduce heat to medium-low, cover the pot halfway, and cook for 15-20 minutes or until the lentils have fallen apart and the carrots are completely cooked.\r\nAfter the soup has cooked and the lentils are tender, blend the soup either in a blender or simply use a hand blender to reach the consistency you desire. Taste for seasoning and add more salt if necessary.\r\nServe with crushed-up crackers, torn up bread, or something else to add some extra thickness.  You could also use a traditional thickener (like cornstarch or flour), but I prefer to add crackers for some texture and saltiness.  Makes great leftovers, stays good in the fridge for about a week.',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    strTags: 'Soup',
    strYoutube: 'https://www.youtube.com/watch?v=VVnZd8A84z4',
    strIngredient1: 'Lentils',
    strIngredient2: 'Onion',
    strIngredient3: 'Carrots',
    strIngredient4: 'Tomato Puree',
    strIngredient5: 'Cumin',
    strIngredient6: 'Paprika',
    strIngredient7: 'Mint',
    strIngredient8: 'Thyme',
    strIngredient9: 'Black Pepper',
    strIngredient10: 'Red Pepper Flakes',
    strIngredient11: 'Vegetable Stock',
    strIngredient12: 'Water',
    strIngredient13: 'Sea Salt',
    strIngredient14: '',
    strIngredient15: '',
    strIngredient16: '',
    strIngredient17: '',
    strIngredient18: '',
    strIngredient19: '',
    strIngredient20: '',
    strMeasure1: '1 cup ',
    strMeasure2: '1 large',
    strMeasure3: '1 large',
    strMeasure4: '1 tbs',
    strMeasure5: '2 tsp',
    strMeasure6: '1 tsp ',
    strMeasure7: '1/2 tsp',
    strMeasure8: '1/2 tsp',
    strMeasure9: '1/4 tsp',
    strMeasure10: '1/4 tsp',
    strMeasure11: '4 cups ',
    strMeasure12: '1 cup ',
    strMeasure13: 'Pinch',
    strMeasure14: ' ',
    strMeasure15: ' ',
    strMeasure16: ' ',
    strMeasure17: ' ',
    strMeasure18: ' ',
    strMeasure19: ' ',
    strMeasure20: ' ',
    strSource: 'https://findingtimeforcooking.com/main-dishes/red-lentil-soup-corba/',
    strImageSource: null,
    strCreativeCommonsConfirmed: null,
    dateModified: null,
  },
  {
    idMeal: '53060',
    strMeal: 'Burek',
    strDrinkAlternate: null,
    strCategory: 'Side',
    strArea: 'Croatian',
    strInstructions: 'Fry the finely chopped onions and minced meat in oil. Add the salt and pepper. Grease a round baking tray and put a layer of pastry in it. Cover with a thin layer of filling and cover this with another layer of filo pastry which must be well coated in oil. Put another layer of filling and cover with pastry. When you have five or six layers, cover with filo pastry, bake at 200ºC/392ºF for half an hour and cut in quarters and serve.',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
    strTags: 'Streetfood, Onthego',
    strYoutube: 'https://www.youtube.com/watch?v=YsJXZwE5pdY',
    strIngredient1: 'Filo Pastry',
    strIngredient2: 'Minced Beef',
    strIngredient3: 'Onion',
    strIngredient4: 'Oil',
    strIngredient5: 'Salt',
    strIngredient6: 'Pepper',
    strIngredient7: '',
    strIngredient8: '',
    strIngredient9: '',
    strIngredient10: '',
    strIngredient11: '',
    strIngredient12: '',
    strIngredient13: '',
    strIngredient14: '',
    strIngredient15: '',
    strIngredient16: '',
    strIngredient17: '',
    strIngredient18: '',
    strIngredient19: '',
    strIngredient20: '',
    strMeasure1: '1 Packet',
    strMeasure2: '150g',
    strMeasure3: '150g',
    strMeasure4: '40g',
    strMeasure5: 'Dash',
    strMeasure6: 'Dash',
    strMeasure7: ' ',
    strMeasure8: ' ',
    strMeasure9: ' ',
    strMeasure10: ' ',
    strMeasure11: ' ',
    strMeasure12: ' ',
    strMeasure13: ' ',
    strMeasure14: ' ',
    strMeasure15: ' ',
    strMeasure16: ' ',
    strMeasure17: ' ',
    strMeasure18: ' ',
    strMeasure19: ' ',
    strMeasure20: ' ',
    strSource: 'https://www.visit-croatia.co.uk/croatian-cuisine/croatian-recipes/',
    strImageSource: null,
    strCreativeCommonsConfirmed: null,
    dateModified: null,
  }];
  return (
    <div>
      <Header title="Meals" />
      {
        meals.map((meal, index) => (
          <RecipeCard
            key={ meal.idMeal }
            recipe={ {
              name: meal.strMeal,
              image: meal.strMealThumb,
            } }
            index={ index }
          />
        ))
      }
      <Footer />
    </div>
  );
}

export default Meals;
