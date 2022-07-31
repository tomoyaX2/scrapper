export const handleImageOrientation = ({
  width,
  height,
  horizontalSizes,
  verticalSizes,
  previewOrientation
}: {
  width: number;
  height: number;
  horizontalSizes?: { width: number; height: number };
  verticalSizes?: { width: number; height: number };
  previewOrientation?: 'horizontal' | 'vertical';
}) => {
  if (horizontalSizes && verticalSizes) {
    if (previewOrientation === 'horizontal') {
      return horizontalSizes;
    } else if (previewOrientation === 'vertical') {
      return verticalSizes;
    }
  }
  if (!horizontalSizes || !verticalSizes) {
    return { width, height };
  }
  if (height < width) {
    return horizontalSizes;
  }
  return verticalSizes;
};
