import { Circles } from 'react-loader-spinner';
import { LoaderWrapper } from './Loader.styled';

export const LoadingSpinner = () => {
  return (
    <LoaderWrapper>
      <Circles />
    </LoaderWrapper>
  );
};
