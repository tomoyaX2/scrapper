import { Controller, Get, Post, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { PaginatedResponse } from 'src/shared/types';
import { Album } from './album.entity';
import { AlbumService } from './album.service';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  getAlbums(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
  ): PaginatedResponse<Album> {
    return this.albumService.getAlbums({
      page,
      perPage,
    });
  }

  @ApiQuery({
    name: 'name',
    type: Array,
    required: false,
  })
  @ApiQuery({
    name: 'authorIds',
    type: Array,
    required: false,
  })
  @ApiQuery({
    name: 'seriesIds',
    type: Array,
    required: false,
  })
  @ApiQuery({
    name: 'name',
    type: Array,
    required: false,
  })
  @ApiQuery({
    name: 'languageIds',
    type: Array,
    required: false,
  })
  @ApiQuery({
    name: 'groupIds',
    type: Array,
    required: false,
  })
  @ApiQuery({
    name: 'tagIds',
    type: Array,
    required: false,
  })
  @Post('search')
  searchAlbums(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
    @Query('name') name?: string,
    @Query('authorIds') authorIds?: string[],
    @Query('seriesIds') seriesIds?: string[],
    @Query('languageIds') languageIds?: string[],
    @Query('groupIds') groupIds?: string[],
    @Query('tagIds') tagIds?: string[],
  ): PaginatedResponse<Album> {
    return this.albumService.searchAlbums(
      {
        page,
        perPage,
      },
      {
        name,
        authorIds,
        seriesIds,
        languageIds,
        groupIds,
        tagIds,
      },
    );
  }
}
