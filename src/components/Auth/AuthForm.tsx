import { useState, useRef, FC, FormEvent } from 'react';

import { useAppDispatch } from '../../store/hooks/rtkHooks';
import { login } from '../../store/actions/auth-actions';

import LoadingSpinner from '../UI/LoadingSpinner';
import Modal from '../UI/Modal';

import classes from './AuthForm.module.css';

const AuthForm: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const emailRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);
  const [isLogin, setIsLogin] = useState(true);

  const closeModalHandler = () => {
    setShowModal(false);
  };

  const switchModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitFormHandler = (event: FormEvent) => {
    event.preventDefault();
    const email = emailRef.current!.value;
    const password = pwdRef.current!.value;
    // ADD: Email and password validation
    let url = '';
    setIsLoading(true);
    setError(null);
    if (isLogin) {
      url = process.env.REACT_APP_SIGN_IN!;
    } else {
      url = process.env.REACT_APP_SIGN_UP!;
    }
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errMsg = 'unknown error occurred!';
            if (data && data.error && data.error.message) {
              errMsg = data.error.message;
            }
            throw new Error(errMsg);
          });
        }
      })
      .then((data) => dispatch(login(data.idToken)))
      .catch((err) => {
        setShowModal(true);
        setError(err.message);
      });
  };

  return (
    <>
      <section className={classes.auth}>
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
        <form onSubmit={submitFormHandler}>
          <div className={classes.control}>
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" ref={emailRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="pwd">Password</label>
            <input type="password" id="pwd" ref={pwdRef} />
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
