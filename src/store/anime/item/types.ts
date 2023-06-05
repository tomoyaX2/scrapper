import { User } from 'src/store/user/types';

interface VideoComment {
  text: string;
  id: string;
  author: User;
}

interface Episode {
  id: string;
  url: string;
  name: string;
  qualities: string[];
  availableQuality: string[];
}

interface VideoState {
  title: string;
  id: string;
  type?: { name: string; id: string };
  language?: { name: string; id: string };
  tags?: { name: string; id: string; albumsCount: number }[];
  coverImageUrl?: string;
  views?: number;
  rate?: number;
  currentRate?: number;
  episodes: Episode[];
  comments?: VideoComment[];
}

export type { VideoComment, Episode, VideoState };
