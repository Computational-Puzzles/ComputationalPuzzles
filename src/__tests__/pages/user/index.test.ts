import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  mockEmail,
  mockPassword
} from '../../../__mocks__/pages/api/auth/index';
import usersHandler from '../../../pages/api/user';
import { prisma } from '../../../__mocks__';

const { createUser } = PrismaAdapter(prisma);
let email: string;

beforeEach(async () => {
  email = mockEmail();
  await prisma.user.deleteMany({});
  await createUser({
    email,
    password: mockPassword()
  });
});

describe('/api/user: Succeeded', () => {
  it('should return a user', async () => {
    const req = {
      body: {
        email
      }
    } as NextApiRequest;
    const json = jest.fn();
    const status = jest.fn().mockReturnValue({ json });
    const res = {
      status
    } as unknown as NextApiResponse;

    await usersHandler(req, res);
    expect(json).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        email,
        password: expect.any(String)
      })
    );
    expect(status).toHaveBeenNthCalledWith(1, 200);
  });
});
