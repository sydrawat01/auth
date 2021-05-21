import { useState, FC } from 'react';
import {
  useAppDispatch,
  useAppSelector,
  token,
} from '../../store/hooks/rtkHooks';
import { logout } from '../../store/actions/auth-actions';

import PasswordForm from './PasswordForm';
import Modal from '../UI/Modal';

import classes from './UserProfile.module.css';

const UserProfile: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const idToken = useAppSelector(token);

  const closeModalHandler = () => {
    setShowModal(false);
  };

  const passwordChangeHandler = async (password: string) => {
    setIsLoading(true);
    setError(null);
    fetch(process.env.REACT_APP_CHANGE_PWD!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idToken,
        password,
        returnSecureToken: false,
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
      .then((data) => dispatch(logout()))
      .catch((err) => {
        setShowModal(true);
        setError(err.message);
      });
  };

  return (
    <>
      <section className={classes.profile}>
        <h1>Welcome, user!</h1>
        <PasswordForm
          onChangePassword={passwordChangeHandler}
          isLoading={isLoading}
        />
      </section>
      {error && !isLoading && showModal && (
        <Modal onClose={closeModalHandler}>{error}</Modal>
      )}
    </>
  );
};

export default UserProfile;
