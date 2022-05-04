import Axios from './axios';
import { handleServiceError } from '../utils/error';

export const getAllSubmissions = async () => {
  try {
    const res = await Axios.get(`api/submissions`);
    if (res.status === 200) {
      console.log('api', res);
      return res.data;
    }
  } catch (error) {
    return handleServiceError(
      error.response.status,
      error.response.data.message
    );
  }
};
