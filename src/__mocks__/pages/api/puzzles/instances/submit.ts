import * as faker from 'faker';

export const mockAnswer = (): string => {
  return faker.random.word();
};

export const mockRandomSeed = (): number => {
  return faker.datatype.number();
};
