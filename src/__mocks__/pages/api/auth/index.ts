import { User } from '@prisma/client';
import * as faker from 'faker';
import { prisma } from '../../..';

export type UserDataProp = {
  email: string;
  password: string;
};

export const mockEmail = () => {
  return faker.internet.email();
};

export const mockPassword = () => {
  return faker.internet.password();
};

export const mockUserData = () => {
  return {
    email: mockEmail(),
    password: mockPassword()
  } as UserDataProp;
};

export const mockManyUserData = (numUsers: number) => {
  const users: UserDataProp[] = [];
  for (let i = 0; i < numUsers; i++) {
    users.push({
      email: faker.internet.email(),
      password: faker.internet.password()
    });
  }
  return users;
};

export const mockUser = (): Promise<User> => {
  const userData = mockUserData();
  return prisma.user.create({
    data: {
      email: userData.email,
      password: userData.password
    }
  });
};
