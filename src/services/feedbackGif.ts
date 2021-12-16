import * as fs from 'fs';
import * as path from 'path';
import { feedbackGifOptions } from '../utils/feedbackGif';

const feedbackGifPath = path.join(process.cwd(), 'public', 'feedbackGifs');

const initializeRandomGifSrc = () => {
  const correctGifs = fs.readdirSync(
    path.join(feedbackGifPath, feedbackGifOptions.CORRECT)
  );
  const incorrectGifs = fs.readdirSync(
    path.join(feedbackGifPath, feedbackGifOptions.INCORRECT)
  );

  return {
    correct: correctGifs,
    incorrect: incorrectGifs
  };
};

export { initializeRandomGifSrc };
