import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { fetchSearchWord } from 'api';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Wrapper } from 'components/App/App.styled';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { Button } from 'components/Button/Button';

export function App() {
  const [searchWord, setSearchWord] = useState('');
  const [hits, setHits] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [largeImageModal, setLargeImageModal] = useState(null);

  useEffect(() => {
    if (!searchWord) {
      return;
    }

    const controller = new AbortController();

    async function changeFetchSearchWord() {
      setStatus('pending');

      try {
        const articles = await fetchSearchWord(searchWord, page, {
          signal: controller.signal,
        });

        setHits(prevState => [...prevState, ...articles.hits]);
        setStatus('resolved');

        if (articles.hits.length === 0) {
          toast.error(
            `Sorry, there are no images matching your search query. Please try again.`
          );
        }

        if (articles.hits.length > 0 && page === 1) {
          toast.success(`Hooray! We found ${articles.total} images.`);
        }
      } catch (error) {
        toast.error('Something went wrong. Please, reload the page.');
        setStatus('rejected');
      } finally {
        setStatus('resolved');
      }
    }

    changeFetchSearchWord();

    return () => {
      controller.abort();
    };
  }, [searchWord, page]);

  const handleFormSubmit = searchWord => {
    setSearchWord(searchWord);
    setPage(1);
    setHits([]);
  };

  const toggleModal = largeImageURL => {
    setShowModal(showModal => !showModal);
    setLargeImageModal(largeImageURL);
  };

  return (
    <Wrapper>
      <Searchbar onSubmit={handleFormSubmit} />
      {hits.length > 0 && <ImageGallery hits={hits} onClick={toggleModal} />}

      {status === 'pending' && <Loader />}

      {hits.length > 0 && hits.length >= 12 && status === 'resolved' && (
        <Button onClick={() => setPage(prevState => prevState + 1)}>
          Load more ...
        </Button>
      )}

      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageModal} alt="" />
        </Modal>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </Wrapper>
  );
}
