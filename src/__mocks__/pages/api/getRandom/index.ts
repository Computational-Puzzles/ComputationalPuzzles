import * as faker from 'faker';

export const getRandomString = (length): string => {
  return faker.datatype.string(length);
};

export const getRandomNumber = (): number => {
  return faker.datatype.number(options?: number | {
    max: number,
    min: number,
    precision: number
  }): number;
};
