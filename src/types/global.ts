import { Dispatch, SetStateAction } from 'react';

export type HeaderProps = {
  profilePicture?: string;
};

export type LogoProps = {
  showMark: boolean;
  showType: boolean;
  link?: boolean
};

export type InputProps = {
  type: 'text' | 'password' | 'email';
  id: string;
  required: boolean;
  placeholder?: string;
  maxLength?: number;
  minLength?: number;
  labelText?: string;
  labelHeader?: string;
  setInputVal?: Dispatch<SetStateAction<string>>;
};