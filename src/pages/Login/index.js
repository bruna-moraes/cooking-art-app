import React, { useContext } from 'react';
import MyContext from '../../context/MyContext';

import './index.css';
import logotipo from '../../images/logo-recipe-app.svg';
import logotipoText from '../../images/logo-text.svg';

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
    <div className="login-page">
      <div className="login-content">
        <div className="information-container">
          <img
            className="logo-image"
            alt="logotipo-recipe-app"
            src={ logotipo }
          />
          <img
            className="logo-text"
            alt="logotipo-recipe-app"
            src={ logotipoText }
          />
          <span>
            Experimente diversas culinárias ao redor do mundo enquanto cria lembranças!
          </span>
        </div>
        <form className="form-content">
          <label htmlFor="Email">
            <input
              className="input-email"
              placeholder="Email"
              data-testid="email-input"
              name="Email"
              value={ email }
              type="text"
              onChange={ handleChangeEmail }
            />
          </label>
          <label htmlFor="Password">
            <input
              className="input-password"
              placeholder="Password"
              data-testid="password-input"
              name="Password"
              value={ password }
              type="Password"
              onChange={ handleChangePassword }
            />
          </label>
        </form>
        <div className="buttons-container">
          <button
            className={ submitDisable
              ? 'primary-button-disable'
              : 'primary-button-enable' }
            data-testid="login-submit-btn"
            type="button"
            disabled={ submitDisable }
            onClick={ handleSubmit }
          >
            Login
          </button>
          <hr className="divider" />
          <button
            className="secundary-button"
            data-testid="login-create-account-btn"
            type="button"
          >
            Create new Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
