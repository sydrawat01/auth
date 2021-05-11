import classes from './PasswordForm.module.css';

import LoadingSpinner from '../UI/LoadingSpinner';

const PasswordForm = () => {
  return (
    <>
      <form className={classes.form}>
        <div className={classes.control}>
          <label htmlFor="new-password">New Password</label>
          <input type="password" id="new-password" />
        </div>
        <div className={classes.action}>
          <button>Change Password</button>
        </div>
      </form>
    </>
  );
};

export default PasswordForm;
