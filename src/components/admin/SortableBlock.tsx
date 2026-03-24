"use client";

import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { ProjectBlock } from "@/lib/types";
import { uploadFile } from "@/lib/upload";
import RichTextEditor from "./RichTextEditor";

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
  caption: "Caption",
  role: "Role / Credits",
  testimonial: "Testimonial",
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
    case "subtitle":
    case "description":
    case "text":
      return (
        <RichTextEditor
          content={block.content || ""}
          onChange={(html) => onUpdate({ content: html })}
          placeholder={`Write ${block.type} here...`}
          variant={block.type}
        />
      );

    case "image-full":
      return <ImageFullEditor block={block} onUpdate={onUpdate} />;

    case "image-grid":
      return <ImageGridEditor block={block} onUpdate={onUpdate} />;

    case "video":
      return <VideoEditor block={block} onUpdate={onUpdate} />;

    case "gif":
      return (
        <MediaUploader
          block={block}
          onUpdate={onUpdate}
          accept="image/gif,image/*"
          label="GIF"
        />
      );

    case "caption":
      return (
        <input
          type="text"
          value={block.content || ""}
          onChange={(e) => onUpdate({ content: e.target.value })}
          placeholder="Caption text..."
          className="w-full text-xs text-gray-400 italic outline-none bg-transparent"
        />
      );

    case "role":
      return <RoleEditor block={block} onUpdate={onUpdate} />;

    case "testimonial":
      return <TestimonialEditor block={block} onUpdate={onUpdate} />;

    default:
      return <p className="text-gray-400 text-sm">Unknown block type</p>;
  }
}

