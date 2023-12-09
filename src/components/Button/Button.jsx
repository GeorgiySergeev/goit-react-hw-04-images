import { ButtonLoadMore } from './Button.styled';

export const Button = ({ onLoadMore, children }) => {
  return <ButtonLoadMore onClick={onLoadMore}>{children}</ButtonLoadMore>;
};
