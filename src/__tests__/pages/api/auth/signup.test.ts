/**
 * @jest-environment node
 */
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import signUpHandler from '../../../../pages/api/auth/signup';
import {
  mockUserData,
  mockManyUserData
} from '../../../../__mocks__/pages/api/auth';
import type { UserDataProp } from '../../../../__mocks__/pages/api/auth';

const prisma = new PrismaClient();

beforeEach(async () => {
  await prisma.user.deleteMany();
});

describe('Successfully create user(s)', () => {
  it('Create user successs', async () => {
    const { email, password } = mockUserData();
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

    expect(json).toHaveBeenCalledTimes(1);
    expect(status).toHaveBeenCalledTimes(1);
    expect(status).toHaveBeenCalledWith(201);
    expect(json).toHaveBeenCalledWith({
      createdAt: expect.any(Date),
      email,
      emailVerified: null,
      id: expect.any(Number),
      image: null,
      name: null,
      password: expect.any(String),
      updatedAt: expect.any(Date)
    });

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });

    expect(user).toBeDefined();
    expect(user.email).toEqual(email);
    expect(user.password).not.toBeNull();
    expect(user.password).not.toEqual(password);
    expect(user.password).toBeDefined();
  });

  it('Create multiple users', async () => {
    const numUsers = Math.ceil(Math.random() * 10);
    const usersData = mockManyUserData(numUsers);

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
    expect(json).toHaveBeenCalledTimes(numUsers);

    users.forEach((user: UserDataProp) => {
      expect(user).toBeDefined();
      expect(json.mock.calls).toEqual(
        expect.arrayContaining([
          expect.arrayContaining([
            expect.objectContaining({
              createdAt: expect.any(Date),
              email: user.email,
              emailVerified: null,
              id: expect.any(Number),
              image: null,
              name: null,
              password: expect.any(String),
              updatedAt: expect.any(Date)
            })
          ])
        ])
      );
    });
    expect(status).toHaveBeenNthCalledWith(numUsers, 201);
    expect(users.length).toEqual(numUsers);
  });
});

describe('Failed to create user', () => {
  it('Email is null', async () => {
    const { password } = mockUserData();
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

    expect(json).toHaveBeenCalledTimes(1);
    expect(status).toHaveBeenCalledTimes(1);
    expect(status).toHaveBeenCalledWith(409);

    const user = await prisma.user.findMany();

    expect(user.length).toBe(0);
  });

  it('Email is undefined', async () => {
    const { password } = mockUserData();
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

    expect(json).toHaveBeenCalledTimes(1);
    expect(status).toHaveBeenCalledTimes(1);
    expect(status).toHaveBeenCalledWith(409);

    const user = await prisma.user.findMany();

    expect(user.length).toBe(0);
  });

  it('Password is null', async () => {
    const { email } = mockUserData();
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

    expect(json).toHaveBeenCalledTimes(1);
    expect(status).toHaveBeenCalledTimes(1);
    expect(status).toHaveBeenCalledWith(409);

    const user = await prisma.user.findMany();

    expect(user.length).toBe(0);
  });

  it('Password is undefined', async () => {
    const { email } = mockUserData();
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

    expect(json).toHaveBeenCalledTimes(1);
    expect(status).toHaveBeenCalledTimes(1);
    expect(status).toHaveBeenCalledWith(409);

    const user = await prisma.user.findMany();

    expect(user.length).toBe(0);
  });
});
