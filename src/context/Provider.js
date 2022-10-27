import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitDisable, setSubmitDisable] = useState(true);
  const [searchBarValue, setSearchBarValue] = useState('');
  const [searchBarParameter, setSearchBarParameter] = useState('ingrediente');
  const [fetchedItems, setFetchedItems] = useState([]);
  const [inputVisivel, setInputVisivel] = useState(false);
  const [redirect, setRedirect] = useState(false);
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
    handleVisivelInput,
    setInputVisivel,
    inputVisivel,
    redirect,
    setRedirect,
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
    handleVisivelInput,
    inputVisivel,
    setInputVisivel,
    redirect,
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
