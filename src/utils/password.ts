import argon2 from 'argon2';

const hashFunction = async (secret: string) => {
  try {
    return argon2.hash(secret, { type: argon2.argon2id });
  } catch (err) {
    throw err;
  }
};

const checkHash = async (secret: string, hashValue: string) => {
  try {
    return await argon2.verify(hashValue, secret);
  } catch (err) {
    throw err;
  }
};

export { hashFunction, checkHash };
