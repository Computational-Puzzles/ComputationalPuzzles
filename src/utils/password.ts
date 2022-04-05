import argon2 from 'argon2';

const hashFunction = (secret: string) => {
  try {
    return argon2.hash(secret, { type: argon2.argon2id });
  } catch (err) {
    throw err;
  }
};

const checkHash = (secret: string, hashValue: string) => {
  try {
    return argon2.verify(hashValue, secret);
  } catch (err) {
    throw err;
  }
};

export { hashFunction, checkHash };
