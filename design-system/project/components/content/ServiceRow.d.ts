/**
 * Numbered, expandable service line — the studio's capability list, built as hairline rows rather than cards.
 */
export interface ServiceRowProps {
  /** e.g. "01" */
  index: string;
  title: string;
  description?: string;
  tags?: string[];
  open?: boolean;
  /** omit to render a static (non-expanding) row */
  onToggle?: () => void;
}
export declare function ServiceRow(props: ServiceRowProps): JSX.Element;
