import { useContext, useEffect } from 'react';

import Footer from './Footer';
import Header from './Header';
import MyContext from '../context/MyContext';
import RecipeCard from './RecipeCard';

function Drinks() {
  const { fetchedItems, firstLoadFetch } = useContext(MyContext);

  useEffect(() => {
    firstLoadFetch('Drinks');
  }, [firstLoadFetch]);

  return (
    <div>
      <Header title="Drinks" />
      {
        fetchedItems.map((drink, index) => (
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
