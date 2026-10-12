/**
 * Uppercase wide-tracked label that sits above headlines and numbers sections.
 */
export interface EyebrowProps {
  children?: React.ReactNode;
  /** paint it red-pink instead of muted grey */
  accent?: boolean;
  /** e.g. "01" — renders the number plus a rule before the label */
  index?: string | number;
  as?: keyof JSX.IntrinsicElements;
  style?: React.CSSProperties;
}
export declare function Eyebrow(props: EyebrowProps): JSX.Element;
