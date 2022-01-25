import { difficultySentenceCase } from '../../utils/difficulty';

it('difficulty in lowercase except for the first letter', () => {
  expect(difficultySentenceCase('EASY')).toBe('Easy');
  expect(difficultySentenceCase('MEDIUM')).toBe('Medium');
  expect(difficultySentenceCase('HARD')).toBe('Hard');
});
