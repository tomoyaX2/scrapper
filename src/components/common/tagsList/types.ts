type TagsListProps = {
  items: {
    id: string;
    name: string;
    albumsCount?: number;
    videosCount?: number;
  }[];
  allowRedirect?: boolean;
  redactorMode: boolean;
  videoId: string;
};

export type { TagsListProps };
