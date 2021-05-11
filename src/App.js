import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Layout from './components/Layout/Layout';
import HomePage from './containers/HomePage';
import ProfilePage from './containers/ProfilePage';
import AuthPage from './containers/AuthPage';

const App = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        {!isLoggedIn && (
          <Route path="/auth">
            <AuthPage />
          </Route>
        )}
        <Route path="/profile">
          {isLoggedIn && <ProfilePage />}
          {!isLoggedIn && <Redirect to="/auth" />}
        </Route>

        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
};

export default App;
