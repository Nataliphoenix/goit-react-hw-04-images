import PropTypes from 'prop-types';
import { Component } from 'react';
import {
  SearchForm,
  Wrapper,
  SearchFormButton,
  SearchFormInput,
  SearchFormButtonLabel,
} from 'components/Searchbar/Searchbar.styled';
import { toast } from 'react-toastify';

export class Searchbar extends Component {
  state = {
    searchWord: '',
  };

  handleSearchWord = e => {
    this.setState({
      searchWord: e.currentTarget.value.toLowerCase(),
    });
  };

  handleSearchSubmit = e => {
    e.preventDefault();
    if (this.state.searchWord.trim() === '') {
      toast.error('Please, enter your search word!');
      return;
    }
    this.props.onSubmit(this.state.searchWord);
    this.setState({ searchWord: '' });
  };

  render() {
    return (
      <Wrapper>
        <SearchForm onSubmit={this.handleSearchSubmit}>
          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchWord}
            onChange={this.handleSearchWord}
          />

          <SearchFormButton type="submit">
            <SearchFormButtonLabel> Search</SearchFormButtonLabel>
          </SearchFormButton>
        </SearchForm>
      </Wrapper>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
