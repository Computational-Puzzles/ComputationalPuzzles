import * as faker from 'faker';

export type UserDataProp = {
  email: string;
  password: string;
};

export const userData: UserDataProp = {
  email: faker.internet.email(),
  password: faker.internet.password()
};

export const manyUserData = (numUsers: number) => {
  const arr: UserDataProp[] = [];
  for (let i = 0; i < numUsers; i++) {
    arr.push({
      email: faker.internet.email(),
      password: faker.internet.password()
    });
  }
  return arr;
};
