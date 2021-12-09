import Axios from './axios';

export const getAllPuzzles = async () => {
  try {
    return (await Axios.post('/api/puzzles')).data;
  } catch (err) {
    return [];
  }
};
