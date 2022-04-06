import * as faker from 'faker';
import { DIFFICULTY } from '../../../../../types/global';
import {getRandomNumberRange, getRandomString} from "../../../../getRandom";

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

export const mockOfficialAnswer = (): string => {
  return faker.datatype.string();
};

export const mockOptionsNoAns = (): string[] => {
  const str = getRandomString(getRandomNumberRange(1,4));
  return  Array.from(str);
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
