import { useContext, useEffect } from 'react';

import Header from '../../components/Header';
import DoneRecipeCard from '../../components/DoneRecipeCard';
import FiltersDoneRecipes from '../../components/FiltersDoneRecipes';
import MyContext from '../../context/MyContext';
import Footer from '../../components/Footer';

import './index.css';

function DoneRecipes() {
  const { filteredDonesRecipes, firstLoadRecipesDone } = useContext(MyContext);

  useEffect(() => {
    firstLoadRecipesDone();
  }, [firstLoadRecipesDone]);

  return (
    <div className="done-recipe-page page">
      <Header title="Done Recipes" notSearchIcon />

      <main className="recipe-main-content">
        <FiltersDoneRecipes />
        {
          filteredDonesRecipes.map((doneRecipe, index) => (
            <DoneRecipeCard
              key={ doneRecipe.id }
              doneRecipe={ doneRecipe }
              index={ index }
            />
          ))
        }
      </main>
      <Footer />
    </div>
  );
}

export default DoneRecipes;
