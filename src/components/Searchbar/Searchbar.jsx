import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  SearchForm,
  Wrapper,
  SearchFormButton,
  SearchFormInput,
  SearchFormButtonLabel,
} from 'components/Searchbar/Searchbar.styled';
import { toast } from 'react-toastify';

export function Searchbar({ onSubmit }) {
  const [searchWord, setSarchWord] = useState('');

  const handleSearchWord = e => {
    setSarchWord(e.currentTarget.value.toLowerCase());
  };

  const handleSearchSubmit = e => {
    e.preventDefault();
    if (searchWord.trim() === '') {
      toast.error('Please, enter your search word!');
      return;
    }
    onSubmit(searchWord);
    setSarchWord('');
  };

  return (
    <Wrapper>
      <SearchForm onSubmit={handleSearchSubmit}>
        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchWord}
          onChange={handleSearchWord}
        />

        <SearchFormButton type="submit">
          <SearchFormButtonLabel> Search</SearchFormButtonLabel>
        </SearchFormButton>
      </SearchForm>
    </Wrapper>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
