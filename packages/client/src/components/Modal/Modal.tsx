import styles from "./Modal.module.css";
import { PropsWithChildren } from "react";

interface ModalProps {
  title: string;
}

const Modal: React.FC<PropsWithChildren<ModalProps>> = ({ title, children }) => {
  return (
    <div className={styles.modal_wrap}>
      <div className={styles.modal_popup}>
        <h2 className={styles.modal_title}>{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default Modal;
