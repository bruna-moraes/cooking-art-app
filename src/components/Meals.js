import { useContext, useEffect } from 'react';

import Header from './Header';
import Footer from './Footer';
import MyContext from '../context/MyContext';
import RecipeCard from './RecipeCard';

function Meals() {
  const { fetchedItems, firstLoadFetch } = useContext(MyContext);

  useEffect(() => {
    firstLoadFetch('Meals');
  }, [firstLoadFetch]);

  return (
    <div>
      <Header title="Meals" />
      {
        fetchedItems.map((meal, index) => (
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
