import { FC, FormEvent, useRef } from 'react';

import classes from './PasswordForm.module.css';

import LoadingSpinner from '../UI/LoadingSpinner';

const PasswordForm: FC<{
  onChangePassword: (pwd: string) => void;
  isLoading: boolean;
}> = (props) => {
  const pwdInputRef = useRef<HTMLInputElement>(null);

  const submitFormHandler = (event: FormEvent) => {
    event.preventDefault();
    const newPwd = pwdInputRef.current!.value;
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
