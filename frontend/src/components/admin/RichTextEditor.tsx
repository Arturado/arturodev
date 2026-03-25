"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapImage from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect, useRef } from "react";
import TextAlign from "@tiptap/extension-text-align";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const MenuBar = ({ editor }: { editor: any }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!editor) return null;

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) {
        editor.chain().focus().setImage({ src: data.url }).run();
      }
    } catch (err) {
      console.error("Error subiendo imagen:", err);
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const btn = (action: () => void, label: string, active?: boolean) => (
    <button
      type="button"
      onClick={action}
      className={`px-2 py-1 text-xs rounded transition-colors ${
        active ? "bg-violet-600 text-white" : "text-gray-400 hover:text-white hover:bg-gray-700"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-wrap gap-1 p-3 border-b border-gray-700">
      {btn(() => editor.chain().focus().toggleBold().run(), "B", editor.isActive("bold"))}
      {btn(() => editor.chain().focus().toggleItalic().run(), "I", editor.isActive("italic"))}
      {btn(() => editor.chain().focus().toggleStrike().run(), "S", editor.isActive("strike"))}
      <div className="w-px bg-gray-700 mx-1" />
      {btn(() => editor.chain().focus().toggleHeading({ level: 1 }).run(), "H1", editor.isActive("heading", { level: 1 }))}
      {btn(() => editor.chain().focus().toggleHeading({ level: 2 }).run(), "H2", editor.isActive("heading", { level: 2 }))}
      {btn(() => editor.chain().focus().toggleHeading({ level: 3 }).run(), "H3", editor.isActive("heading", { level: 3 }))}
      <div className="w-px bg-gray-700 mx-1" />
      {btn(() => editor.chain().focus().toggleBulletList().run(), "• Lista", editor.isActive("bulletList"))}
      {btn(() => editor.chain().focus().toggleOrderedList().run(), "1. Lista", editor.isActive("orderedList"))}
      <div className="w-px bg-gray-700 mx-1" />
      {btn(() => editor.chain().focus().toggleCodeBlock().run(), "</>", editor.isActive("codeBlock"))}
      {btn(() => editor.chain().focus().toggleBlockquote().run(), "❝", editor.isActive("blockquote"))}
      <div className="w-px bg-gray-700 mx-1" />
        {btn(() => editor.chain().focus().setTextAlign("left").run(), "⬅", editor.isActive({ textAlign: "left" }))}
        {btn(() => editor.chain().focus().setTextAlign("center").run(), "↔", editor.isActive({ textAlign: "center" }))}
        {btn(() => editor.chain().focus().setTextAlign("right").run(), "➡", editor.isActive({ textAlign: "right" }))}
      <div className="w-px bg-gray-700 mx-1" />
      {btn(() => editor.chain().focus().setHorizontalRule().run(), "—")}
      <div className="w-px bg-gray-700 mx-1" />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="px-2 py-1 text-xs rounded transition-colors text-gray-400 hover:text-white hover:bg-gray-700"
      >
        🖼 Imagen
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
      <div className="w-px bg-gray-700 mx-1" />
      {btn(() => editor.chain().focus().undo().run(), "↩")}
      {btn(() => editor.chain().focus().redo().run(), "↪")}
    </div>
  );
};

export default function RichTextEditor({ value, onChange }: Props) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
        }),
      TiptapImage.configure({
        HTMLAttributes: {
          class: "rounded-xl max-w-full my-4",
        },
      }),
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: "Escribí tu post acá..." }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-invert prose-violet max-w-none min-h-[300px] p-4 outline-none text-gray-300 focus:outline-none",
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden focus-within:border-violet-500 transition-colors">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}