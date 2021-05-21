import { FC } from 'react';

import classes from './LoadingSpinner.module.css';

const LoadingSpinner: FC = () => {
  return <div className={classes.loader} />;
};

export default LoadingSpinner;
