import { Link, NavLink } from 'react-router-dom';
import classes from './Navigation.module.css';

const Navigation = () => {
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React App</div>
      </Link>
      <nav>
        <ul>
          <li>
            <NavLink activeClassName={classes.active} to="/auth">
              Login
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={classes.active} to="/profile">
              Profile
            </NavLink>
          </li>
          <li>
            <button>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
