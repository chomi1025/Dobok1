import Swal from "sweetalert2";
import styles from "./miniSwal.module.scss";

export const customConfirm = async ({
  title,
  text = "",
  confirmText = "확인",
  cancelText = "취소",
  isDanger = false,
}: {
  title: string;
  text?: string;
  confirmText?: string;
  cancelText?: string;
  isDanger?: boolean;
}) => {
  return await Swal.fire({
    title,
    text,
    width: "340px",
    showCancelButton: true,
    confirmButtonColor: isDanger ? "#c92a2a" : "#222",
    cancelButtonColor: "transparent",
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    reverseButtons: true,
    customClass: {
      popup: styles.miniSwalPopup,
      title: styles.miniSwalTitle,
      htmlContainer: styles.miniSwalText,
      actions: styles.miniSwalActions,
      confirmButton: styles.miniConfirmBtn,
      cancelButton: styles.miniCancelBtn,
    },
  });
};
