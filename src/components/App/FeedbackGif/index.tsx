import type { FeedbackGifProps } from '../../../types/feedbackGif';
import Image from 'next/image';
import styles from './FeedbackGif.module.scss';

const getGifEmbedClass = (success: boolean) => {
  return success ? styles.correct : styles.incorrect;
};

const FeedbackGif = ({ success, src }: FeedbackGifProps) => {
  return (
    <div className={`${styles.gifEmbed} ${getGifEmbedClass(success)}`}>
      <Image
        src={src}
        layout={'intrinsic'}
        height={'100%'}
        width={'100%'}
        objectFit={'fill'}
        alt={`${success ? 'correct answer' : 'incorrect answer'}`}
      />
    </div>
  );
};

export default FeedbackGif;
