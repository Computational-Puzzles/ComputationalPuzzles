import React, { useEffect, useState } from 'react';
import { Filter, Input } from '../index';
import styles from './SearchAndFilter.module.scss';

type SearchAndFilterProps = {
  setSearchNFilterVal?: React.Dispatch<React.SetStateAction<object>>;
};

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
  }, [searchText, filterFields]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.input}>
          <Input
            type={'text'}
            id={'search'}
            required={false}
            labelText={'Puzzle List'}
            placeholder={'Search'}
            setInputVal={setSearchText}
          />
        </div>
        <div>
          <Filter setFilterFields={setFilterFields} />
        </div>
      </div>
    </>
  );
};

export default SearchAndFilter;
