import { AlbumFilters } from 'src/shared/enums/AlbumFilters';
import { AlbumPaginationQuery } from 'src/shared/types';
import { SelectQueryBuilder } from 'typeorm';
import { Album } from './album.entity';

const joinFields = [
  AlbumFilters.Author,
  AlbumFilters.Series,
  AlbumFilters.Language,
  AlbumFilters.Group,
  AlbumFilters.Tag,
];

export const buildAlbumPagination = async (
  data: AlbumPaginationQuery,
  query: SelectQueryBuilder<Album>,
) => {
  let resultQuery = query;
  const whereData = {};

  for (const field of joinFields) {
    resultQuery = resultQuery.leftJoinAndSelect(`album.${field}`, field);
  }

  const activeFilters = Object.keys(data).filter((key) => {
    const isActive = !!data[key]?.length;
    if (isActive)
      whereData[key] = Array.isArray(data[key]) ? data[key] : [data[key]];
    return isActive;
  });

  const whereString = activeFilters
    .map((key) => `${key}.id IN (:...${key})`)
    .join(' AND ');

  return resultQuery
    .where(whereString, whereData)
    .skip((data.page - 1) * data.perPage)
    .take(data.perPage)
    .getManyAndCount();
};
