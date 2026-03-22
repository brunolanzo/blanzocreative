"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { ProjectBlock } from "@/lib/types";
import SortableBlock from "./SortableBlock";

const BLOCK_TYPES: { type: ProjectBlock["type"]; label: string }[] = [
  { type: "title", label: "Title" },
  { type: "subtitle", label: "Subtitle" },
  { type: "description", label: "Description" },
  { type: "text", label: "Text" },
  { type: "image-full", label: "Full Image" },
  { type: "image-grid", label: "Image Grid" },
  { type: "video", label: "Video" },
  { type: "gif", label: "GIF" },
  { type: "role", label: "Role / Credits" },
  { type: "testimonial", label: "Testimonial" },
];

interface BlockEditorProps {
  blocks: ProjectBlock[];
  onChange: (blocks: ProjectBlock[]) => void;
}

export default function BlockEditor({ blocks, onChange }: BlockEditorProps) {
  const [showAddMenu, setShowAddMenu] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = blocks.findIndex((b) => b.id === active.id);
      const newIndex = blocks.findIndex((b) => b.id === over.id);
      onChange(arrayMove(blocks, oldIndex, newIndex));
    }
  };

  const addBlock = (type: ProjectBlock["type"]) => {
    const id = `block-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const newBlock: ProjectBlock = { id, type };

    switch (type) {
      case "title":
      case "subtitle":
      case "description":
      case "text":
        newBlock.content = "";
        break;
      case "image-full":
        newBlock.src = "";
        newBlock.alt = "";
        break;
      case "image-grid":
        newBlock.images = ["", ""];
        newBlock.columns = 2;
        break;
      case "video":
        newBlock.src = "";
        newBlock.aspectRatio = "horizontal";
        break;
      case "gif":
        newBlock.src = "";
        break;
      case "role":
        newBlock.roles = [
          { label: "Client", value: "" },
          { label: "Production", value: "" },
        ];
        break;
      case "testimonial":
        newBlock.testimonial = {
          quote: "",
          name: "",
          title: "",
          company: "",
          avatar: "",
          decorImage: "",
        };
        break;
    }

    onChange([...blocks, newBlock]);
    setShowAddMenu(false);
  };

  const updateBlock = (id: string, updates: Partial<ProjectBlock>) => {
    onChange(
      blocks.map((b) => (b.id === id ? { ...b, ...updates } : b))
    );
  };

  const deleteBlock = (id: string) => {
    onChange(blocks.filter((b) => b.id !== id));
  };

  const duplicateBlock = (id: string) => {
    const block = blocks.find((b) => b.id === id);
    if (!block) return;
    const newId = `block-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const idx = blocks.findIndex((b) => b.id === id);
    const newBlocks = [...blocks];
    newBlocks.splice(idx + 1, 0, { ...block, id: newId });
    onChange(newBlocks);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">
          Content Blocks
        </h2>
        <span className="text-xs text-gray-300">
          {blocks.length} block{blocks.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Blocks */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={blocks.map((b) => b.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            {blocks.map((block) => (
              <SortableBlock
                key={block.id}
                block={block}
                onUpdate={(updates) => updateBlock(block.id, updates)}
                onDelete={() => deleteBlock(block.id)}
                onDuplicate={() => duplicateBlock(block.id)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {/* Add Block */}
      <div className="mt-4 relative">
        <button
          onClick={() => setShowAddMenu(!showAddMenu)}
          className="w-full border-2 border-dashed border-gray-300 py-4 text-sm font-bold text-gray-400 uppercase tracking-widest hover:border-black hover:text-black transition-colors"
        >
          + Add Block
        </button>

        {showAddMenu && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 shadow-lg z-10 grid grid-cols-2 md:grid-cols-4 gap-0">
            {BLOCK_TYPES.map((bt) => (
              <button
                key={bt.type}
                onClick={() => addBlock(bt.type)}
                className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-500 hover:bg-black hover:text-white transition-colors text-left border-b border-r border-gray-100"
              >
                {bt.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {blocks.length === 0 && (
        <p className="text-center text-gray-300 text-sm mt-8">
          Add blocks to build your project page
        </p>
      )}
    </div>
  );
}
