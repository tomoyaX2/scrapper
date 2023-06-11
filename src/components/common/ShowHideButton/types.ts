export interface ShowMoreButtonProps {
  isVisible: boolean;
  action: (flag: boolean) => void;
  active: boolean;
  className?: string;
}
