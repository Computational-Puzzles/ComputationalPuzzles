import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.test' });
// TODO: The above should be deleted when #110 and #111 are merged.

import { PrismaClient, User } from '@prisma/client'; // This also need to be removed when #110 and #111 are merged.
import { NextApiRequest, NextApiResponse } from 'next';
import {
  mockEmail,
  mockPassword,
  mockUsername
} from '../../../../__mocks__/pages/api/auth';

import updateUsernameHandler from '../../../../pages/api/user/update-username';

const prisma = new PrismaClient();

let user: User, userEmail: string;

beforeEach(async () => {
  userEmail = mockEmail();

  user = await prisma.user.create({
    data: {
      email: userEmail,
      password: mockPassword()
    }
  });
});

describe('/api/user/update-username: Suceeded', () => {
  it('successfully changes user name from null to new username', async () => {
    const newUsername = mockUsername();
    const req = {
      body: {
        email: userEmail,
        username: newUsername
      }
    } as NextApiRequest;

    const json = jest.fn();

    const status = jest.fn(() => {
      return { json };
    });

    const res = {
      status
    } as unknown as NextApiResponse;

    await updateUsernameHandler(req, res);

    expect(json).toHaveBeenNthCalledWith(1, { ...user, name: newUsername });
    expect(status).toHaveBeenNthCalledWith(1, 200);
  });

  it('successfully changes user name from old username to new username', async () => {
    const newUsername = mockUsername();
    const oldUsername = user.name;

    const req = {
      body: {
        email: userEmail,
        username: newUsername
      }
    } as NextApiRequest;

    const json = jest.fn();

    const status = jest.fn(() => {
      return { json };
    });

    const res = {
      status
    } as unknown as NextApiResponse;

    await updateUsernameHandler(req, res);

    expect(json.mock.calls[0][0].name).not.toEqual(oldUsername);
    expect(json).toHaveBeenNthCalledWith(1, { ...user, name: newUsername });
    expect(status).toHaveBeenNthCalledWith(1, 200);
  });
});

describe('/api/user/update-username: Failed', () => {
  it('returns an error when there is no email or password passed in', async () => {
    const json = jest.fn();

    const status = jest.fn(() => {
      return { json };
    });

    const res = {
      status
    } as unknown as NextApiResponse;

    let req = {
      body: {
        email: '',
        username: mockUsername()
      }
    } as NextApiRequest;

    await updateUsernameHandler(req, res);

    req = {
      body: {
        email: null,
        username: mockUsername()
      }
    } as NextApiRequest;

    await updateUsernameHandler(req, res);

    req = {
      body: {
        email: undefined,
        username: mockUsername()
      }
    } as NextApiRequest;

    await updateUsernameHandler(req, res);

    req = {
      body: {
        email: userEmail,
        username: ''
      }
    } as NextApiRequest;

    await updateUsernameHandler(req, res);

    req = {
      body: {
        email: userEmail,
        username: null
      }
    } as NextApiRequest;

    await updateUsernameHandler(req, res);

    req = {
      body: {
        email: userEmail,
        username: undefined
      }
    } as NextApiRequest;

    await updateUsernameHandler(req, res);

    expect(json).toHaveBeenNthCalledWith(6, {
      message: 'Please provide an email and username.'
    });
    expect(status).toHaveBeenNthCalledWith(6, 400);
  });
});
