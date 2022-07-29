export type Author = {
  value: string;
  label: string;
};

export type AuthorModel = {
  id: string;
  name: string;
};

export type AuthorsState = {
  authorsList: Author[];
  page: number;
  perPage: number;
  visibleAuthors: Author[];
};
