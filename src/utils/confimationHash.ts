import { prisma, User } from '@prisma/client';
import { hashFunction, checkHash } from '.';
import { getUserByEmail } from '../services/getUserByEmail';

const getStringToHash = (user: User) =>
  `${user.id}${user.email}${user.updatedAt}${user.createdAt}`;

export const getConfirmationHash = async (userEmail: string) => {
  const user: User = await getUserByEmail({ email: userEmail });

  if (!user) {
    console.error('User not found');
    return;
  }

  const stringToHash = getStringToHash(user);

  return hashFunction(stringToHash);
};

export const decodeConfirmationHash = async (
  userEmail: string,
  hash: string
) => {
  const user: User = await getUserByEmail({ email: userEmail });

  if (!user) {
    console.error('User not found');
    return;
  }

  const stringToHash = getStringToHash(user);

  const isConfirmed = checkHash(stringToHash, hash);

  if (isConfirmed) {
    // TODO: update database
  }

  return isConfirmed;
};
