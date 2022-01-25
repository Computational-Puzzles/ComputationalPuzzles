import {checkHash, hashFunction} from "../../utils/password";

describe('testing the hashFunction',()=>{
    it( 'should compare the password hashed and without', ()=>{
        expect(hashFunction('password')).not.toBe('password');
    });

    it( 'should compare the length of 2 hashed passwords', async ()=>{
        const hashed1 = await hashFunction('password1');
        const hashed2 = await hashFunction('pw2');
        expect(hashed1.length).toBe(hashed2.length);
    });
});
describe('testing the hashFunction',()=>{
    it('should return the same results', async () => {
        expect(checkHash('password', await hashFunction('password'))).toBeTruthy();
    });
});

