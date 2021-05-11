import PasswordForm from './PasswordForm';

import classes from './UserProfile.module.css';

const UserProfile = () => {
  return (
    <section className={classes.profile}>
      <h1>This is the profile page!</h1>
      <PasswordForm />
    </section>
  );
};

export default UserProfile;
