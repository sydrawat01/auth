import React, { useState } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const switchModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <section className={classes.auth}>
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
        <form onSubmit={submitFormHandler}>
          <div className={classes.control}>
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" />
          </div>
          <div className={classes.control}>
            <label htmlFor="pwd">Password</label>
            <input type="password" id="pwd" />
          </div>
          <div className={classes.actions}>
            <button>{isLogin ? 'Sign In' : 'Sign Up'}</button>
            <button onClick={switchModeHandler} className={classes.toggle}>
              {isLogin
                ? 'Create new account'
                : 'Continue with existing account'}
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default AuthForm;
