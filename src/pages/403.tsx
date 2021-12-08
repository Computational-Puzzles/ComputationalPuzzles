import * as React from 'react';

import { ErrorDisplay } from '../components/Global';

const Error403 = () => {
  return <ErrorDisplay errorCode={404} message="Who are you 🤨?" />;
};

export default Error403;
