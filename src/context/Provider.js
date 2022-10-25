import React, { useState, useMemo, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
import fetchFoodSearch from '../services/fetchFoodSearch';

function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitDisable, setSubmitDisable] = useState(true);
  const [searchBarValue, setSearchBarValue] = useState('');
  const [searchBarParameter, setSearchBarParameter] = useState('ingrediente');
  const [fetchFoodResults, setFetchFoodResults] = useState([]);

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

  const handleSearchClick = useCallback(async () => {
    if (searchBarParameter === 'fist-letter' && searchBarValue.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    const data = await fetchFoodSearch(searchBarParameter, searchBarValue);
    setFetchFoodResults(data);
  }, [searchBarParameter, searchBarValue]);

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
    fetchFoodResults,
    handleSearchClick,
  }), [
    email,
    password,
    handleChangeEmail,
    handleChangePassword,
    submitDisable,
    searchBarValue,
    searchBarParameter,
    fetchFoodResults,
    handleSearchClick,
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
}.isRequired;
