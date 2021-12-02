export type ButtonStyle = 'primary' | 'secondary' | 'outline' | 'flat';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonType = 'button' | 'submit' | 'reset';
export type ArrowDirectionType = 'right' | 'down';
export type ArrowType = {
  style: ButtonStyle;
  arrowDirection: ArrowDirectionType;
};
export type ButtonAction = {
  text: string;
  style: ButtonStyle;
  action: () => any;
};

export type ButtonProps = {
  style: ButtonStyle;
  type?: ButtonType;
  size?: ButtonSize;
  content: string;
  arrowDirection?: ArrowDirectionType;
  onClick: () => void;
};