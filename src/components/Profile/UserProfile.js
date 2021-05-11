import { useSelector } from 'react-redux';
import { useHttp } from '../../hooks/use-http';
import PasswordForm from './PasswordForm';

import classes from './UserProfile.module.css';

const UserProfile = () => {
  const { token } = useSelector((state) => state.auth);
  const { isLoading, error, sendRequest: changePwd } = useHttp();
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
