import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const updateUsernameHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { email, username } = req.body as {
    email: string;
    username: string;
  };

  if (!email || !username) {
    return res.status(400).json({
      message: 'Please provide an email and username.'
    });
  }

  try {
    const duplicateUser = await prisma.user.findUnique({
      where: {
        name: username
      }
    });

    if (duplicateUser) {
      return res.status(400).json({
        message: 'Username already exists.'
      });
    }

    const user = await prisma.user.update({
      where: { email },
      data: {
        name: username
      }
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

export default updateUsernameHandler;
