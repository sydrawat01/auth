import { FC } from 'react';
import ReactDOM from 'react-dom';

import classes from './Modal.module.css';

const Backdrop: FC<{ onClose: () => void }> = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay: FC = (props) => {
  return <div className={classes.modal}>{props.children}</div>;
};

const portalElement = document.getElementById('overlays')!;

const Modal: FC<{ onClose: () => void }> = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
