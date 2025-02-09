import styles from "./Modal.module.css";

interface ModalProps {
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, children }) => {
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
