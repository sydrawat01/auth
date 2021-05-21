import { Route, Switch, Redirect } from 'react-router-dom';

import { useAppSelector, isLoggedIn } from './store/hooks/rtkHooks';

import Layout from './components/Layout/Layout';
import HomePage from './containers/HomePage';
import ProfilePage from './containers/ProfilePage';
import AuthPage from './containers/AuthPage';

const App = () => {
  const loggedIn = useAppSelector(isLoggedIn);

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/auth">
          {!loggedIn && <AuthPage />}
          {loggedIn && <Redirect to="/profile" />}
        </Route>
        <Route path="/profile">
          {loggedIn && <ProfilePage />}
          {!loggedIn && <Redirect to="/auth" />}
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
};

export default App;
