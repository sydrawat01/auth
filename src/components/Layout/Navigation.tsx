import { FC } from 'react';
import { Link, NavLink } from 'react-router-dom';

import {
  useAppDispatch,
  useAppSelector,
  isLoggedIn,
} from '../../store/hooks/rtkHooks';
import { logout } from '../../store/actions/auth-actions';

import classes from './Navigation.module.css';

const Navigation: FC = () => {
  const dispatch = useAppDispatch();
  const loggedIn = useAppSelector(isLoggedIn);
  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React App</div>
      </Link>
      <nav>
        <ul>
          {!loggedIn && (
            <li>
              <NavLink activeClassName={classes.active} to="/auth">
                Login
              </NavLink>
            </li>
          )}
          {loggedIn && (
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
