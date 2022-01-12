import React from 'react';
import Loading from '../components/Global/Loading';
import ErrorDisplay from '../components/Global/ErrorDisplay';

const handleLoadingError = (isLoading, errorList) => {
  if (isLoading) return <Loading />;
  if (errorList) {
    const error = errorList[0];
    return <ErrorDisplay errorCode={error.status} message={error.message} />;
  }
};

export {handleLoadingError};
