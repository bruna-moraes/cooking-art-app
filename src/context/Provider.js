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

  const handleSearchValue = ({ target: { value } }) => setSearchBarValue(value);

  const handleSearchParameter = ({ target: { value } }) => setSearchBarParameter(value);

  const handleClickFetch = useCallback(async (title) => {
    const data = await fetchApi(searchBarParameter, searchBarValue, title);
    const numberOfRecipes = 12;
    setFetchedItems(data.slice(0, numberOfRecipes));
  }, [searchBarParameter, searchBarValue]);

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

  const context = useMemo(() => ({
    email,
    password,
    handleChangeEmail,
    handleChangePassword,
    submitDisable,
    searchBarValue,
    searchBarParameter,
    handleSearchValue,
    handleSearchParameter,
    handleSubmit,
    history,
    handleClickFetch,
    fetchedItems,
    firstLoadFetch,
    categories,
    loadCategories,
    filterRecipesByCategory,
  }), [
    email,
    password,
    handleChangeEmail,
    handleChangePassword,
    submitDisable,
    searchBarValue,
    searchBarParameter,
    fetchedItems,
    handleClickFetch,
    handleSubmit,
    history,
    firstLoadFetch,
    categories,
    loadCategories,
    filterRecipesByCategory,
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
