"use client";

import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { ProjectBlock } from "@/lib/types";

interface SortableBlockProps {
  block: ProjectBlock;
  onUpdate: (updates: Partial<ProjectBlock>) => void;
  onDelete: () => void;
  onDuplicate: () => void;
}

const TYPE_LABELS: Record<string, string> = {
  title: "Title",
  subtitle: "Subtitle",
  description: "Description",
  text: "Text",
  "image-full": "Full Image",
  "image-grid": "Image Grid",
  video: "Video",
  gif: "GIF",
};

export default function SortableBlock({
  block,
  onUpdate,
  onDelete,
  onDuplicate,
}: SortableBlockProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white border border-gray-200 overflow-hidden"
    >
      {/* Block Header */}
      <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border-b border-gray-100">
        {/* Drag Handle */}
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-1 text-gray-300 hover:text-gray-500"
          title="Drag to reorder"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
            <circle cx="4" cy="3" r="1.5" />
            <circle cx="12" cy="3" r="1.5" />
            <circle cx="4" cy="8" r="1.5" />
            <circle cx="12" cy="8" r="1.5" />
            <circle cx="4" cy="13" r="1.5" />
            <circle cx="12" cy="13" r="1.5" />
          </svg>
        </button>

        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex-1">
          {TYPE_LABELS[block.type] || block.type}
        </span>

        <button
          onClick={onDuplicate}
          className="text-[10px] font-semibold text-gray-300 hover:text-gray-600 uppercase tracking-wider"
          title="Duplicate"
        >
          Dup
        </button>
        <button
          onClick={onDelete}
          className="text-[10px] font-semibold text-gray-300 hover:text-red-500 uppercase tracking-wider ml-1"
          title="Delete"
        >
          Del
        </button>
      </div>

      {/* Block Content */}
      <div className="p-4">
        <BlockContent block={block} onUpdate={onUpdate} />
      </div>
    </div>
  );
}

function BlockContent({
  block,
  onUpdate,
}: {
  block: ProjectBlock;
  onUpdate: (updates: Partial<ProjectBlock>) => void;
}) {
  switch (block.type) {
    case "title":
      return (
        <input
          type="text"
          value={block.content || ""}
          onChange={(e) => onUpdate({ content: e.target.value })}
          placeholder="Project title..."
          className="w-full text-2xl font-black uppercase tracking-tight outline-none bg-transparent"
        />
      );

    case "subtitle":
      return (
        <input
          type="text"
          value={block.content || ""}
          onChange={(e) => onUpdate({ content: e.target.value })}
          placeholder="Subtitle..."
          className="w-full text-lg font-bold text-gray-600 outline-none bg-transparent"
        />
      );

    case "description":
      return (
        <textarea
          value={block.content || ""}
          onChange={(e) => onUpdate({ content: e.target.value })}
          placeholder="Description text..."
          rows={4}
          className="w-full text-base text-gray-600 leading-relaxed outline-none bg-transparent resize-none"
        />
      );

    case "text":
      return (
        <textarea
          value={block.content || ""}
          onChange={(e) => onUpdate({ content: e.target.value })}
          placeholder="Body text..."
          rows={3}
          className="w-full text-sm text-gray-500 leading-relaxed outline-none bg-transparent resize-none"
        />
      );

    case "image-full":
      return <ImageFullEditor block={block} onUpdate={onUpdate} />;

    case "image-grid":
      return <ImageGridEditor block={block} onUpdate={onUpdate} />;

    case "video":
      return <VideoEditor block={block} onUpdate={onUpdate} />;

    case "gif":
      return <MediaUploader block={block} onUpdate={onUpdate} accept="image/gif" label="GIF" />;

    default:
      return <p className="text-gray-400 text-sm">Unknown block type</p>;
  }
}

function ImageFullEditor({
  block,
  onUpdate,
}: {
  block: ProjectBlock;
  onUpdate: (updates: Partial<ProjectBlock>) => void;
}) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    if (res.ok) {
      const { url } = await res.json();
      onUpdate({ src: url });
    }
    setUploading(false);
  };

  return (
    <div>
      {block.src ? (
        <div className="relative group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={block.src}
            alt={block.alt || ""}
            className="w-full h-40 object-cover"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <label className="cursor-pointer text-white text-xs font-bold uppercase tracking-wider">
              Replace
              <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>
      ) : (
        <label className="block cursor-pointer border-2 border-dashed border-gray-200 py-8 text-center hover:border-black transition-colors">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            {uploading ? "Uploading..." : "Upload Full Width Image"}
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
        </label>
      )}
      <input
        type="text"
        value={block.alt || ""}
        onChange={(e) => onUpdate({ alt: e.target.value })}
        placeholder="Alt text..."
        className="w-full mt-2 text-xs text-gray-400 outline-none bg-transparent border-b border-gray-100 pb-1"
      />
    </div>
  );
}

