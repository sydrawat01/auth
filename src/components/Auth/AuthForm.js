import React, { useState, useRef, useEffect } from 'react';
import { useHttp } from '../../hooks/use-http';
import { AuthActions } from '../../store/actions/auth-actions';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import LoadingSpinner from '../UI/LoadingSpinner';
import Modal from '../UI/Modal';

import classes from './AuthForm.module.css';

let url = '';

const AuthForm = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const emailInputRef = useRef();
  const pwdInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const { isLoading, error, responseData, sendRequest: userAuth } = useHttp();

  const closeModalHandler = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (responseData && !error && !isLoading) {
      dispatch(AuthActions.login(responseData.idToken));
      history.replace('/profile');
    } else {
      setShowModal(true);
    }
  }, [responseData, error, isLoading, dispatch, history]);

  const switchModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPwd = pwdInputRef.current.value;
    // ADD: Email and password validation
    if (isLogin) {
      url = process.env.REACT_APP_SIGN_IN;
    } else {
      url = process.env.REACT_APP_SIGN_UP;
    }
    userAuth({
      url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        email: enteredEmail,
        password: enteredPwd,
        returnSecureToken: true,
      },
    });
  };

  return (
    <>
      <section className={classes.auth}>
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
        <form onSubmit={submitFormHandler}>
          <div className={classes.control}>
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" ref={emailInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="pwd">Password</label>
            <input type="password" id="pwd" ref={pwdInputRef} />
          </div>
          <div className={classes.actions}>
            {!isLoading && <button>{isLogin ? 'Sign In' : 'Sign Up'}</button>}
            {isLoading && <LoadingSpinner />}
            <button
              type="button"
              onClick={switchModeHandler}
              className={classes.toggle}
            >
              {isLogin
                ? 'Create new account'
                : 'Continue with existing account'}
            </button>
          </div>
        </form>
      </section>
      {error && !isLoading && showModal && (
        <Modal onClose={closeModalHandler}>{error}</Modal>
      )}
    </>
  );
};

export default AuthForm;
