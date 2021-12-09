import { Dispatch, SetStateAction } from 'react';

export type FilterProps = {
  setFilterFields?: Dispatch<SetStateAction<object>>;
};
