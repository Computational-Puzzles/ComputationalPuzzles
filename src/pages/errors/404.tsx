import * as React from 'react';

import { ErrorDisplay } from '../../components/Global';

const Error404 = () => {
  return (
    <ErrorDisplay errorCode={404} message='Are you lost?' />
  );
};

export default Error404;
