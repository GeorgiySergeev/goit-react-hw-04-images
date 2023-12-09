import React, { useState } from 'react';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { FiSearch } from 'react-icons/fi';

import {
  Searchbar,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

export function SearchBar({ onSubmit }) {
  const [localQuery, setlocalQuery] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (localQuery.trim() === '') {
      return toast('Please enter a valid search term');
    }
    onSubmit(localQuery);
    setlocalQuery('');
  };

  const handleChangeInput = e => {
    const newQuery = e.target.value;
    setlocalQuery(newQuery);
  };

  return (
    <Searchbar>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton>
          <FiSearch>Search</FiSearch>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          name="search"
          value={localQuery}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos..."
          onChange={handleChangeInput}
        />
      </SearchForm>
    </Searchbar>
  );
}
