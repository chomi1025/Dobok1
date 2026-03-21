import Swal from "sweetalert2";
import styles from "./miniSwal.module.scss";

export const confirmDelete = async (
  title: string,
  text: string = "복구할 수 없습니다.",
) => {
  return await Swal.fire({
    title,
    text,
    width: "320px",
    padding: "1.5rem",
    showCancelButton: true,
    confirmButtonColor: "#c92a2a",
    cancelButtonColor: "transparent",
    confirmButtonText: "삭제",
    cancelButtonText: "취소",
    reverseButtons: true,
    customClass: {
      popup: styles.miniSwalPopup,
      title: styles.miniSwalTitle,
      htmlContainer: styles.miniSwalText,
    },
  });
};
