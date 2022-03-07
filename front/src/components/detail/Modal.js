import styled, { keyframes } from 'styled-components';

const Modal = ({ open, modalOpenHandle, children, kind }) => {
  return (
    <ModalWrapper open={open} onClick={() => modalOpenHandle(kind)}>
      {children}
    </ModalWrapper>
  );
};

const modalAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ModalWrapper = styled.div`
  display: ${({ open }) => (open ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);
  animation: ${modalAnimation} 300ms;
`;

export default Modal;
