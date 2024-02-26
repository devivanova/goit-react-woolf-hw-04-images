import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import { findImage } from '../services/api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Notification } from './Notification/Notification';

export const App = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [loader, setLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState('');
  const [tag, setTag] = useState('');
  const [showNoMessage, setShowNoMessage] = useState(false);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    if (query.trim() === '') return;
    setLoader(true);
    setShowBtn(false);
    findImage(query, page)
      .then(({ hits, totalHits }) => {
        if (hits.length === 0) {
          setShowNoMessage(true);
        } else {
          setImages(prevImages => [...prevImages, ...hits]);
          setShowBtn(page < Math.ceil(totalHits / 12));
          setShowNoMessage(false);
        }
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setLoader(false);
      });
  }, [query, page]);

  const handleOnButtonClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleFormData = ({ query }) => {
    setPage(1);
    setImages([]);
    setError('');
    setQuery(query);
  };

  const handleImageClick = (url = '', tag = '') => {
    setUrl(url);
    setTag(tag);
    setLoader(true);
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  const hideLoaderInModal = () => {
    setLoader(false);
  };

  return (
    <div className={styles.App}>
      {showModal && (
        <Modal onClose={toggleModal} onClick={handleImageClick}>
          {loader && <Loader />}
          <img src={url} alt={tag} onLoad={hideLoaderInModal} />
        </Modal>
      )}
      <Searchbar onSubmit={handleFormData} />
      {error && <Notification message="Something wrong :(" />}
      {Boolean(images.length) && (
        <ImageGallery images={images} onClick={handleImageClick} />
      )}
      {showNoMessage && <Notification message="No images found" />}
      {loader && !showModal && <Loader />}
      {!loader && showBtn && <Button onClick={handleOnButtonClick} />}
    </div>
  );
};