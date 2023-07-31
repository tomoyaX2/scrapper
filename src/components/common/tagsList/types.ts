type TagsListProps = {
  items: {
    id: string;
    name: string;
    albumsCount?: number;
    videosCount?: number;
  }[];
  allowRedirect?: boolean;
  redactorMode: boolean;
  sourceId: string;
  source: 'album' | 'video';
};

export type { TagsListProps };
