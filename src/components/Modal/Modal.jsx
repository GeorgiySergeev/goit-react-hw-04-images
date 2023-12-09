import { createPortal } from 'react-dom';
import { useEffect } from 'react';

import { Overlay, MolalForm, Image } from './Modal.styled';

const modalRoot = document.getElementById('modal-root');

export function Modal({ closeModal, bigImage }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  const handleBackDropClick = e => {
    if (e.target.id === 'overlay') closeModal();
  };

  return createPortal(
    <Overlay id="overlay" onClick={handleBackDropClick}>
      <MolalForm>
        <Image src={bigImage} alt="" />
      </MolalForm>
    </Overlay>,
    modalRoot
  );
}
