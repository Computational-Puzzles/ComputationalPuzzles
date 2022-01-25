import argon2 from "argon2";

const hashFunction = async (secret: string) => {
  return argon2.hash(secret, {type: argon2.argon2id});
};

const checkHash = async (checker: string, hash: string) => {
  return await hashFunction(checker) === hash;
};

export { hashFunction, checkHash };
