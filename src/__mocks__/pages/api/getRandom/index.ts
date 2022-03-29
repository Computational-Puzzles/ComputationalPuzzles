import * as faker from 'faker';

export const getRandomString = (length) :string => {
  return faker.datatype.string(length);
};

export const getRandomNumber = ():number => {
  return faker.datatype.number();
};
