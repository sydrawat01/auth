import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHttp } from '../../hooks/use-http';
import { AuthActions } from '../../store/actions/auth-actions';

import PasswordForm from './PasswordForm';

import classes from './UserProfile.module.css';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { isLoading, error, responseData, sendRequest: changePwd } = useHttp();

  useEffect(() => {
    if (responseData && !error && !isLoading) {
      dispatch(AuthActions.logout());
    }
  }, [responseData, error, isLoading, dispatch]);

  const passwordChangeHandler = async (newPwd) => {
    changePwd({
      url: process.env.REACT_APP_CHANGE_PWD,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        idToken: token,
        password: newPwd,
        returnSecureToken: false,
      },
    });
  };
  return (
    <section className={classes.profile}>
      <h1>This is the profile page!</h1>
      <PasswordForm
        onChangePassword={passwordChangeHandler}
        isLoading={isLoading}
        error={error}
      />
    </section>
  );
};

export default UserProfile;
