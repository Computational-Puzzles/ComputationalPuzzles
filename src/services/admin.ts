import Axios from './axios';

export const isAdmin = async (data : { email: string}) => {
  if (!data.email) return false;
  try {
    const res = await Axios.post(`api/admin/validate`, data);
    if (res.status === 200) {
      return true;
    }
  } catch (error) {
    return false;
  }
};
