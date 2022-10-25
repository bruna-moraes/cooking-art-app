import React, { useState, useMemo, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitDisable, setSubmitDisable] = useState(true);
  console.log(setSubmitDisable);

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

  const context = useMemo(() => ({
    email,
    password,
    handleChangeEmail,
    handleChangePassword,
    submitDisable,

  }), [
    email,
    password,
    handleChangeEmail,
    handleChangePassword,
    submitDisable,
  ]);

  return (
    <MyContext.Provider value={ context }>
      {children}
    </MyContext.Provider>

  );
}

export default Provider;

Provider.propTypes = {
  children: PropTypes.func,
}.isRequired;
