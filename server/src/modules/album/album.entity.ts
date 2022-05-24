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
import { Type } from '../type/type.entity';

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @ManyToOne(() => Gallery)
  gallery?: Gallery;

  @Column({ nullable: true })
  path?: string;

  @OneToMany(() => Image, (image) => image.album)
  images?: Image[];

  @ManyToMany(() => Author)
  @JoinTable()
  authors?: Author[];

  @ManyToOne(() => Type)
  type?: Type;

  @ManyToOne(() => Series)
  series?: Series;

  @ManyToOne(() => Language)
  language?: Language;

  @ManyToOne(() => Group)
  group?: Group;

  @ManyToMany(() => Tag)
  @JoinTable()
  tags?: Tag[];
}
