"use client";

import Image from "next/image";
import { ProjectBlock } from "@/lib/types";
import FadeIn from "./FadeIn";
import VideoPlayer from "./VideoPlayer";

export default function ProjectBlocks({ blocks }: { blocks: ProjectBlock[] }) {
  return (
    <div className="space-y-12 md:space-y-16">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "title":
            return (
              <FadeIn key={index} className="px-6 md:px-10">
                <div className="max-w-[1400px] mx-auto">
                  {isHTML(block.content) ? (
                    <div
                      className="rich-text rich-text-title"
                      dangerouslySetInnerHTML={{ __html: block.content || "" }}
                    />
                  ) : (
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
                      {block.content}
                    </h2>
                  )}
                </div>
              </FadeIn>
            );

          case "subtitle":
            return (
              <FadeIn key={index} className="px-6 md:px-10">
                <div className="max-w-[1400px] mx-auto">
                  {isHTML(block.content) ? (
                    <div
                      className="rich-text rich-text-subtitle"
                      dangerouslySetInnerHTML={{ __html: block.content || "" }}
                    />
                  ) : (
                    <h3 className="text-xl md:text-2xl font-bold text-gray-600 uppercase tracking-tight">
                      {block.content}
                    </h3>
                  )}
                </div>
              </FadeIn>
            );

          case "description":
            return (
              <FadeIn key={index} className="px-6 md:px-10">
                <div className="max-w-[900px] mx-auto">
                  {isHTML(block.content) ? (
                    <div
                      className="rich-text rich-text-description"
                      dangerouslySetInnerHTML={{ __html: block.content || "" }}
                    />
                  ) : (
                    <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                      {block.content}
                    </p>
                  )}
                </div>
              </FadeIn>
            );

          case "text":
            return (
              <FadeIn key={index} className="px-6 md:px-10">
                <div className="max-w-[900px] mx-auto">
                  {isHTML(block.content) ? (
                    <div
                      className="rich-text rich-text-body"
                      dangerouslySetInnerHTML={{ __html: block.content || "" }}
                    />
                  ) : (
                    <p className="text-base text-gray-500 leading-relaxed">
                      {block.content}
                    </p>
                  )}
                </div>
              </FadeIn>
            );

          case "image-full":
            return (
              <FadeIn key={index}>
                <div className="w-full aspect-[16/9] bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                  {block.src ? (
                    <Image
                      src={block.src}
                      alt={block.alt || ""}
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-gray-300 text-sm uppercase tracking-widest">
                        Full Width Image
                      </span>
                    </div>
                  )}
                </div>
              </FadeIn>
            );

          case "image-grid":
            return (
              <FadeIn key={index} className="px-6 md:px-10">
                <div className="max-w-[1400px] mx-auto">
                  <div
                    className={`grid gap-4 md:gap-6 ${
                      block.columns === 3
                        ? "grid-cols-1 md:grid-cols-3"
                        : block.columns === 4
                        ? "grid-cols-2 md:grid-cols-4"
                        : "grid-cols-1 md:grid-cols-2"
                    }`}
                  >
                    {block.images?.map((img, imgIndex) => (
                      <div
                        key={imgIndex}
                        className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden"
                      >
                        {img ? (
                          <Image
                            src={img}
                            alt={`Grid image ${imgIndex + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-gray-300 text-xs uppercase tracking-widest">
                              Image {imgIndex + 1}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            );

          case "video":
            return (
              <FadeIn key={index} className="px-6 md:px-10">
                <div className="max-w-[1400px] mx-auto">
                  {block.src ? (
                    <VideoPlayer
                      src={block.src}
                      aspectRatio={block.aspectRatio || "horizontal"}
                    />
                  ) : (
                    <div
                      className={`bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center ${
                        block.aspectRatio === "vertical"
                          ? "aspect-[9/16] max-w-sm mx-auto"
                          : "aspect-video"
                      }`}
                    >
                      <span className="text-gray-300 text-sm uppercase tracking-widest">
                        Video Player
                      </span>
                    </div>
                  )}
                </div>
              </FadeIn>
            );

          case "gif":
            return (
              <FadeIn key={index} className="px-6 md:px-10">
                <div className="max-w-[1400px] mx-auto">
                  {block.src ? (
                    <div className="overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={block.src}
                        alt={block.alt || "Animation"}
                        className="w-full h-auto"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <span className="text-gray-300 text-sm uppercase tracking-widest">
                        GIF Loop
                      </span>
                    </div>
                  )}
                </div>
              </FadeIn>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}

function isHTML(str?: string): boolean {
  if (!str) return false;
  return /<[a-z][\s\S]*>/i.test(str);
}
