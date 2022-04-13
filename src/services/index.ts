import { signUp } from './signup';
import { resetPassword } from './resetPassword';
import { getAllPuzzles } from './puzzle';
import {
  getAllPuzzleInstances,
  getPuzzleInstance,
  createPuzzleInstance,
  submitPuzzleInstance
} from './puzzleInstance';
import { isAdmin } from './admin';
import { getUserByEmail } from './getUserByEmail';
import { updateUsername } from './updateUsername';

export {
  signUp,
  resetPassword,
  getAllPuzzles,
  getAllPuzzleInstances,
  getPuzzleInstance,
  createPuzzleInstance,
  submitPuzzleInstance,
  isAdmin,
  getUserByEmail,
  updateUsername
};
