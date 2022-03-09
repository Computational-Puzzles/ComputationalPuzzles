import { getRandomGifSrc } from '../../utils/feedbackGif';

  //returns a path from a provided array
  it('returns a path from a provided array. Either correct/incorrect gif paths', () => {
    const arr = getRandomArray();
    const gifSrcCorrect = getRandomGifSrc(arr, true); 
    expect(gifSrcCorrect.startsWith('/feedbackGifs/correct')).toBe(true);

    const gifSrcWrong = getRandomGifSrc(arr, false);
    expect(gifSrcWrong.startsWith('/feedbackGifs/incorrect')).toBe(true);
  });

//random length 1-10, and random values
const getRandomArray = () =>{
  const len = Math.floor(Math.random()*10 + 1);
  let arr = [];
  for(let i=0; i< len; i++){
    arr[i] = Math.floor(Math.random()*10 );
  }
  return arr;
}
