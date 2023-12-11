import React, { useEffect, useState } from 'react';
import { noImageFound } from 'helpers/notification';
import { ToastContainer } from 'react-toastify';
import { LoadingSpinner } from 'components/Loader/Loader';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { SearchBar } from 'components/Searchbar/Searchbar';
import { Container } from './App.styled';
import { fatchHits } from '../../helpers/api-servise';
import { HeadTitle } from 'components/Title/Title';
import { Button } from 'components/Button/Button';
import { Footer } from 'components/Footer/Footer';
import { Modal } from 'components/Modal/Modal';

export function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState(null);
  const [totalHits, setTotalHits] = useState(0);
  const [loadMore, setLoadMore] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }
    const getImages = async (query, page) => {
      setLoading(true);
      try {
        const response = await fatchHits(query, page);

        if (response.hits.length === 0) {
          return noImageFound();
        }

        setTotalHits(response.totalHits);
        setImages(prevState =>
          page === 1 ? response.hits : [...prevState, ...response.hits]
        );
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
        setLoadMore(page === Math.ceil(totalHits / 12));
      }
    };

    if (query !== '') getImages(query, page);
  }, [query, page, totalHits]);

  const openModal = img => {
    setShowModal(true);
    setModalImg(img);
  };

  const closeModal = () => {
    if (modalImg) {
      setShowModal(false);
    }
  };

  const handleQueryChange = newQuery => {
    if (query !== newQuery) {
      setImages([]);
    }
    setQuery(newQuery);
    setPage(1);
  };

  const onLoadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <Container>
      {isLoading && <LoadingSpinner />}
      <SearchBar onSubmit={handleQueryChange} />
      {query ? null : <HeadTitle>PIXABY IMAGE SEARCH</HeadTitle>}
      <ImageGallery openModal={openModal} gallery={images} total={totalHits} />
      {images.length !== 0 && !loadMore && (
        <Button onLoadMore={onLoadMore}>Load More</Button>
      )}
      {showModal && <Modal closeModal={closeModal} bigImage={modalImg} />}
      <ToastContainer autoClose={2000} />
      {error && <p>Sorry, something went wrong. Please try again.</p>}
      <Footer></Footer>
    </Container>
  );
}
