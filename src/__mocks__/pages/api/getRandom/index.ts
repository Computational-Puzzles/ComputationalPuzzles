import * as faker from 'faker';

export const getRandomString = length => {
  return faker.datatype.string(length);
};

export const getRandomNumber = () => {
  return faker.datatype.number();
};
