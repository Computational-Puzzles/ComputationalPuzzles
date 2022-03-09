import { checkHash, hashFunction } from '../../utils/password';

describe('testing the hashFunction', () => {
  it('should compare the secret hashed and without', () => {
    expect(hashFunction('secret_hi')).not.toBe('secret_hi');
  });

  it('should compare the length of 2 hashed passwords', async () => {
    //add 2 random length passwords: 1-10
    const len1 = Math.floor(Math.random()*10+1);
    const len2 = Math.floor(Math.random()*10+1);
    // generate random strings with the length above;
    const pw1 = getRandomString(len1);
    const pw2 = getRandomString(len2);
    console.log("password 1 is " + pw1);
    console.log("password 2 is " + pw2);
    //generate 2 hashed pw
    const hashed1 = await hashFunction(pw1);
    const hashed2 = await hashFunction(pw2);
    expect(hashed1.length).toBe(hashed2.length);
  });
});
describe('testing the checkHash', () => {
  it('should have the same hashed values for the same secret input', async () => {
    expect(checkHash('password', await hashFunction('password'))).toBe(true);
  });
});

const getRandomString = (length) =>{
  const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let str = '';
  for (let i=0; i<length; i++){
    str += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  return str;
}
