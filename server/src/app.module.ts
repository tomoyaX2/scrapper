import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { ScrapperModule } from './modules/scrapper/scrapper.module';
import { ImageModule } from './modules/image/image.module';
import { TagsModule } from './modules/tags/tags.module';
import { AlbumModule } from './modules/album/album.module';
import { AuthorsModule } from './modules/authors/authors.module';
import { LanguagesModule } from './modules/languages/languages.module';
import { SeriesModule } from './modules/series/series.module';
import { UsersModule } from './modules/users/users.module';
import { TypeModule } from './modules/type/type.module';
import { GroupModule } from './modules/group/group.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    ScrapperModule,
    ImageModule,
    TagsModule,
    AlbumModule,
    AuthorsModule,
    LanguagesModule,
    SeriesModule,
    UsersModule,
    TypeModule,
    GroupModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
