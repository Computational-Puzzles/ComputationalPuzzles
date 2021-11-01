import { sha256 } from 'hash.js';

export const hashFunction = (secret: string) => {
  return sha256().update(secret).digest('hex');
};

export const checkHash = (checker: string, hash: string) => {
  if (hashFunction(checker) === hash) {
    return true;
  }
  return false;
};
