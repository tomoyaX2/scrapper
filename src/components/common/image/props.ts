export type ImageProps = {
  url: string;
  width: number;
  height: number;
  horizontalSizes?: { width: number; height: number };
  verticalSizes?: { width: number; height: number };
  alt?: string;
  className?: string;
  onError?: () => void;
  previewOrientation?: 'horizontal' | 'vertical';
  id?: string;
  activeUrl?: string | null;
  allowIntersection?: boolean;
  onClick?: () => void;
  index?: number;
};
