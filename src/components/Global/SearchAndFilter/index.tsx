import React, { useEffect, useState } from 'react';
import { Filter, Input } from '../index';
import styles from './SearchAndFilter.module.scss';
import type { SearchAndFilterProps } from '../../../types/searchAndFilter';

const SearchAndFilter = ({ setSearchNFilterVal }: SearchAndFilterProps) => {
  const [searchText, setSearchText] = useState('');
  const [filterFields, setFilterFields] = useState({
    easy: false,
    medium: false,
    hard: false
  });

  useEffect(() => {
    setSearchNFilterVal &&
      setSearchNFilterVal({
        searchText: searchText,
        filterFields: filterFields
      });
  }, [searchText, filterFields, setSearchNFilterVal]);

  return (
    <div className={styles.subHeader}>
      <div className={styles.leftContent}>
        <h1>Puzzle List</h1>
        <Input
          type={'text'}
          id={'search'}
          required={false}
          placeholder={'Search'}
          setInputVal={setSearchText}
        />
      </div>
      <div>
        <Filter setFilterFields={setFilterFields} />
      </div>
    </div>
  );
};

export default SearchAndFilter;
