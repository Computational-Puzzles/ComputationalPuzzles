import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  mockEmail,
  mockPassword
} from '../../../__mocks__/pages/api/auth/index';

import usersHandler from '../../../pages/api/user';

const prisma = new PrismaClient();
const { createUser } = PrismaAdapter(prisma);
let email;

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
      query: {
        email
      }
    } as unknown as NextApiRequest;
    const json = jest.fn();
    const status = jest.fn().mockReturnValue({ json });
    const res = {
      status
    } as unknown as NextApiResponse;
  
    await usersHandler(req, res);
    expect(json).toHaveBeenNthCalledWith(1, {
      createdAt: expect.any(Date),
      email,
      emailVerified: null,
      id: expect.any(Number),
      image: null,
      name: null,
      password: expect.any(String),
      updatedAt: expect.any(Date)
    });
    expect(status).toHaveBeenNthCalledWith(1, 200);
  });
});
