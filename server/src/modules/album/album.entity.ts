import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Author } from '../authors/authors.entity';
import { Gallery } from '../gallery/gallery.entity';
import { Group } from '../group/group.entity';
import { Image } from '../image/image.entity';
import { Language } from '../languages/languages.entity';
import { Series } from '../series/series.entity';
import { Tag } from '../tags/tags.entity';

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Gallery)
  gallery: Gallery;

  @OneToMany(() => Image, (image) => image.album)
  images: Image[];

  @ManyToMany(() => Author)
  @JoinTable()
  authors: Author[];

  @ManyToOne(() => Series)
  series: Series;

  @ManyToOne(() => Language)
  language: Language;

  @ManyToOne(() => Group)
  group: Group;

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];
}
