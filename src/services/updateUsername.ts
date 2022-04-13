import { User } from '@prisma/client';
import Axios from './axios';

export const updateUsername = async (data: {
  email: string;
  username: string;
}): Promise<User | undefined> => {
  if (!data.email || !data.username) return;

  try {
    const res = await Axios.post(`api/user/update-username`, data);
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error(error);
    return;
  }
};
