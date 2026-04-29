"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
      {isMounted && (
        <style>{`
          .review-editor-container .ql-toolbar.ql-snow {
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            background-color: #f9f9f9;
          }

          .review-editor-container .ql-editor h1,
          .review-editor-container .ql-editor h2 {
            font-family: "Pretendard Variable", Pretendard, sans-serif !important;
            font-weight: 700;
            color: #222;
            margin-bottom: 0.5rem;
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
            font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
          }

          .review-editor-container .ql-editor p {
            margin: 0;
            padding: 0;
          }
        `}</style>
      )}

      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
      />
    </div>
  );
}
