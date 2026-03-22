"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { useEffect } from "react";

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
  variant?: "title" | "subtitle" | "description" | "text";
}

const FONT_SIZES = [
  { label: "XS", value: "0.75rem" },
  { label: "SM", value: "0.875rem" },
  { label: "MD", value: "1rem" },
  { label: "LG", value: "1.25rem" },
  { label: "XL", value: "1.5rem" },
  { label: "2X", value: "2rem" },
  { label: "3X", value: "2.5rem" },
  { label: "4X", value: "3rem" },
];

function getEditorClass(variant: string): string {
  const base = "outline-none min-h-[60px] px-4 py-3";
  switch (variant) {
    case "title":
      return `${base} text-2xl font-black uppercase tracking-tight`;
    case "subtitle":
      return `${base} text-lg font-bold text-gray-600`;
    case "description":
      return `${base} text-base text-gray-600 leading-relaxed`;
    default:
      return `${base} text-sm text-gray-500 leading-relaxed`;
  }
}

export default function RichTextEditor({
  content,
  onChange,
  placeholder,
  variant = "text",
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      TextStyle,
      Color,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: content || "",
    editorProps: {
      attributes: {
        class: getEditorClass(variant),
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Sync external content changes
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || "");
    }
  }, [content, editor]);

  if (!editor) return null;

  return (
    <div className="border border-gray-200 rounded overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 bg-gray-50 border-b border-gray-200">
        {/* Text style buttons */}
        <ToolbarButton
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
          title="Bold"
        >
          <strong>B</strong>
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          title="Italic"
        >
          <em>I</em>
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          title="Underline"
        >
          <span className="underline">U</span>
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          title="Strikethrough"
        >
          <span className="line-through">S</span>
        </ToolbarButton>

        <Separator />

        {/* Headings */}
        <ToolbarButton
          active={editor.isActive("heading", { level: 1 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          title="Heading 1"
        >
          H1
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("heading", { level: 2 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          title="Heading 2"
        >
          H2
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("heading", { level: 3 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          title="Heading 3"
        >
          H3
        </ToolbarButton>

        <Separator />

        {/* Alignment */}
        <ToolbarButton
          active={editor.isActive({ textAlign: "left" })}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          title="Align Left"
        >
          <AlignLeftIcon />
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive({ textAlign: "center" })}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          title="Align Center"
        >
          <AlignCenterIcon />
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive({ textAlign: "right" })}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          title="Align Right"
        >
          <AlignRightIcon />
        </ToolbarButton>

        <Separator />

        {/* Lists */}
        <ToolbarButton
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          title="Bullet List"
        >
          <BulletListIcon />
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          title="Numbered List"
        >
          <OrderedListIcon />
        </ToolbarButton>

        <Separator />

        {/* Font size */}
        <div className="relative group">
          <button
            className="px-2 py-1 text-[10px] font-bold text-gray-500 hover:bg-gray-200 rounded uppercase tracking-wider"
            title="Font Size"
          >
            Size
          </button>
          <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 shadow-lg z-20 hidden group-hover:flex flex-col min-w-[80px]">
            {FONT_SIZES.map((size) => (
              <button
                key={size.value}
                onClick={() => {
                  editor
                    .chain()
                    .focus()
                    .setMark("textStyle", { fontSize: size.value })
                    .run();
                }}
                className="px-3 py-1.5 text-left text-xs hover:bg-gray-100 font-medium"
              >
                {size.label}
              </button>
            ))}
            <button
              onClick={() => {
                editor.chain().focus().unsetMark("textStyle").run();
              }}
              className="px-3 py-1.5 text-left text-xs hover:bg-gray-100 text-gray-400 border-t"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Text color */}
        <div className="flex items-center gap-1">
          <input
            type="color"
            onChange={(e) =>
              editor.chain().focus().setColor(e.target.value).run()
            }
            className="w-5 h-5 cursor-pointer border-0 p-0 bg-transparent"
            title="Text Color"
          />
          <button
            onClick={() => editor.chain().focus().unsetColor().run()}
            className="text-[10px] text-gray-400 hover:text-black"
            title="Reset Color"
          >
            x
          </button>
        </div>
      </div>

      {/* Editor */}
      <EditorContent
        editor={editor}
        className="prose prose-sm max-w-none"
        placeholder={placeholder}
      />

      <style jsx global>{`
        .ProseMirror {
          padding: 12px 16px;
          min-height: 80px;
          outline: none;
          font-size: 14px;
          line-height: 1.6;
          color: #374151;
        }
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #adb5bd;
          pointer-events: none;
          height: 0;
        }
        .ProseMirror h1 {
          font-size: 2rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.025em;
          margin: 0.5em 0;
        }
        .ProseMirror h2 {
          font-size: 1.5rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: -0.025em;
          margin: 0.5em 0;
        }
        .ProseMirror h3 {
          font-size: 1.25rem;
          font-weight: 700;
          margin: 0.5em 0;
        }
        .ProseMirror p {
          margin: 0.5em 0;
        }
        .ProseMirror ul,
        .ProseMirror ol {
          padding-left: 1.5em;
          margin: 0.5em 0;
        }
        .ProseMirror [style*="font-size"] {
          line-height: 1.3;
        }
      `}</style>
    </div>
  );
}

function ToolbarButton({
  active,
  onClick,
  children,
  title,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  title: string;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`w-7 h-7 flex items-center justify-center text-xs font-bold rounded transition-colors ${
        active
          ? "bg-black text-white"
          : "text-gray-500 hover:bg-gray-200 hover:text-black"
      }`}
    >
      {children}
    </button>
  );
}

function Separator() {
  return <div className="w-px h-5 bg-gray-200 mx-1" />;
}

// --- Icons ---
function AlignLeftIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
      <rect x="1" y="2" width="14" height="2" />
      <rect x="1" y="7" width="10" height="2" />
      <rect x="1" y="12" width="14" height="2" />
    </svg>
  );
}

function AlignCenterIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
      <rect x="1" y="2" width="14" height="2" />
      <rect x="3" y="7" width="10" height="2" />
      <rect x="1" y="12" width="14" height="2" />
    </svg>
  );
}

function AlignRightIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
      <rect x="1" y="2" width="14" height="2" />
      <rect x="5" y="7" width="10" height="2" />
      <rect x="1" y="12" width="14" height="2" />
    </svg>
  );
}

function BulletListIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
      <circle cx="2" cy="3" r="1.5" />
      <rect x="5" y="2" width="10" height="2" />
      <circle cx="2" cy="8" r="1.5" />
      <rect x="5" y="7" width="10" height="2" />
      <circle cx="2" cy="13" r="1.5" />
      <rect x="5" y="12" width="10" height="2" />
    </svg>
  );
}

function OrderedListIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
      <text x="0" y="5" fontSize="5" fontWeight="bold">1</text>
      <rect x="5" y="2" width="10" height="2" />
      <text x="0" y="10" fontSize="5" fontWeight="bold">2</text>
      <rect x="5" y="7" width="10" height="2" />
      <text x="0" y="15" fontSize="5" fontWeight="bold">3</text>
      <rect x="5" y="12" width="10" height="2" />
    </svg>
  );
}
