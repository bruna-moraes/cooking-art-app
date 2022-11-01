import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
import fetchApi from '../services/fetchApi';
import fetchCategories from '../services/fetchCategories';
import fetchRecipesByCategory from '../services/fetchRecipesByCategory';

function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitDisable, setSubmitDisable] = useState(true);
  const [searchBarValue, setSearchBarValue] = useState('');
  const [searchBarParameter, setSearchBarParameter] = useState('ingrediente');
  const [fetchedItems, setFetchedItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [inputVisivel, setInputVisivel] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [detailedRecipe, setDetailedRecipe] = useState([]);
  const [recomendations, setRecomendations] = useState([]);
  const [inProgressRecipe, setInProgressRecipe] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [favoriteRecipe, setFavoriteRecipe] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const handleValidate = () => {
      const regex = /\S+@\S+\.\S+/;
      const passLength = 7;
      const verifyEmail = email && regex.test(email);
      const verifyPassword = password.length >= passLength;
      setSubmitDisable(!(verifyEmail && verifyPassword));
    };
    handleValidate();
  }, [email, password]);

  const handleChangeEmail = useCallback(({ target }) => {
    const { value } = target;
    setEmail(value);
  }, []);

  const handleChangePassword = useCallback(({ target }) => {
    const { value } = target;
    setPassword(value);
  }, []);

  const firstLoadFetch = useCallback(async (title) => {
    const data = await fetchApi('nome', '', title);
    const numberOfRecipes = 12;
    setFetchedItems(data.slice(0, numberOfRecipes));
  }, []);

  const loadCategories = useCallback(async (recipesType) => {
    const fetchedCategories = await fetchCategories(recipesType);

    setCategories(fetchedCategories);
  }, []);

  const filterRecipesByCategory = useCallback(async (recipesType, category) => {
    if (selectedCategory === category || category === 'All') {
      await firstLoadFetch(recipesType);

      setSelectedCategory('All');

      return;
    }

    const filteredRecipesByCategory = await fetchRecipesByCategory(recipesType, category);

    setFetchedItems(filteredRecipesByCategory);
    setSelectedCategory(category);
  }, [firstLoadFetch, selectedCategory]);

  const handleSubmit = useCallback(() => {
    localStorage.setItem('user', JSON.stringify({ email }));

    history.push('/meals');
  }, [email, history]);

  const handleVisivelInput = useCallback(() => {
    setInputVisivel(!inputVisivel);
  }, [inputVisivel]);

  const context = useMemo(() => ({
    email,
    password,
    handleChangeEmail,
    handleChangePassword,
    submitDisable,
    setSearchBarValue,
    searchBarValue,
    setSearchBarParameter,
    searchBarParameter,
    setFetchedItems,
    handleSubmit,
    history,
    fetchedItems,
    firstLoadFetch,
    categories,
    loadCategories,
    filterRecipesByCategory,
    handleVisivelInput,
    setInputVisivel,
    inputVisivel,
    redirect,
    setRedirect,
    detailedRecipe,
    setDetailedRecipe,
    recomendations,
    setRecomendations,
    inProgressRecipe,
    setInProgressRecipe,
    copiedLink,
    setCopiedLink,
    favoriteRecipe,
    setFavoriteRecipe,
  }), [
    email,
    password,
    handleChangeEmail,
    handleChangePassword,
    submitDisable,
    searchBarValue,
    searchBarParameter,
    fetchedItems,
    handleSubmit,
    history,
    firstLoadFetch,
    categories,
    loadCategories,
    filterRecipesByCategory,
    handleVisivelInput,
    inputVisivel,
    setInputVisivel,
    redirect,
    detailedRecipe,
    setDetailedRecipe,
    recomendations,
    inProgressRecipe,
    copiedLink,
    favoriteRecipe,
  ]);

  return (
    <MyContext.Provider value={ context }>
      { children }
    </MyContext.Provider>

  );
}

export default Provider;

Provider.propTypes = {
  children: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
