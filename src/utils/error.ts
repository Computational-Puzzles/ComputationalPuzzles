import { HandledError } from '../types/error';

const handleServiceError = (status, message?) => {
  if (status === 400) {
    return {
      name: '400',
      message: message || 'Bad Request.',
      error: true
    } as HandledError;
  } else if (status === 404) {
    return {
      name: '404',
      message: message || 'Not Found.',
      error: true
    } as HandledError;
  } else {
    return {
      name: '500',
      message: message || 'Server Error.',
      error: true
    } as HandledError;
  }
};

export {handleServiceError};
