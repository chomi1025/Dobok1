"use client";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import styles from "./page.module.scss";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

type EditorProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function EditorComponent({ value, onChange }: EditorProps) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"],
    ],
  };

  return (
    <div className={styles.reviewEditorContainer}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
      />
    </div>
  );
}
