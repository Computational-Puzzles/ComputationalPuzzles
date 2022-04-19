import { getRandomGifSrc } from '../../utils/feedbackGif';
import { getRandomNumArray } from '../../__mocks__/getRandom';

describe('Returns a valid path from a provided array for ', () => {
  it('correct gif paths', () => {
    const arr = getRandomNumArray();
    const gifSrcCorrect = getRandomGifSrc(arr, true);
    expect(gifSrcCorrect.startsWith('/feedbackGifs/correct')).toBe(true);
  });
  it('incorrect gif paths', () => {
    const arr = getRandomNumArray();
    const gifSrcWrong = getRandomGifSrc(arr, false);
    expect(gifSrcWrong.startsWith('/feedbackGifs/incorrect')).toBe(true);
  });
});
