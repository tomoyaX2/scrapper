import { AlbumPaginationQuery } from 'src/shared/types';
import { In, Like } from 'typeorm';

const queryMapper = {
  name: { key: 'name', query: (name: string[]) => Like('%' + name + '%') },
  authorIds: { key: 'authors', query: (ids: number[]) => In(ids) },
  seriesIds: { key: 'series', query: (ids: number[]) => In(ids) },
  languageIds: { key: 'language', query: (ids: number[]) => In(ids) },
  groupIds: { key: 'group', query: (ids: number[]) => In(ids) },
  tagIds: { key: 'tags', query: (ids: number[]) => In(ids) },
};

export const buildAlbumPagination = (data: AlbumPaginationQuery) => {
  const result = {};
  const filters = [];
  const dataKeys = Object.keys(data);
  for (const dataKey of dataKeys) {
    if (data[dataKey]?.length) {
      filters.push(dataKey);
    }
  }
  if (filters.length) {
    for (const filter of filters) {
      const fieldKey = queryMapper[filter].key;
      console.log(data[filter], 'data[filter]');
      result[fieldKey] = queryMapper[filter].query(data[filter]);
    }
  }
  return result;
};
