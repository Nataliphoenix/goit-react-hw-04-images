import PropTypes from 'prop-types';
import {ImageGalleryContainer} from 'components/ImageGallery/ImageGallery.styled'
import {ImageGalleryItem} from 'components/ImageGalleryItem/ImageGalleryItem'

export const ImageGallery = ({ hits, onClick }) => {
    return (
        <ImageGalleryContainer>
        {hits.map(({ id, webformatURL, largeImageURL }) => (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            onImage={onClick}
          />
        ))}
      </ImageGalleryContainer>
    );
  };


  ImageGallery.propTypes = {
      hits: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          webformatURL: PropTypes.string,
          largeImageURL: PropTypes.string,
        }).isRequired,
      ),
      onClick: PropTypes.func.isRequired,
  }