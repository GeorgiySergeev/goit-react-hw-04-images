import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';

export const ImageGallery = ({ gallery, openModal }) => {
  return (
    <>
      <Gallery>
        {gallery.map(({ webformatURL, largeImageURL }, index) => {
          return (
            <ImageGalleryItem
              key={index}
              openModal={openModal}
              image={webformatURL}
              largeImage={largeImageURL}
            />
          );
        })}
      </Gallery>
    </>
  );
};
