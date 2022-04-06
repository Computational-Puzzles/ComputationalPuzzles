import { difficultySentenceCase } from '../../utils/difficulty';

describe('Difficulties are in lowercase except for the first letter.', ()=>{
  it('Difficulty = EASY correct ', () => {
    expect(difficultySentenceCase('EASY')).toBe('Easy');
  });
  it('Difficulty = MEDIUM correct ', () => {
    expect(difficultySentenceCase('MEDIUM')).toBe('Medium');
  });
  it('Difficulty = HARD correct ', () => {
    expect(difficultySentenceCase('HARD')).toBe('Hard');
  });
});

