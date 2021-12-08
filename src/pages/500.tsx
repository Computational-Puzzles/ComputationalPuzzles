import * as React from 'react';

import { ErrorDisplay } from '../components/Global';

const Error500 = () => {
  return <ErrorDisplay errorCode={500} message="Oh no, the app, it's broken 😫" />;
};

export default Error500;
