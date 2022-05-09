import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { addBirthYearProp } from '../../../types/api/birthYear';

const prisma = new PrismaClient();
const birthYearHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  //check (1)birthYearPage: (a)too big: if birthYearPage > 2022 (b) too small: birthYearPage <= 1900 (2) check if user exist?
  const { birthYear, email } = req.body as addBirthYearProp;

  if (parseInt(birthYear) > new Date().getFullYear()) {
    res.status(400).json({
      message: 'Birth year cannot be greater than the current year'
    });
    return;
  }

  if (parseInt(birthYear) <= new Date().getFullYear() - 100) {
    res.status(400).json({
      message: 'Birth year too small. There might be a typo.'
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

  await prisma.user.update({
    where: {
      email
    },
    data: {
      birthYear: birthYear
    }
  });

  res.status(200).json({
    message: 'Birth year successfully added to user profile'
  });
};
export default birthYearHandler;
