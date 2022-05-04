import type { User } from '@prisma/client';
import Axios from './axios';

export const getUserByEmail = async (data: {
  email: string;
}): Promise<User | undefined> => {
  if (!data.email) return;

  try {
    const res = await Axios.post(`api/user`, data);
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error(error);
    return;
  }
};
