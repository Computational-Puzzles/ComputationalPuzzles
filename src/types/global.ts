export type HeaderProps = {
  profilePicture?: string;
};

export type LogoProps = {
  showMark: boolean;
  showType: boolean;
};

export type InputProps = {
  type: 'text' | 'password';
  id: string;
  required: boolean;
  placeholder?: string;
  maxLength?: number;
  labelText?: string;
};
