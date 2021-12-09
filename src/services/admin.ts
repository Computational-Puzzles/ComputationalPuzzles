import Axios from './axios';

export const isAdmin = async (email: string) => {
  if (!email) return false;
  try {
    const res = await Axios.post(`api/admin/validate?email=${email}`);
    if (res.status === 200) {
      return true;           
    }
  } catch (error) {
    return false;
  }
};
