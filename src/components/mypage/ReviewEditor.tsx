"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import HardBreak from "@tiptap/extension-hard-break";
import { useEffect } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function ReviewEditor({ value, onChange }: Props) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      HardBreak,
      Image.configure({
        inline: false,
        allowBase64: true,
      }),
    ],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "review-editor min-h-[200px] p-3 border border-gray-300 rounded-md outline-none",
      },
    },
  });

  // 마지막 줄 빈 블록 강제 + 포커스 가능하게
  // 수정 진입 시 content 초기화
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  return <EditorContent editor={editor} />;
}
