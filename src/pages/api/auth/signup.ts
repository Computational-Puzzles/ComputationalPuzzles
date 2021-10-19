import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

type signUpData = {
  email: string;
  password: string;
};

const prisma = new PrismaClient();

const signUp = async (data: signUpData) => {
  const { createUser } = PrismaAdapter(prisma);
  return Promise.resolve(createUser(data));
};

const signUpHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  try {
    await signUp({ email, password });
    res.status(201);
  } catch (err) {
    console.error(err);
    res.status(409);
  }
};

export default signUpHandler;
