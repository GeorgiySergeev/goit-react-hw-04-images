import React, { useEffect, useRef, useState } from 'react';
import { noImageFound, imagesFound } from 'helpers/notification';
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
  const [loadMore, setLoadMore] = useState(false);
  const [error, setError] = useState(null);

  const [totalHits, setTotalHits] = useState(0);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    } else {
      imagesFound(totalHits);
    }
  }, [totalHits]);

  const getImages = async (query, page) => {
    setLoading(true);
    try {
      const response = await fatchHits(query, page);

      if (response.hits.length === 0) {
        return noImageFound();
      }
      setTotalHits(response.totalHits);
      setLoadMore(page < Math.ceil(response.totalHits / 12));

      setImages(prevState =>
        page === 1 ? response.hits : [...prevState, ...response.hits]
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!query) {
      return;
    }

    if (query !== '') getImages(query, page);
  }, [query, page]);

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
      <ImageGallery openModal={openModal} gallery={images} />
      {images.length !== 0 && loadMore && (
        <Button onLoadMore={onLoadMore}>Load More</Button>
      )}
      {showModal && <Modal closeModal={closeModal} bigImage={modalImg} />}
      <ToastContainer autoClose={2000} />
      {error && <p>Sorry, something went wrong. Please try again.</p>}
      <Footer></Footer>
    </Container>
  );
}
