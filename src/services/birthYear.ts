import Axios from './axios';
import { addBirthYearProp } from '../types/api/birthYear';

export const addBirthYear = async (data: addBirthYearProp) => {
  return Axios.post('api/birthYear/birthYear', data);
};
