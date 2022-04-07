import { difficultySentenceCase } from '../../utils/difficulty';

describe('Difficulties are in lowercase except for the first letter.', () => {
  it('Properly sentence cases EASY difficulty.', () => {
    expect(difficultySentenceCase('EASY')).toBe('Easy');
  });
  it('Properly sentence cases MEDIUM difficulty.', () => {
    expect(difficultySentenceCase('MEDIUM')).toBe('Medium');
  });
  it('Properly sentence cases HARD difficulty.', () => {
    expect(difficultySentenceCase('HARD')).toBe('Hard');
  });
});
