import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { hashFunction } from '../../../utils/password';
import type { signUpData } from '../../../types/api/auth/sign-up';

const prisma = new PrismaClient();

export const signUp = async (data: signUpData) => {
  const { createUser, getUserByEmail } = PrismaAdapter(prisma);
  if (await getUserByEmail(data.email)) {
    return Promise.reject('User already exists');
  }
  return Promise.resolve(createUser(data));
};

const signUpHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  try {
    if (!password || !email)
      res.status(400).json({ error: 'Missing email or password' });
    else {
      const hashPassword = await hashFunction(password);
      const user = await signUp({ email, password: hashPassword });
      res.status(201).json(user);
    }
  } catch (err) {
    console.error(err);
    res.status(409).json(err);
  }
};

export default signUpHandler;
