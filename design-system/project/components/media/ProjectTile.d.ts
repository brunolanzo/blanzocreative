/**
 * Work-grid tile: media that plays on hover, lowercase title, client, year, discipline tags.
 */
export interface ProjectTileProps {
  title: string;
  client?: string;
  year?: string | number;
  tags?: string[];
  /** CSS aspect-ratio string, e.g. "16 / 9" or "4 / 5" */
  ratio?: string;
  /** still frame shown at rest */
  poster?: string;
  /** looping clip revealed on hover */
  video?: string;
  /** e.g. "01" — overlaid on the media */
  index?: string;
  onClick?: (e: React.MouseEvent) => void;
}
export declare function ProjectTile(props: ProjectTileProps): JSX.Element;
