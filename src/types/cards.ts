export type DIFFICULTY = 'hard' | 'medium' | 'easy';
export type CARD_TYPE = 'list' | 'grid';
export type CardProps = {
  title: string;
  desc: string;
  diff: DIFFICULTY;
  type?: CARD_TYPE;
};
