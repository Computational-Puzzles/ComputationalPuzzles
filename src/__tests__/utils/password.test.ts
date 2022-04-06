import { checkHash, hashFunction } from '../../utils/password';
import { getRandomString } from '../../__mocks__/getRandom';

describe('testing the hashFunction: ', () => {
  it('should compare the secret hashed and without', async () => {
    const secret = getRandomString();
    expect(await hashFunction(secret)).not.toBe(secret);
    expect(await hashFunction(secret)).not.toBe(await hashFunction(secret));
  });

  it('should compare the length of 2 hashed passwords', async () => {;
    const pw1 = getRandomString();
    const pw2 = getRandomString();
    const hashed1 = await hashFunction(pw1);
    const hashed2 = await hashFunction(pw2);
    expect(hashed1.length).toBe(hashed2.length);
  });
});

describe('testing the checkHash: ', () => {
  it('should have the same hashed values for the same secret input', async () => {
    const secret = getRandomString();
    expect(await checkHash(secret, await hashFunction(secret))).toBe(true);
  });
});
