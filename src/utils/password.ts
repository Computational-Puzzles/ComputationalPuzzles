import argon2 from 'argon2';

const hashFunction = (secret: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    argon2
      .hash(secret, { type: argon2.argon2id })
      .then(hash => resolve(hash))
      .catch(err => reject(err));
  });
};

const checkHash = (secret: string, hashValue: string): Promise<boolean> => {
  return new Promise((resolve, _reject) => {
    argon2
      .verify(hashValue, secret)
      .then(res => resolve(res))
      .catch(() => resolve(false));
  });
};

export { hashFunction, checkHash };
