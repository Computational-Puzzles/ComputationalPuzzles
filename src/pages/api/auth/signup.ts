import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { hashFunction } from '../../../utils/password';

export type signUpData = {
  email: string;
  password: string;
};

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
    const hashPassword = hashFunction(password);
    const user = await signUp({ email, password: hashPassword });
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(409).json(err);
  }
};

export default signUpHandler;
