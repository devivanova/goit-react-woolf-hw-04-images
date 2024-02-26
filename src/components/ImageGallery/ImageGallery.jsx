import styles from './ImageGallery.module.css';
import { ImageGalleryItem } from './ImageGalleryItem';
export const ImageGallery = ({ images, onClick }) => (
  <ul className={styles.ImageGallery}>
    {images.map(({ id, webformatURL, tags, largeImageURL }) => (
      <ImageGalleryItem
        key={id}
        webformatURL={webformatURL}
        tags={tags}
        largeImageURL={largeImageURL}
        onClick={onClick}
      />
    ))}
  </ul>
);