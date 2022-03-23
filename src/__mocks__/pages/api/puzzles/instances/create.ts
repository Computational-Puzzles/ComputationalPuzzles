import * as faker from 'faker';
import { DIFFICULTY } from '../../../../../types/global';

// TODO: Ensure this list matches DB's configuration
const DIFFICULTY_LIST = ['EASY', 'MEDIUM', 'HARD'];

export const mockName = (): string => {
  return faker.random.word() + faker.random.word() + faker.random.word();
};

export const mockContent = (): string => {
  return faker.lorem.paragraph();
};

export const mockDifficulty = (): DIFFICULTY => {
  return DIFFICULTY_LIST[
    Math.floor(Math.random() * DIFFICULTY_LIST.length)
  ] as DIFFICULTY;
};

export const mockQuestion = (): string => {
  return faker.lorem.sentence();
};

export const mockBoolean = (): boolean => {
  return Math.random() >= 0.5;
};

export const mockLongtitude = (): number => {
  return +faker.address.longitude();
};

export const mockLatitude = (): number => {
  return +faker.address.latitude();
};

export const mockAdress = (): string => {
  return faker.address.streetAddress();
};

export const mockHint = (): string => {
  return faker.lorem.sentence();
};