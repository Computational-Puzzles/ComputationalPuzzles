import Axios from './axios';
import type { resetPasswordProps } from '../types/api/auth/reset-password';

/**
 * This will reset the password of the user
 */
export const resetPassword = (data: resetPasswordProps) => {
  return Axios.post('/reset-password', data);
};
