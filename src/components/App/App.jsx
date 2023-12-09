import React, { Component } from 'react';
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

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    showModal: false,
    modalImg: null,
    totalHits: null,
    loadMore: true,
    notificationState: false,
  };

  async componentDidUpdate(_, prevState) {
    const shouldFetchData =
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page;

    if (shouldFetchData) {
      this.setState({ isLoading: true, loadMore: true });

      try {
        const response = await fatchHits(this.state.query, this.state.page);
        this.setState({ totalHits: response.totalHits });

        if (!this.state.notificationState) {
          imagesFound(response.totalHits);
          this.setState({ notificationState: true });
        }

        if (response.hits.length === 0) {
          noImageFound();
          this.setState({ images: [] });
        } else {
          if (prevState.query !== this.state.query) {
            this.setState({ images: response.hits });
          } else {
            this.setState(prev => ({
              images: [...prev.images, ...response.hits],
              loadMore: this.state.page < Math.ceil(response.totalHits / 12),
            }));
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  openModal = img => {
    this.setState({ showModal: true, modalImg: img });
  };

  closeModal = () => {
    if (this.state.modalImg) {
      this.setState({ showModal: false });
    }
  };

  handleQueryChange = newQuery => {
    this.setState({ query: newQuery, page: 1, notificationState: false });
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const {
      query,
      images,
      isLoading,
      showModal,
      modalImg,
      loadMore,
      totalHits,
    } = this.state;

    return (
      <Container>
        {isLoading && <LoadingSpinner />}
        <SearchBar onSubmit={this.handleQueryChange} />
        {query ? null : <HeadTitle>PIXABY IMAGE SEARCH</HeadTitle>}
        <ImageGallery
          openModal={this.openModal}
          gallery={images}
          total={totalHits}
        />

        {images.length !== 0 && loadMore && (
          <Button onLoadMore={this.onLoadMore}>Load More</Button>
        )}

        {showModal && (
          <Modal closeModal={this.closeModal} bigImage={modalImg} />
        )}
        <ToastContainer autoClose={2000} />
        <Footer></Footer>
      </Container>
    );
  }
}
