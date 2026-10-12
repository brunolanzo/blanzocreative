/**
 * Outlined pill used to label disciplines on project tiles ("3D", "Direction", "Post").
 */
export interface TagProps {
  children?: React.ReactNode;
  tone?: "default" | "accent" | "solid";
  size?: "sm" | "md";
}
export declare function Tag(props: TagProps): JSX.Element;
