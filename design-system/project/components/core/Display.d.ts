/**
 * Oversized lowercase headline — the brand's loudest typographic voice.
 */
export interface DisplayProps {
  children?: React.ReactNode;
  size?: "xl" | "l" | "m";
  as?: keyof JSX.IntrinsicElements;
  /** appends a red-pink full stop */
  accent?: boolean;
  style?: React.CSSProperties;
}
export declare function Display(props: DisplayProps): JSX.Element;
