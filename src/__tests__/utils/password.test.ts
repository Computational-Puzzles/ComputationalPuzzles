import { checkHash, hashFunction } from '../../utils/password';
import { getRandomString } from '../../__mocks__/getRandom';

describe('Validating the hash function, ', () => {
  it('the hashed value should not equal the secret.', async () => {
    const secret = getRandomString();
    expect(await hashFunction(secret)).not.toBe(secret);
  });
});

describe('When hashing secret strings, ', () => {
  it('should not return the same hashed value twice for the same string', async () => {
    const secret = getRandomString();
    expect(await hashFunction(secret)).not.toBe(await hashFunction(secret));
  });

  it('should return hashed strings of the same length regardless of the strings passed', async () => {
    const pw1 = getRandomString();
    const pw2 = getRandomString();
    const hashed1 = await hashFunction(pw1);
    const hashed2 = await hashFunction(pw2);
    expect(hashed1.length).toBe(hashed2.length);
  });
});

describe('Testing the checkHash: ', () => {
  it('should have the same hashed values for the same secret input', async () => {
    const secret = getRandomString();
    expect(await checkHash(secret, await hashFunction(secret))).toBe(true);
  });
});
