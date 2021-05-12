import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHttp } from '../../hooks/use-http';
import { AuthActions } from '../../store/actions/auth-actions';

import PasswordForm from './PasswordForm';
import Modal from '../UI/Modal';

import classes from './UserProfile.module.css';

const UserProfile = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { isLoading, error, responseData, sendRequest: changePwd } = useHttp();

  const closeModalHandler = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (responseData && !error && !isLoading) {
      dispatch(AuthActions.logout());
    } else {
      setShowModal(true);
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
    <>
      <section className={classes.profile}>
        <h1>This is the profile page!</h1>
        <PasswordForm
          onChangePassword={passwordChangeHandler}
          isLoading={isLoading}
          error={error}
        />
      </section>
      {error && !isLoading && showModal && (
        <Modal onClose={closeModalHandler}>{error}</Modal>
      )}
    </>
  );
};

export default UserProfile;
