export type ReaderPageOption = { label: number; value: number };

export type ReaderPage = {
  currentPage: number;
  images: Image[];
  pagesList: ReaderPageOption[];
};

export type Image = {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
};
