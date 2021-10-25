import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

import checkPassword from '../../../utils/checkPassword';

type resetPasswordProps = {
  email: string;
  oldPassword: string;
  newPassword: string;
};

const prisma = new PrismaClient();

const resetPasswordHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { email, oldPassword, newPassword } = req.body as resetPasswordProps;

  if (!email || !oldPassword || !newPassword) {
    res.status(400).json({
      message: 'Email, password and new password are required'
    });
    return;
  }

  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });

  if (!user) {
    res.status(400).json({
      message: 'User not found'
    });
    return;
  }

  if (!user.password) {
    res.status(400).json({
      message: 'User has no password'
    });
    return;
  }

  if (!checkPassword(oldPassword, user.password)) {
    res.status(400).json({
      message: 'Old password is incorrect'
    });
    return;
  }

  await prisma.user.update({
    where: {
      id: user.id
    },
    data: {
      password: newPassword
    }
  });

  res.status(200).json({
    message: 'Password changed'
  });
};

export default resetPasswordHandler;
