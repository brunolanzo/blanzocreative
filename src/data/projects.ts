export interface ProjectBlock {
  type:
    | "title"
    | "subtitle"
    | "description"
    | "text"
    | "image-full"
    | "image-grid"
    | "video"
    | "gif";
  content?: string;
  src?: string;
  images?: string[];
  columns?: 2 | 3 | 4;
  aspectRatio?: "horizontal" | "vertical" | "square";
  alt?: string;
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  thumbnail: string;
  year: string;
  blocks: ProjectBlock[];
}

export const projects: Project[] = [
  {
    slug: "brand-identity-nova",
    title: "Nova Brand Identity",
    category: "Branding",
    thumbnail: "/projects/nova-thumb.jpg",
    year: "2024",
    blocks: [
      {
        type: "title",
        content: "Nova Brand Identity",
      },
      {
        type: "subtitle",
        content: "A complete visual system for a tech startup",
      },
      {
        type: "description",
        content:
          "Nova approached us to create a comprehensive brand identity that would position them as innovators in the AI space. We developed a bold visual language combining geometric precision with organic motion.",
      },
      {
        type: "image-full",
        src: "/projects/nova-hero.jpg",
        alt: "Nova Brand Identity Hero",
      },
      {
        type: "text",
        content:
          "The identity system includes a dynamic logo mark, custom typography pairings, a versatile color palette, and a library of motion assets designed for digital-first applications.",
      },
      {
        type: "image-grid",
        images: [
          "/projects/nova-grid-1.jpg",
          "/projects/nova-grid-2.jpg",
          "/projects/nova-grid-3.jpg",
          "/projects/nova-grid-4.jpg",
        ],
        columns: 2,
      },
      {
        type: "video",
        src: "/projects/nova-reel.mp4",
        aspectRatio: "horizontal",
      },
    ],
  },
  {
    slug: "motion-campaign-pulse",
    title: "Pulse Campaign",
    category: "Motion Design",
    thumbnail: "/projects/pulse-thumb.jpg",
    year: "2024",
    blocks: [
      {
        type: "title",
        content: "Pulse Campaign",
      },
      {
        type: "subtitle",
        content: "Motion-driven marketing for a fitness brand",
      },
      {
        type: "description",
        content:
          "A high-energy motion campaign designed to launch Pulse's new product line. Every frame was crafted to convey movement, energy, and transformation.",
      },
      {
        type: "image-full",
        src: "/projects/pulse-hero.jpg",
        alt: "Pulse Campaign Hero",
      },
      {
        type: "video",
        src: "/projects/pulse-spot.mp4",
        aspectRatio: "horizontal",
      },
      {
        type: "image-grid",
        images: [
          "/projects/pulse-grid-1.jpg",
          "/projects/pulse-grid-2.jpg",
          "/projects/pulse-grid-3.jpg",
        ],
        columns: 3,
      },
    ],
  },
  {
    slug: "visual-identity-echo",
    title: "Echo Visual System",
    category: "Visual Design",
    thumbnail: "/projects/echo-thumb.jpg",
    year: "2023",
    blocks: [
      {
        type: "title",
        content: "Echo Visual System",
      },
      {
        type: "subtitle",
        content: "Redefining a music platform's visual language",
      },
      {
        type: "description",
        content:
          "Echo needed a visual system that could flex across digital products, live events, and merchandise. We created a modular design framework rooted in sound-wave aesthetics.",
      },
      {
        type: "image-full",
        src: "/projects/echo-hero.jpg",
        alt: "Echo Visual System Hero",
      },
      {
        type: "text",
        content:
          "The system scales from app interfaces to stadium-sized projections, maintaining brand consistency at every touchpoint.",
      },
      {
        type: "image-grid",
        images: [
          "/projects/echo-grid-1.jpg",
          "/projects/echo-grid-2.jpg",
        ],
        columns: 2,
      },
    ],
  },
];
