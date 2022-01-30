import dotenv from 'dotenv';
dotenv.config();

import {
  mockUserData,
  mockPassword,
  mockEmail
} from '../../../../__mocks__/pages/api/auth';
import signUpHandler from '../../../../pages/api/auth/signup';
import resetPasswordHandler from '../../../../pages/api/auth/reset-password';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { hashFunction } from '../../../../utils/password';
import { resetPasswordProps } from '../../../../types/api/auth/reset-password';

const prisma = new PrismaClient();

let email: string, password: string;

beforeEach(async () => {
  const userData = mockUserData();
  email = userData.email;
  password = userData.password;

  const req = {
    body: {
      email,
      password
    }
  } as NextApiRequest;

  const json = jest.fn();

  const status = jest.fn(() => {
    return { json };
  });

  const res = {
    status
  } as unknown as NextApiResponse;

  await signUpHandler(req, res);
});

describe('Successfully change password', () => {
  it('Change password successs', async () => {
    const hashPassword = (
      await prisma.user.findUnique({
        where: {
          email
        },
        select: {
          password: true
        }
      })
    ).password;

    const newPassword = mockPassword();

    const req = {
      body: {
        email: email,
        oldPassword: password,
        newPassword: newPassword
      } as resetPasswordProps
    } as NextApiRequest;

    const json = jest.fn();

    const status = jest.fn(() => {
      return { json };
    });

    const res = {
      status
    } as unknown as NextApiResponse;

    await resetPasswordHandler(req, res);

    expect(status.mock.calls[0]).toEqual([200]);
    expect(json.mock.calls[0]).toEqual([
      {
        message: 'Password changed'
      }
    ]);

    const currentPassword = (
      await prisma.user.findUnique({
        where: {
          email
        },
        select: {
          password: true
        }
      })
    ).password;

    expect(hashPassword).not.toEqual(currentPassword);
    expect(hashFunction(newPassword)).toEqual(currentPassword);
  });
});

describe('Fail to change password', () => {
  it('Wrong oldPassword', async () => {
    const req = {
      body: {
        email: email,
        oldPassword: 'wrongPassword',
        newPassword: mockPassword()
      } as resetPasswordProps
    } as NextApiRequest;

    const json = jest.fn();

    const status = jest.fn(() => {
      return { json };
    });

    const res = {
      status
    } as unknown as NextApiResponse;

    await resetPasswordHandler(req, res);

    expect(status.mock.calls[0]).toEqual([400]);
    expect(json.mock.calls[0]).toEqual([
      {
        message: 'Old password is incorrect'
      }
    ]);
  });

  it('Email not inside db', async () => {
    const req = {
      body: {
        email: mockEmail(),
        oldPassword: password,
        newPassword: mockPassword()
      } as resetPasswordProps
    } as NextApiRequest;

    const json = jest.fn();

    const status = jest.fn(() => {
      return { json };
    });

    const res = {
      status
    } as unknown as NextApiResponse;

    await resetPasswordHandler(req, res);

    expect(status.mock.calls[0]).toEqual([400]);
    expect(json.mock.calls[0]).toEqual([
      {
        message: 'User not found'
      }
    ]);
  });

  it('Email is null or undefined', async () => {
    let req = {
      body: {
        email: null,
        oldPassword: password,
        newPassword: mockPassword()
      } as resetPasswordProps
    } as NextApiRequest;

    const json = jest.fn();

    const status = jest.fn(() => {
      return { json };
    });

    const res = {
      status
    } as unknown as NextApiResponse;

    await resetPasswordHandler(req, res);

    expect(status.mock.calls[0]).toEqual([400]);
    expect(json.mock.calls[0]).toEqual([
      {
        message: 'Email, password and new password are required'
      }
    ]);

    req = {
      body: {
        email: undefined,
        oldPassword: password,
        newPassword: mockPassword()
      } as resetPasswordProps
    } as NextApiRequest;

    await resetPasswordHandler(req, res);

    expect(status.mock.calls[0]).toEqual([400]);
    expect(json.mock.calls[0]).toEqual([
      {
        message: 'Email, password and new password are required'
      }
    ]);
  });

  it('Old password is null or undefined', async () => {
    let req = {
      body: {
        email: email,
        oldPassword: null,
        newPassword: mockPassword()
      } as resetPasswordProps
    } as NextApiRequest;

    const json = jest.fn();

    const status = jest.fn(() => {
      return { json };
    });

    const res = {
      status
    } as unknown as NextApiResponse;

    await resetPasswordHandler(req, res);

    expect(status.mock.calls[0]).toEqual([400]);
    expect(json.mock.calls[0]).toEqual([
      {
        message: 'Email, password and new password are required'
      }
    ]);

    req = {
      body: {
        email: email,
        oldPassword: undefined,
        newPassword: mockPassword()
      } as resetPasswordProps
    } as NextApiRequest;

    await resetPasswordHandler(req, res);

    expect(status.mock.calls[0]).toEqual([400]);
    expect(json.mock.calls[0]).toEqual([
      {
        message: 'Email, password and new password are required'
      }
    ]);
  });

  it('New password is null or undefined', async () => {
    let req = {
      body: {
        email: email,
        oldPassword: password,
        newPassword: null
      } as resetPasswordProps
    } as NextApiRequest;

    const json = jest.fn();

    const status = jest.fn(() => {
      return { json };
    });

    const res = {
      status
    } as unknown as NextApiResponse;

    await resetPasswordHandler(req, res);

    expect(status.mock.calls[0]).toEqual([400]);
    expect(json.mock.calls[0]).toEqual([
      {
        message: 'Email, password and new password are required'
      }
    ]);

    req = {
      body: {
        email: email,
        oldPassword: password,
        newPassword: undefined
      } as resetPasswordProps
    } as NextApiRequest;

    await resetPasswordHandler(req, res);

    expect(status.mock.calls[0]).toEqual([400]);
    expect(json.mock.calls[0]).toEqual([
      {
        message: 'Email, password and new password are required'
      }
    ]);
  });
});
