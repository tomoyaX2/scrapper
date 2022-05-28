import { Controller, Get, Param, Post, Query } from '@nestjs/common';
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

  @Get(':albumId')
  getAlbumById(@Param('albumId') albumId: string): Promise<Album> {
    return this.albumService.getAlbumById(albumId);
  }

  @ApiQuery({
    name: 'name',
    type: Array,
    required: false,
  })
  @ApiQuery({
    name: 'author',
    type: Array,
    required: false,
  })
  @ApiQuery({
    name: 'series',
    type: Array,
    required: false,
  })
  @ApiQuery({
    name: 'name',
    type: Array,
    required: false,
  })
  @ApiQuery({
    name: 'languages',
    type: Array,
    required: false,
  })
  @ApiQuery({
    name: 'groups',
    type: Array,
    required: false,
  })
  @ApiQuery({
    name: 'tags',
    type: Array,
    required: false,
  })
  @Post('search')
  searchAlbums(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('name') name?: string,
    @Query('author') authors?: string[],
    @Query('series') series?: string[],
    @Query('languages') language?: string[],
    @Query('groups') group?: string[],
    @Query('tags') tags?: string[],
  ): PaginatedResponse<Album> {
    return this.albumService.searchAlbums({
      page: parseInt(page),
      perPage: parseInt(perPage),
      name,
      authors,
      series,
      language,
      group,
      tags,
    });
  }
}
