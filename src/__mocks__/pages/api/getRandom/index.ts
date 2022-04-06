import * as faker from 'faker';

export const getRandomString = (length?:number): string => {
  if(typeof length === 'undefined')
      return faker.datatype.string();
  else
    return faker.datatype.string(length);
};

export const getRandomNumberMin = (min:number ):number => {
    return faker.datatype.number({min: min});
};

export const getRandomNumberRange = (min:number, max:number ):number => {
    return faker.datatype.number({min: min, max: max});
};
