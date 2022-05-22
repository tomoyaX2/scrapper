import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Album } from '../album/album.entity';

@Entity()
export class Image {
  @PrimaryGeneratedColumn('uuid') id: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @ManyToOne(() => Album, (album) => album.images)
  albums: Album;
}
