export interface ProjectBlock {
  id: string;
  type:
    | "title"
    | "subtitle"
    | "description"
    | "text"
    | "image-full"
    | "image-grid"
    | "video"
    | "gif"
    | "role"
    | "testimonial";
  content?: string;
  src?: string;
  images?: string[];
  columns?: 2 | 3 | 4;
  aspectRatio?: "horizontal" | "vertical" | "square";
  gridAspectRatio?: "16:9" | "9:16" | "1:1" | "4:5";
  alt?: string;
  roles?: { label: string; value: string }[];
  testimonial?: {
    quote: string;
    name: string;
    title: string;
    company: string;
    avatar: string;
    decorImage: string;
  };
}

export interface Project {
  id?: string;
  slug: string;
  title: string;
  category: string;
  thumbnail: string;
  year: string;
  published: boolean;
  blocks: ProjectBlock[];
  created_at?: string;
  updated_at?: string;
}
