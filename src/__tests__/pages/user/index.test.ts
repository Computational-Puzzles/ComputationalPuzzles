import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client'; 
import { NextApiRequest, NextApiResponse } from 'next';
import { mockEmail, mockPassword } from '../../../__mocks__/pages/api/auth/index';

import usersHandler from '../../../pages/api/user';

const prisma = new PrismaClient();
const { createUser } = PrismaAdapter(prisma);
let email;

beforeEach(async () => {
  email = mockEmail();
  await prisma.user.deleteMany({});
  await createUser({
    email,
    password: mockPassword(),
  })
})

describe('Sucessfully retrieve user', () => {
  it('should return a user', async () => {
    const req = {
      query: {
        email,
      },
    } as unknown as NextApiRequest;
  
    const json = jest.fn();
    const status = jest.fn().mockReturnValue({ json });
    const res = {
      status,
    } as unknown as NextApiResponse;
    await usersHandler(req, res);
    expect(json).toHaveBeenCalledWith({
      createdAt: expect.any(Date),
      email,
      emailVerified: null,
      id: expect.any(Number),
      image: null,
      name: null,
      password: expect.any(String),
      updatedAt: expect.any(Date),
    });
    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledTimes(1);
    expect(status).toHaveBeenCalledTimes(1);
    expect(json.mock.calls[0][0]).toMatchObject({
      email,
      password: expect.any(String),
    });
  });
});
