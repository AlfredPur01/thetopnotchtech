"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { Bold, Italic, Heading2, List, ListOrdered, LinkIcon, ImageIcon, Undo, Redo } from "lucide-react";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
}

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Image,
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: "prose prose-slate max-w-none min-h-[240px] px-4 py-3 focus:outline-none",
      },
    },
  });

  if (!editor) return null;

  function toolbarButton(
    icon: React.ReactNode,
    isActive: boolean,
    onClick: () => void,
    label: string
  ) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={label}
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-md text-brand-muted transition-colors duration-200 hover:bg-brand-light hover:text-brand-blue",
          isActive && "bg-brand-blue text-white hover:bg-brand-blue hover:text-white"
        )}
      >
        {icon}
      </button>
    );
  }

  return (
    <div className="overflow-hidden rounded-md border border-gray-300">
      <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 bg-brand-light px-2 py-1">
        {toolbarButton(<Bold size={16} />, editor.isActive("bold"), () => editor.chain().focus().toggleBold().run(), "Bold")}
        {toolbarButton(<Italic size={16} />, editor.isActive("italic"), () => editor.chain().focus().toggleItalic().run(), "Italic")}
        {toolbarButton(<Heading2 size={16} />, editor.isActive("heading", { level: 2 }), () => editor.chain().focus().toggleHeading({ level: 2 }).run(), "Heading")}
        {toolbarButton(<List size={16} />, editor.isActive("bulletList"), () => editor.chain().focus().toggleBulletList().run(), "Bullet list")}
        {toolbarButton(<ListOrdered size={16} />, editor.isActive("orderedList"), () => editor.chain().focus().toggleOrderedList().run(), "Numbered list")}
        {toolbarButton(
          <LinkIcon size={16} />,
          editor.isActive("link"),
          () => {
            const url = window.prompt("Link URL");
            if (url) editor.chain().focus().setLink({ href: url }).run();
            else editor.chain().focus().unsetLink().run();
          },
          "Link"
        )}
        {toolbarButton(
          <ImageIcon size={16} />,
          false,
          () => {
            const url = window.prompt("Image URL");
            if (url) editor.chain().focus().setImage({ src: url }).run();
          },
          "Image"
        )}
        {toolbarButton(<Undo size={16} />, false, () => editor.chain().focus().undo().run(), "Undo")}
        {toolbarButton(<Redo size={16} />, false, () => editor.chain().focus().redo().run(), "Redo")}
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
