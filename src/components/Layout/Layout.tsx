import { FC } from 'react';

import Navigation from './Navigation';

const Layout: FC = (props) => {
  return (
    <>
      <Navigation />
      <main>{props.children}</main>
    </>
  );
};

export default Layout;
