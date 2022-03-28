import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const usersHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const userEmail = req.body.email as string;
  try {
    const user = await prisma.user.findUnique({
      where: { email: userEmail }
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

export default usersHandler;
