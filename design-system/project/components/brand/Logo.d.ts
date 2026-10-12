/**
 * The Blanzo mark. Renders the supplied artwork — never re-drawn type.
 */
export interface LogoProps {
  /** wordmark = full "blanzo" script; monogram = "bl"; badge = bl knocked out of a black circle */
  variant?: "wordmark" | "monogram" | "badge";
  theme?: "light-on-dark" | "dark-on-light";
  /** rendered height in px; width follows */
  height?: number;
  /** play the supplied trim-path draw-on video instead of the still */
  animated?: boolean;
  /** relative path from the consuming page to the design-system root (default ".") */
  base?: string;
  style?: React.CSSProperties;
}
export declare function Logo(props: LogoProps): JSX.Element;
