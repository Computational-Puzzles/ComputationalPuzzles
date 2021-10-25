import { sha256 } from 'hash.js';

const hashFunction = (secret: string) => {
  return sha256().update(secret).digest('hex');
};

const checkPassword = (checkingPassword: string, hashedPassword: string) => {
  if (hashFunction(checkingPassword) === hashedPassword) {
    return true;
  }
  return false;
};

export default checkPassword;
