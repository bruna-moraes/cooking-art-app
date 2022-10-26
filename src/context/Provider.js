import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
import fetchApi from '../services/fetchApi';

function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitDisable, setSubmitDisable] = useState(true);
  const [searchBarValue, setSearchBarValue] = useState('');
  const [searchBarParameter, setSearchBarParameter] = useState('ingrediente');
  const [fetchedItems, setFetchedItems] = useState([]);
  const [inputVisivel, setInputVisivel] = useState(false);
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
    setFetchedItems(data);
  }, [searchBarParameter, searchBarValue]);

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
    searchBarValue,
    searchBarParameter,
    handleSearchValue,
    handleSearchParameter,
    handleSubmit,
    history,
    handleClickFetch,
    fetchedItems,
    handleVisivelInput,
    setInputVisivel,
    inputVisivel,
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
    handleVisivelInput,
    inputVisivel,
    setInputVisivel,

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
