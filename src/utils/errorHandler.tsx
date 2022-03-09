import React from 'react';
import { Loading, ErrorDisplay } from '../components/Global';

const handleLoadingError = (isLoading, errorList) => {
  if (isLoading) return <Loading />;
  if (errorList) {
    const error = errorList[0];
    return <ErrorDisplay errorCode={error.status} message={error.message} />;
  }
};

export { handleLoadingError };
