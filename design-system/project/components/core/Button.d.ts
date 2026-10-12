/**
 * Pill button in the Blanzo house style: uppercase Aeonik label, wide tracking, no radius on cards but full pill here.
 */
export interface ButtonProps {
  children?: React.ReactNode;
  /** primary = white fill (hovers to red-pink); accent = red-pink fill; outline / ghost for secondary actions */
  variant?: "primary" | "accent" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  /** renders an <a> instead of a <button> */
  href?: string;
  disabled?: boolean;
  /** stretch to container width */
  full?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}
export declare function Button(props: ButtonProps): JSX.Element;
