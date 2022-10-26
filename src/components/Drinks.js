import Footer from './Footer';
import Header from './Header';
// import MyContext from '../context/MyContext';
import RecipeCard from './RecipeCard';

function Drinks() {
  // const { drinks } = useContext(MyContext);
  const drinks = [
    {
      idDrink: '15997',
      strDrink: 'GG',
      strDrinkAlternate: null,
      strTags: null,
      strVideo: null,
      strCategory: 'Ordinary Drink',
      strIBA: null,
      strAlcoholic: 'Optional alcohol',
      strGlass: 'Collins Glass',
      strInstructions: 'Pour the Galliano liqueur over ice. Fill the remainder of the glass with ginger ale and thats all there is to it. You now have a your very own GG.',
      strInstructionsES: null,
      strInstructionsDE: 'Den Galliano-Likör über Eis gießen. Füllen Sie den Rest des Glases mit Ginger Ale und das ist alles, was dazu gehört. Du hast jetzt ein eigenes GG.',
      strInstructionsFR: null,
      strInstructionsIT: 'Versare il liquore Galliano su ghiaccio.\r\nRiempi il resto del bicchiere con ginger ale e questo è tutto.\r\nOra hai il tuo GG personale.',
      'strInstructionsZH-HANS': null,
      'strInstructionsZH-HANT': null,
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
      strIngredient1: 'Galliano',
      strIngredient2: 'Ginger ale',
      strIngredient3: 'Ice',
      strIngredient4: null,
      strIngredient5: null,
      strIngredient6: null,
      strIngredient7: null,
      strIngredient8: null,
      strIngredient9: null,
      strIngredient10: null,
      strIngredient11: null,
      strIngredient12: null,
      strIngredient13: null,
      strIngredient14: null,
      strIngredient15: null,
      strMeasure1: '2 1/2 shots ',
      strMeasure2: null,
      strMeasure3: null,
      strMeasure4: null,
      strMeasure5: null,
      strMeasure6: null,
      strMeasure7: null,
      strMeasure8: null,
      strMeasure9: null,
      strMeasure10: null,
      strMeasure11: null,
      strMeasure12: null,
      strMeasure13: null,
      strMeasure14: null,
      strMeasure15: null,
      strImageSource: null,
      strImageAttribution: null,
      strCreativeCommonsConfirmed: 'No',
      dateModified: '2016-07-18 22:06:00',
    },
    {
      idDrink: '17222',
      strDrink: 'A1',
      strDrinkAlternate: null,
      strTags: null,
      strVideo: null,
      strCategory: 'Cocktail',
      strIBA: null,
      strAlcoholic: 'Alcoholic',
      strGlass: 'Cocktail glass',
      strInstructions: 'Pour all ingredients into a cocktail shaker, mix and serve over ice into a chilled glass.',
      strInstructionsES: 'Vierta todos los ingredientes en una coctelera, mezcle y sirva con hielo en un vaso frío.',
      strInstructionsDE: 'Alle Zutaten in einen Cocktailshaker geben, mischen und über Eis in ein gekühltes Glas servieren.',
      strInstructionsFR: null,
      strInstructionsIT: 'Versare tutti gli ingredienti in uno shaker, mescolare e servire con ghiaccio in un bicchiere freddo.',
      'strInstructionsZH-HANS': null,
      'strInstructionsZH-HANT': null,
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
      strIngredient1: 'Gin',
      strIngredient2: 'Grand Marnier',
      strIngredient3: 'Lemon Juice',
      strIngredient4: 'Grenadine',
      strIngredient5: null,
      strIngredient6: null,
      strIngredient7: null,
      strIngredient8: null,
      strIngredient9: null,
      strIngredient10: null,
      strIngredient11: null,
      strIngredient12: null,
      strIngredient13: null,
      strIngredient14: null,
      strIngredient15: null,
      strMeasure1: '1 3/4 shot ',
      strMeasure2: '1 Shot ',
      strMeasure3: '1/4 Shot',
      strMeasure4: '1/8 Shot',
      strMeasure5: null,
      strMeasure6: null,
      strMeasure7: null,
      strMeasure8: null,
      strMeasure9: null,
      strMeasure10: null,
      strMeasure11: null,
      strMeasure12: null,
      strMeasure13: null,
      strMeasure14: null,
      strMeasure15: null,
      strImageSource: null,
      strImageAttribution: null,
      strCreativeCommonsConfirmed: 'No',
      dateModified: '2017-09-07 21:42:09',
    },
  ];

  return (
    <div>
      <Header title="Drinks" />
      {
        drinks.map((drink, index) => (
          <RecipeCard
            key={ drink.idDrink }
            recipe={ {
              name: drink.strDrink,
              image: drink.strDrinkThumb,
            } }
            index={ index }
          />
        ))
      }
      <Footer />
    </div>
  );
}

export default Drinks;
