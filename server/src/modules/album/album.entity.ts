import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Author } from '../authors/authors.entity';
import { Gallery } from '../gallery/gallery.entity';
import { Image } from '../image/image.entity';
import { Language } from '../languages/languages.entity';
import { Series } from '../series/series.entity';

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Gallery)
  gallery: Gallery;

  @OneToMany(() => Image, (image) => image.albums)
  images: Image[];

  @ManyToOne(() => Author)
  author: Author;

  @ManyToOne(() => Series)
  series: Series;

  @ManyToOne(() => Language)
  language: Language;
}
