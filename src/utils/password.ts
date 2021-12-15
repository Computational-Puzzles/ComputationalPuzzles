import { sha256 } from 'hash.js';

const hashFunction = (secret: string) => {
  return sha256().update(secret).digest('hex');
};

const checkHash = (checker: string, hash: string) => {
  return hashFunction(checker) === hash;
};

export { hashFunction, checkHash };
