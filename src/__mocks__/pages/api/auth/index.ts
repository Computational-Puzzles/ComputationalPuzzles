import * as faker from 'faker';

export type UserDataProp = {
  email: string;
  password: string;
};

export const mockEmail = () => {
  return faker.internet.password();
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
  const arr: UserDataProp[] = [];
  for (let i = 0; i < numUsers; i++) {
    arr.push({
      email: faker.internet.email(),
      password: faker.internet.password()
    });
  }
  return arr;
};
