import styles from "./TermsModal.module.scss";

type Props = {
  title: string;
  content: string;
  onClose: () => void;
};

export default function TermsModal({ title, content, onClose }: Props) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <h3>{title}</h3>
          <button onClick={onClose}>&times;</button>
        </div>

        <div className={styles.modalBody}>
          <pre>{content}</pre>
        </div>

        <div className={styles.modalFooter}>
          <button onClick={onClose}>확인</button>
        </div>
      </div>
    </div>
  );
}