function ImageGridEditor({
  block,
  onUpdate,
}: {
  block: ProjectBlock;
  onUpdate: (updates: Partial<ProjectBlock>) => void;
}) {
  const images = block.images || [];

  const uploadImage = async (
    index: number,
    file: File
  ) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    if (res.ok) {
      const { url } = await res.json();
      const newImages = [...images];
      newImages[index] = url;
      onUpdate({ images: newImages });
    }
  };

  const addSlot = () => onUpdate({ images: [...images, ""] });
  const removeSlot = (index: number) =>
    onUpdate({ images: images.filter((_, i) => i !== index) });

  return (
    <div>
      <div className="flex gap-2 mb-3">
        <label className="text-xs text-gray-400 font-semibold">Columns:</label>
        {([2, 3, 4] as const).map((n) => (
          <button
            key={n}
            onClick={() => onUpdate({ columns: n })}
            className={`text-xs font-bold px-2 py-1 ${
              block.columns === n
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-400 hover:bg-gray-200"
            }`}
          >
            {n}
          </button>
        ))}
      </div>

      <div className={`grid gap-2 grid-cols-${block.columns || 2}`} style={{ gridTemplateColumns: `repeat(${block.columns || 2}, 1fr)` }}>
        {images.map((img, i) => (
          <div key={i} className="relative group">
            {img ? (
              <div className="aspect-square bg-gray-100 relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => removeSlot(i)}
                  className="absolute top-1 right-1 bg-red-500 text-white w-5 h-5 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  x
                </button>
              </div>
            ) : (
              <label className="aspect-square border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer hover:border-black transition-colors relative">
                <span className="text-[10px] text-gray-400 font-bold uppercase">
                  Upload
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) uploadImage(i, file);
                  }}
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    removeSlot(i);
                  }}
                  className="absolute top-1 right-1 text-gray-300 hover:text-red-500 text-xs"
                >
                  x
                </button>
              </label>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={addSlot}
        className="mt-2 text-xs font-bold text-gray-400 hover:text-black uppercase tracking-wider"
      >
        + Add Image
      </button>
    </div>
  );
}

function VideoEditor({
  block,
  onUpdate,
}: {
  block: ProjectBlock;
  onUpdate: (updates: Partial<ProjectBlock>) => void;
}) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    if (res.ok) {
      const { url } = await res.json();
      onUpdate({ src: url });
    }
    setUploading(false);
  };

  return (
    <div>
      <div className="flex gap-2 mb-3">
        <label className="text-xs text-gray-400 font-semibold">Aspect:</label>
        {(["horizontal", "vertical", "square"] as const).map((ar) => (
          <button
            key={ar}
            onClick={() => onUpdate({ aspectRatio: ar })}
            className={`text-xs font-bold px-2 py-1 capitalize ${
              block.aspectRatio === ar
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-400 hover:bg-gray-200"
            }`}
          >
            {ar}
          </button>
        ))}
      </div>

      {block.src ? (
        <div className="relative group">
          <video
            src={block.src}
            className="w-full h-32 object-cover"
            muted
            autoPlay
            loop
            playsInline
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <label className="cursor-pointer text-white text-xs font-bold uppercase tracking-wider">
              Replace
              <input
                type="file"
                accept="video/mp4"
                onChange={handleUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>
      ) : (
        <label className="block cursor-pointer border-2 border-dashed border-gray-200 py-8 text-center hover:border-black transition-colors">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            {uploading ? "Uploading..." : "Upload Video (.mp4)"}
          </span>
          <input
            type="file"
            accept="video/mp4"
            onChange={handleUpload}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
}

function MediaUploader({
  block,
  onUpdate,
  accept,
  label,
}: {
  block: ProjectBlock;
  onUpdate: (updates: Partial<ProjectBlock>) => void;
  accept: string;
  label: string;
}) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    if (res.ok) {
      const { url } = await res.json();
      onUpdate({ src: url });
    }
    setUploading(false);
  };

  return (
    <div>
      {block.src ? (
        <div className="relative group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={block.src}
            alt=""
            className="w-full h-32 object-cover"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <label className="cursor-pointer text-white text-xs font-bold uppercase tracking-wider">
              Replace
              <input
                type="file"
                accept={accept}
                onChange={handleUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>
      ) : (
        <label className="block cursor-pointer border-2 border-dashed border-gray-200 py-8 text-center hover:border-black transition-colors">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            {uploading ? "Uploading..." : `Upload ${label}`}
          </span>
          <input
            type="file"
            accept={accept}
            onChange={handleUpload}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
}
