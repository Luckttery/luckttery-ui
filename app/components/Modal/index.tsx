// app/components/Modal/Modal.tsx
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './styles.module.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modal = (
    <div className={styles.modalWrapper}>
      <div className={styles.modalOverlay} />
      <div ref={modalRef} className={styles.modalContent}>
        <div className={styles.modalHeader}>
          {title && <h2 className={styles.modalTitle}>{title}</h2>}
          <button onClick={onClose} className={styles.closeButton}>
            <svg
              className={styles.closeIcon}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
};