export enum SelectorTypes {
  List = 'list',
  String = 'string',
  Images = 'images',
}

export interface SelectorArgs {
  selector: string;
  textFormatter?: (text: string) => string;
  type: SelectorTypes;
}

export type PaginatedResponse<T> = Promise<{
  data: T[];
  total: number;
  currentPage: number;
}>;

export interface DefaultPaginationQuery {
  page?: number;
  perPage?: number;
  name?: string;
}
export interface AlbumPaginationQuery {
  name?: string;
  authorIds?: string[];
  seriesIds?: string[];
  languageIds?: string[];
  groupIds?: string[];
  tagIds?: string[];
}
