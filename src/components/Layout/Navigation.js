import { Link, NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import classes from './Navigation.module.css';

const Navigation = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const history = useHistory();

  const logoutHandler = () => {
    history.replace('/auth');
  };
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React App</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <NavLink activeClassName={classes.active} to="/auth">
                Login
              </NavLink>
            </li>
          )}
          {isLoggedIn && (
            <>
              <li>
                <NavLink activeClassName={classes.active} to="/profile">
                  Profile
                </NavLink>
              </li>
              <li>
                <button onClick={logoutHandler}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
