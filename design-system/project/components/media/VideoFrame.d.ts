/**
 * Reel / showcase player: muted autoplay loop with a minimal pill play-pause control.
 */
export interface VideoFrameProps {
  src: string;
  poster?: string;
  ratio?: string;
  caption?: string;
  autoPlay?: boolean;
  loop?: boolean;
  /** use native browser controls instead of the pill toggle */
  controls?: boolean;
  /** square the corners for edge-to-edge sections */
  fullBleed?: boolean;
}
export declare function VideoFrame(props: VideoFrameProps): JSX.Element;
