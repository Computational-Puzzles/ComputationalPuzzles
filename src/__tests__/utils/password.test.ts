import { checkHash, hashFunction } from '../../utils/password';
import {getRandomNumberMin, getRandomString} from '../../__mocks__/getRandom';

describe('testing the hashFunction', () => {
  it('should compare the secret hashed and without', async () => {
    expect(await hashFunction('secret_hi')).not.toBe('secret_hi');
    expect(await hashFunction('secret_hi')).not.toBe(
      await hashFunction('secret_hi')
    );
  });

  it('should compare the length of 2 hashed passwords', async () => {
    //add 2 random length passwords with length >= 1
    const len1 = getRandomNumberMin(1) ;
    const len2 = getRandomNumberMin(1) ;
    // generate random strings with the length above;
    const pw1 = getRandomString(len1);
    const pw2 = getRandomString(len2);
    //generate 2 hashed pw
    const hashed1 = await hashFunction(pw1);
    const hashed2 = await hashFunction(pw2);
    expect(hashed1.length).toBe(hashed2.length);
  });
});
describe('testing the checkHash', () => {
  it('should have the same hashed values for the same secret input', async () => {
    expect(await checkHash('password', await hashFunction('password'))).toBe(
      true
    );
  });
});
