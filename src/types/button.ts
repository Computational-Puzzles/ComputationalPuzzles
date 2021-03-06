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
  action?: () => any;
  link?: string;
};

export type ButtonContentProps = {
  style: ButtonStyle;
  type?: ButtonType;
  size?: ButtonSize;
  content: string;
  arrowDirection?: ArrowDirectionType;
};

export type ButtonProps = ButtonContentProps &
  (
    | { onClick: () => void; link?: string }
    | { onClick?: () => void; link: string }
  );
