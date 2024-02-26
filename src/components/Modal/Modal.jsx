import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

const modalRoot = document.getElementById('modal-root');

export const Modal = ({ onClose, children }) => {
  useEffect(() => {
    const closeModalEsc = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', closeModalEsc);
    document.documentElement.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', closeModalEsc);
      document.documentElement.style.overflow = 'auto';
    };
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={styles.Overlay} onClick={handleBackdropClick}>
      <div className={styles.Modal}>{children}</div>
    </div>,
    modalRoot
  );
};