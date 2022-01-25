import { getRandomGifSrc } from '../../utils/feedbackGif';

const arr = [0, 1, 3];
let isCorrect = true;
describe('randomly generating the correct/incorrect gifs:', () => {
  it('from the correct-gif & its path', () => {
    expect([
      `/feedbackGifs/correct/0`,
      `/feedbackGifs/correct/1`,
      `/feedbackGifs/correct/3`
    ]).toContain(getRandomGifSrc(arr, isCorrect));
  });

  it('from the incorrect-gif path & its path', () => {
    isCorrect = false;
    expect([
      `/feedbackGifs/incorrect/0`,
      `/feedbackGifs/incorrect/1`,
      `/feedbackGifs/incorrect/3`
    ]).toContain(getRandomGifSrc(arr, isCorrect));
  });
});
