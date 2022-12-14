import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';

import Login from './pages/Login';

import Recipes from './pages/Recipes';
import RecipesDetails from './pages/RecipeDetails';
import RecipesInProgress from './pages/RecipeInProgress';
import DoneRecipes from './pages/DoneRecipes';

import Profile from './pages/Profile';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        component={ Login }
      />

      <Route
        exact
        path="/meals"
        component={ Recipes }
      />
      <Route
        exact
        path="/drinks"
        component={ Recipes }
      />

      <Route
        exact
        path="/meals/:id"
        component={ RecipesDetails }
      />
      <Route
        exact
        path="/drinks/:id"
        component={ RecipesDetails }
      />

      <Route
        exact
        path="/meals/:id/in-progress"
        component={ RecipesInProgress }
      />
      <Route
        exact
        path="/drinks/:id/in-progress"
        component={ RecipesInProgress }
      />

      <Route
        exact
        path="/profile"
        component={ Profile }
      />

      <Route
        exact
        path="/done-recipes"
        component={ DoneRecipes }
      />

      <Route
        exact
        path="/favorite-recipes"
        component={ FavoriteRecipes }
      />
    </Switch>
  );
}

export default App;
