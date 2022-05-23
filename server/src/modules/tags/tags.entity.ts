import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Album } from '../album/album.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn('uuid') id: number;

  @Column()
  name: string;

  @ManyToMany(() => Album)
  @JoinTable()
  albums: Album[];
}