function RoleEditor({
  block,
  onUpdate,
}: {
  block: ProjectBlock;
  onUpdate: (updates: Partial<ProjectBlock>) => void;
}) {
  const roles = block.roles || [];

  const updateRole = (index: number, field: "label" | "value", val: string) => {
    const updated = roles.map((r, i) =>
      i === index ? { ...r, [field]: val } : r
    );
    onUpdate({ roles: updated });
  };

  const addRole = () => {
    onUpdate({ roles: [...roles, { label: "", value: "" }] });
  };

  const removeRole = (index: number) => {
    onUpdate({ roles: roles.filter((_, i) => i !== index) });
  };

  return (
    <div>
      <p className="text-[10px] text-gray-400 mb-3 uppercase tracking-wider font-semibold">
        Credits &mdash; aligned right on the page
      </p>
      <div className="space-y-2">
        {roles.map((role, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="text"
              value={role.label}
              onChange={(e) => updateRole(i, "label", e.target.value)}
              placeholder="Role (e.g. Client)"
              className="w-1/3 border border-gray-200 px-3 py-2 text-sm focus:border-black outline-none bg-transparent font-medium text-gray-500"
            />
            <span className="text-gray-300">|</span>
            <input
              type="text"
              value={role.value}
              onChange={(e) => updateRole(i, "value", e.target.value)}
              placeholder="Name / Credit"
              className="flex-1 border border-gray-200 px-3 py-2 text-sm focus:border-black outline-none bg-transparent font-medium"
            />
            <button
              onClick={() => removeRole(i)}
              className="text-gray-300 hover:text-red-500 text-xs font-bold px-1"
            >
              x
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={addRole}
        className="mt-2 text-xs font-bold text-gray-400 hover:text-black uppercase tracking-wider"
      >
        + Add Credit
      </button>
    </div>
  );
}

function ImageFullEditor({
  block,
  onUpdate,
}: {
  block: ProjectBlock;
  onUpdate: (updates: Partial<ProjectBlock>) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const url = await uploadFile(file, setStatus);
      onUpdate({ src: url });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    }
    setUploading(false);
    setStatus("");
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
            {uploading ? status || "Uploading..." : "Upload Full Width Image"}
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
        </label>
      )}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
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
  const [error, setError] = useState("");

  const uploadImage = async (index: number, file: File) => {
    setError("");
    try {
      const url = await uploadFile(file);
      const newImages = [...images];
      newImages[index] = url;
      onUpdate({ images: newImages });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    }
  };

  const addSlot = () => onUpdate({ images: [...images, ""] });
  const removeSlot = (index: number) =>
    onUpdate({ images: images.filter((_, i) => i !== index) });

  const aspectClass: Record<string, string> = {
    "16:9": "aspect-video",
    "9:16": "aspect-[9/16]",
    "1:1": "aspect-square",
    "4:5": "aspect-[4/5]",
  };

  const currentAspect = block.gridAspectRatio || "1:1";

  return (
    <div>
      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-3">
        <div className="flex gap-2 items-center">
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
        <div className="flex gap-2 items-center">
          <label className="text-xs text-gray-400 font-semibold">Ratio:</label>
          {(["16:9", "9:16", "1:1", "4:5"] as const).map((r) => (
            <button
              key={r}
              onClick={() => onUpdate({ gridAspectRatio: r })}
              className={`text-xs font-bold px-2 py-1 ${
                currentAspect === r
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-400 hover:bg-gray-200"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: `repeat(${block.columns || 2}, 1fr)` }}
      >
        {images.map((img, i) => (
          <div key={i} className="relative group">
            {img ? (
              <div className={`${aspectClass[currentAspect]} bg-gray-100 relative overflow-hidden`}>
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
              <label className={`${aspectClass[currentAspect]} border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer hover:border-black transition-colors relative`}>
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

      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

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
  const [progress, setProgress] = useState("");
  const [error, setError] = useState("");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const url = await uploadFile(file, setProgress);
      onUpdate({ src: url });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    }
    setProgress("");
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
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
            <label className="cursor-pointer text-white text-xs font-bold uppercase tracking-wider">
              Replace
              <input
                type="file"
                accept="video/mp4,video/*"
                onChange={handleUpload}
                className="hidden"
              />
            </label>
            <button
              onClick={() => onUpdate({ src: "" })}
              className="text-white/70 text-xs font-bold uppercase tracking-wider hover:text-red-400"
            >
              Remove
            </button>
          </div>
          <p className="text-[10px] text-gray-400 mt-1 truncate">{block.src}</p>
        </div>
      ) : (
        <label className="block cursor-pointer border-2 border-dashed border-gray-200 py-8 text-center hover:border-black transition-colors">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
            {uploading ? progress : "Upload Video (.mp4)"}
          </span>
          <span className="text-[10px] text-gray-300 mt-1 block">
            Max 50MB &middot; H.264 recommended
          </span>
          <input
            type="file"
            accept="video/mp4,video/*"
            onChange={handleUpload}
            className="hidden"
            disabled={uploading}
          />
        </label>
      )}

      {error && (
        <p className="text-red-500 text-xs mt-2 bg-red-50 px-3 py-2">
          {error}
        </p>
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
  const [error, setError] = useState("");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const url = await uploadFile(file);
      onUpdate({ src: url });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
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
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

function TestimonialEditor({
  block,
  onUpdate,
}: {
  block: ProjectBlock;
  onUpdate: (updates: Partial<ProjectBlock>) => void;
}) {
  const t = block.testimonial || {
    quote: "",
    name: "",
    title: "",
    company: "",
    avatar: "",
    decorImage: "",
  };

  const update = (field: string, value: string) => {
    onUpdate({ testimonial: { ...t, [field]: value } });
  };

  const handleImageUpload = async (
    field: "avatar" | "decorImage",
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadFile(file);
      update(field, url);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Decor image (left side) */}
        <div>
          <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
            Decoration Image (left)
          </label>
          {t.decorImage ? (
            <div className="relative group aspect-[4/3] bg-gray-100 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={t.decorImage}
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <label className="cursor-pointer text-white text-xs font-bold uppercase tracking-wider">
                  Replace
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload("decorImage", e)}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          ) : (
            <label className="block cursor-pointer border-2 border-dashed border-gray-200 py-6 text-center hover:border-black transition-colors aspect-[4/3] flex items-center justify-center">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Upload Image
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload("decorImage", e)}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* Avatar */}
        <div>
          <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
            Avatar Photo
          </label>
          {t.avatar ? (
            <div className="relative group w-16 h-16 rounded-full overflow-hidden bg-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={t.avatar}
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <label className="cursor-pointer text-white text-[8px] font-bold uppercase">
                  Edit
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload("avatar", e)}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          ) : (
            <label className="w-16 h-16 rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer hover:border-black transition-colors">
              <span className="text-[8px] font-bold text-gray-400 uppercase">
                Photo
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload("avatar", e)}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>

      <div>
        <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
          Quote
        </label>
        <textarea
          value={t.quote}
          onChange={(e) => update("quote", e.target.value)}
          placeholder="Client testimonial quote..."
          rows={3}
          className="w-full border border-gray-200 px-3 py-2 text-sm focus:border-black outline-none resize-none italic"
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
            Name
          </label>
          <input
            type="text"
            value={t.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="John Doe"
            className="w-full border border-gray-200 px-3 py-2 text-sm focus:border-black outline-none"
          />
        </div>
        <div>
          <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
            Title
          </label>
          <input
            type="text"
            value={t.title}
            onChange={(e) => update("title", e.target.value)}
            placeholder="Creative Director"
            className="w-full border border-gray-200 px-3 py-2 text-sm focus:border-black outline-none"
          />
        </div>
        <div>
          <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
            Company
          </label>
          <input
            type="text"
            value={t.company}
            onChange={(e) => update("company", e.target.value)}
            placeholder="Company Name"
            className="w-full border border-gray-200 px-3 py-2 text-sm focus:border-black outline-none"
          />
        </div>
      </div>
    </div>
  );
}
