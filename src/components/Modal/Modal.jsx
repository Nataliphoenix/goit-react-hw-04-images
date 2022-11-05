import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { Overley, ModalImg } from 'components/Modal/Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');
export function Modal({ onClose, children }) {
  useEffect(() => {
    window.addEventListener('keydown', closeModal);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', closeModal);
      document.body.style.overflow = '';
    };
  });

  const closeModal = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const clickOverlay = e => {
    if (e.target.nodeName !== 'IMG') {
      onClose();
    }
  };

  return createPortal(
    <Overley onClick={clickOverlay}>
      <ModalImg>{children}</ModalImg>
    </Overley>,
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};
