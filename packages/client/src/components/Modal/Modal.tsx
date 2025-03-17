import { PropsWithChildren } from "react";
import styled from 'styled-components'

interface ModalProps {
  title: string;
}

const Modal: React.FC<PropsWithChildren<ModalProps>> = ({ title, children }) => {
  return (
    <ModalWrapStyle>
      <ModalPopupStyle>
        <ModalTitleStyle>{title}</ModalTitleStyle>
        {children}
      </ModalPopupStyle>
    </ModalWrapStyle>
  );
};

const ModalWrapStyle = styled.div`
    width: 100%;
    height: 100%;
    background: var(--modal-bg);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9001;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ModalPopupStyle = styled.div`
    width: 340px;
    min-height: 257px;
    background: var(--box-bg);
    box-shadow: 0 0 6px var(--box-shadow);
    border-radius: 12px;
    padding: 40px 30px;
    position: relative;
`;

const ModalTitleStyle = styled.h2`
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 500;
    text-align: center;
    margin: 0 0 15px;
`;

export default Modal;
