import { GalleryItem, ImageGalleryItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ openModal, image, largeImage }) => {
  return (
    <GalleryItem
      onClick={e => {
        openModal(largeImage);
      }}
    >
      <ImageGalleryItemImage src={image} alt="" />
    </GalleryItem>
  );
};
