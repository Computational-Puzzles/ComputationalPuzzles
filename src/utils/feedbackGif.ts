const feedbackGifOptions = {
  CORRECT: 'correct',
  INCORRECT: 'incorrect'
};

const getRandomGifSrc = (feedbackGifs, success) => {
  const gifName = feedbackGifs[Math.floor(Math.random() * feedbackGifs.length)];
  const subDir = success
    ? feedbackGifOptions.CORRECT
    : feedbackGifOptions.INCORRECT;
  return `/feedbackGifs/${subDir}/${gifName}`;
};

export { getRandomGifSrc, feedbackGifOptions };
