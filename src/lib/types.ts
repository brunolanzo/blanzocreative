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
    | "role";
  content?: string;
  src?: string;
  images?: string[];
  columns?: 2 | 3 | 4;
  aspectRatio?: "horizontal" | "vertical" | "square";
  alt?: string;
  roles?: { label: string; value: string }[];
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
