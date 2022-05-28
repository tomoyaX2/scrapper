import { AlbumFilters } from 'src/shared/enums/AlbumFilters';
import { AlbumPaginationQuery } from 'src/shared/types';
import { In, Repository } from 'typeorm';
import { Album } from './album.entity';

const joinFields = [
  AlbumFilters.Author,
  AlbumFilters.Series,
  AlbumFilters.Language,
  AlbumFilters.Group,
  AlbumFilters.Tag,
];

export const buildAlbumPagination = async (
  filterData: AlbumPaginationQuery,
  albumRepository: Repository<Album>,
) => {
  const whereData = {};
  const query = await albumRepository.createQueryBuilder('album');

  for (const field of joinFields) {
    query.leftJoinAndSelect(`album.${field}`, field);
  }

  const activeFilters = Object.keys(filterData).filter((key) => {
    const isActive = !!filterData[key]?.length;
    if (isActive)
      whereData[key] = Array.isArray(filterData[key])
        ? filterData[key]
        : [filterData[key]];
    return isActive;
  });

  const whereString = activeFilters
    .map((key) => `${key}.id IN (:...${key})`)
    .join(' AND ');

  const initialResult = await query
    .where(whereString, whereData)
    .skip((filterData.page - 1) * filterData.perPage)
    .take(filterData.perPage)
    .getManyAndCount();

  const idsToSelect = initialResult[0].map((el) => el.id);

  const albumsWithPagination = await albumRepository.findAndCount({
    relations: ['authors', 'images', 'series', 'language', 'group', 'tags'],
    where: {
      id: In(idsToSelect),
    },
    skip: (filterData.page - 1) * filterData.perPage,
    take: filterData.perPage,
  });
  return albumsWithPagination;
};
