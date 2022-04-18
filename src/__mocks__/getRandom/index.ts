import * as faker from 'faker';

export const getRandomString = (length?: number): string => {
  if (typeof length === 'undefined') return faker.datatype.string();
  else return faker.datatype.string(length);
};

export const getRandomNumberMin = (min: number): number => {
  return faker.datatype.number({ min: min });
};

export const getRandomNumberRange = (min: number, max: number): number => {
  return faker.datatype.number({ min: min, max: max });
};

export const getRandomNumber = (): number => {
  return faker.datatype.number();
};

export const getRandomNumArray = (length = 10) => {
  let arr = [];
  for (let i = 0; i < length; i++) {
    arr[i] = getRandomNumber();
  }
  return arr;
};
