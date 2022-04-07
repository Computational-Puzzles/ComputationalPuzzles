import { getRandomGifSrc } from '../../utils/feedbackGif';
import { getRandomNumArray } from '../../__mocks__/getRandom';

it('returns a path from a provided array. Either correct/incorrect gif paths', () => {
  const arr = getRandomNumArray();
  const gifSrcCorrect = getRandomGifSrc(arr, true);
  expect(gifSrcCorrect.startsWith('/feedbackGifs/correct')).toBe(true);

  const gifSrcWrong = getRandomGifSrc(arr, false);
  expect(gifSrcWrong.startsWith('/feedbackGifs/incorrect')).toBe(true);
});
