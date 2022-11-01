import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchSearchWord } from 'api';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Wrapper } from 'components/App/App.styled';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { Button } from 'components/Button/Button';

export class App extends Component {
  state = {
    searchWord: '',
    hits: [],
    page: 1,
    status: 'idle',
    modalImage: null,
  };

  async componentDidUpdate(_, prevState) {
    const prevSearchWord = prevState.searchWord;
    const nextSearchWord = this.state.searchWord;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevSearchWord !== nextSearchWord || prevPage !== nextPage) {
      this.setState({ status: 'pending' });

      try {
        const articles = await fetchSearchWord(nextSearchWord, nextPage);

        this.setState(prevState => ({
          hits: [...prevState.hits, ...articles.hits],
          status: 'resolved',
        }));

        if (articles.hits.length === 0) {
          toast.error(
            `Sorry, there are no images matching your search query. Please try again.`
          );
        }

        if (articles.hits.length > 0 && this.state.page === 1) {
          toast.success(`Hooray! We found ${articles.total} images.`);
        }
      } catch (error) {
        toast.error('Something went wrong. Please, reload the page.');
      } finally {
        this.setState({ status: 'resolved' });
      }
    }
  }

  handleFormSubmit = searchWord => {
    this.setState({
      searchWord,
      page: 1,
      hits: [],
    });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  openModal = imageUrl => {
    this.setState({ modalImage: imageUrl });
  };

  closeModal = e => {
    this.setState({ modalImage: null });
  };

  render() {
    const { status, hits, modalImage } = this.state;

    return (
      <Wrapper>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {hits.length > 0 && (
          <ImageGallery hits={hits} onClick={this.openModal} />
        )}
        {status === 'pending' && <Loader />}

        {hits.length > 0 && status === 'resolved' && (
          <Button onClick={this.loadMore}> Load more ... </Button>
        )}

        {modalImage && (
          <Modal largeImage={modalImage} onClose={this.closeModal} />
        )}

        <ToastContainer position="top-right" autoClose={3000} />
      </Wrapper>
    );
  }
}
