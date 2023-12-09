import { toast } from 'react-toastify';

export const imagesFound = num => {
  return toast(`We found ${num} images`);
};

export const noImageFound = () => {
  return toast('Upsss, no image find!');
};

export const endOfCollection = () => {
  return toast("We're sorry, but you've reached the end of search results.");
};
