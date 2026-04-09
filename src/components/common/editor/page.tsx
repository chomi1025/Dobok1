"use client";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => (
    <div
      style={{ height: "300px", background: "#f9f9f9", borderRadius: "8px" }}
    >
      에디터 로딩 중
    </div>
  ),
});

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function EditorComponent({ value, onChange }: Props) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["image"],
      ["clean"],
    ],
  };

  return (
    <div className="review-editor-container">
      <style>{`

        .review-editor-container .ql-toolbar.ql-snow {
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
          background-color: #f9f9f9;
        }

        .review-editor-container .ql-container.ql-snow {
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;
          min-height: 300px;
          font-size: 15px;
        }

        .review-editor-container .ql-editor.ql-blank::before {
          font-style: normal;
          color: #aaa;
        }


        .review-editor-container .ql-editor {
          padding: 15px;
          line-height: 1.6;
        }
      `}</style>

      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
      />
    </div>
  );
}
