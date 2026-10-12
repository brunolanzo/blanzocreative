/**
 * Endless horizontal ticker of capabilities — the brand's "always in motion" device.
 */
export interface MarqueeProps {
  items: string[];
  /** seconds for one full pass; lower is faster */
  speed?: number;
  /** glyph placed between items */
  separator?: string;
  /** paint every Nth item red-pink (0 = never) */
  accentEvery?: number;
  /** any CSS font-size */
  size?: string;
}
export declare function Marquee(props: MarqueeProps): JSX.Element;
