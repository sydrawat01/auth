import { useRef } from 'react';

import classes from './PasswordForm.module.css';

import LoadingSpinner from '../UI/LoadingSpinner';

const PasswordForm = (props) => {
  const pwdInputRef = useRef();

  const submitFormHandler = (event) => {
    event.preventDefault();
    const newPwd = pwdInputRef.current.value;
    // ADD: password validation
    props.onChangePassword(newPwd);
  };
  return (
    <>
      <form className={classes.form} onSubmit={submitFormHandler}>
        <div className={classes.control}>
          <label htmlFor="new-password">New Password</label>
          <input type="password" id="new-password" ref={pwdInputRef} />
        </div>
        <div className={classes.action}>
          {!props.isLoading && <button>Change Password</button>}
          {props.isLoading && <LoadingSpinner />}
        </div>
      </form>
    </>
  );
};

export default PasswordForm;
