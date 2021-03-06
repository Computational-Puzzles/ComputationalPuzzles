import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const adminValidate = async (req: NextApiRequest, res: NextApiResponse) => {
  const userEmail = req.body.email as string;

  try {
    const user = await prisma.user.findUnique({
      where: { email: userEmail }
    });
    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }
    const account = await prisma.account.findMany({
      where: {
        userId: user.id,
        type: 'admin'
      }
    });
    if (account.length === 1) {
      res.status(200).json(user);
    } else if (account.length > 1) {
      res.status(500).json({
        message: 'Multiple admin accounts found'
      });
    } else {
      res.status(403).json(user);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export default adminValidate;
