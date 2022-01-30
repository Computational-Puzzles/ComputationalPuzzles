/**
 * @jest-environment node
 */
import { PrismaClient } from '@prisma/client';
import signUpHandler from '../../../../pages/api/auth/signup';
import * as dotenv from 'dotenv';
dotenv.config();

// import { checkHash } from '../../../../utils/password';
import { userData, manyUserData } from '../../../../__mocks__/pages/api/auth';
import type { UserDataProp } from '../../../../__mocks__/pages/api/auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { checkHash } from '../../../../utils/password';

const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.$connect();
});

beforeEach(async () => {
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('Successfully create user(s)', () => {
  it('Create user successs', async () => {
    const { email, password } = userData;
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

    expect(json.mock.calls[0][0]).toMatchObject({
      email,
      password: expect.any(String)
    });
    expect(status.mock.calls[0]).toEqual([201]);

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });

    expect(user).toBeDefined();
    expect(user.email).toEqual(email);
    expect(user.password).not.toBeNull();
    expect(user.password).not.toBe(password);
    expect(user.password).toBeDefined();
    expect(checkHash(password, user.password)).toEqual(true);
  });

  it('Create multiple users', async () => {
    const numUsers = Math.ceil(Math.random() * 10);
    const usersData = manyUserData(numUsers);

    const json = jest.fn();

    const status = jest.fn(() => {
      return { json };
    });

    const res = {
      status
    } as unknown as NextApiResponse;

    const createUserPromise = usersData.map((user: UserDataProp) => {
      const { email, password } = user;
      const req = {
        body: {
          email,
          password
        }
      } as NextApiRequest;

      return signUpHandler(req, res);
    });

    const users = await Promise.all(createUserPromise).then(() =>
      prisma.user.findMany()
    );

    expect(json.mock.calls.length).toEqual(numUsers);

    users.forEach((user: UserDataProp) => {
      expect(user).toBeDefined();
      expect(status.mock.calls[0]).toEqual([201]);
      expect(json.mock.calls).toEqual(
        expect.arrayContaining([
          expect.arrayContaining([
            expect.objectContaining({
              email: user.email,
              password: expect.any(String)
            })
          ])
        ])
      );
    });

    expect(users.length).toEqual(numUsers);
  });
});

describe('Failed to create user', () => {
  it('Email is null', async () => {
    const { password } = userData;
    const email = null;
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

    expect(status.mock.calls[0]).toEqual([409]);

    const user = await prisma.user.findMany();

    expect(user.length).toEqual(0);
  });

  it('Email is undefined', async () => {
    const { password } = userData;
    const email = undefined;
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

    expect(status.mock.calls[0]).toEqual([409]);

    const user = await prisma.user.findMany();

    expect(user.length).toEqual(0);
  });

  it('Password is null', async () => {
    const { email } = userData;
    const password = null;
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

    expect(status.mock.calls[0]).toEqual([409]);

    const user = await prisma.user.findMany();

    expect(user.length).toEqual(0);
  });

  it('Password is undefined', async () => {
    const { email } = userData;
    const password = undefined;
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

    expect(status.mock.calls[0]).toEqual([409]);

    const user = await prisma.user.findMany();

    expect(user.length).toEqual(0);
  });
});
