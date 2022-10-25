import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function Login() {
  const {
    email,
    password,
    handleChangeEmail,
    handleChangePassword,
    submitDisable,
    handleSubmit,
  } = useContext(MyContext);

  return (
    <form>
      <label htmlFor="Email">
        Email:
        <input
          data-testid="email-input"
          name="Email"
          value={ email }
          type="text"
          onChange={ handleChangeEmail }
        />
      </label>

      <label htmlFor="Password">
        Password:
        <input
          data-testid="password-input"
          name="Password"
          value={ password }
          type="Password"
          onChange={ handleChangePassword }
        />
      </label>

      <button
        data-testid="login-submit-btn"
        type="button"
        disabled={ submitDisable }
        onClick={ handleSubmit }
      >
        Login
      </button>
    </form>
  );
}

export default Login;
