import { Dispatch, ReactElement, SetStateAction } from 'react';

export type SearchAndFilterProps = {
  title: string;
  searchElement?: ReactElement;
  setSearchNFilterVal?: Dispatch<
    SetStateAction<{
      searchText: string;
      filterFields: {
        EASY: boolean;
        MEDIUM: boolean;
        HARD: boolean;
      };
    }>
  >;
};
