type TagsListProps = {
  items: {
    id: string;
    name: string;
    albumsCount?: number;
    videosCount?: number;
  }[];
  allowRedirect?: boolean;
};

export type { TagsListProps };
