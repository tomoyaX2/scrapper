import { Album } from '../albums/types';
import { User } from '../user/types';

export type Image = {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
};

export interface AlbumComment {
  text: string;
  id: string;
  author: User;
}

export interface Recommendations {
  sameAuthor?: Album[];
  sameGroups?: Album[];
  sameSeries?: Album[];
}

export type AlbumState = {
  title: string;
  id: string;
  series?: { name: string; id: string }[];
  type?: { name: string; id: string };
  language?: { name: string; id: string };
  tags?: { name: string; id: string; albumsCount: number }[];
  authors?: { name: string; id: string; albumsCount: number }[];
  group?: { name: string; id: string };
  preview?: string;
  totalImages?: number;
  images: Image[];
  path?: string;
  downloadPath: string;
  views?: number;
  rate?: number;
  currentRate?: number;
  comments?: AlbumComment[];
  recommendations: Recommendations;
};
