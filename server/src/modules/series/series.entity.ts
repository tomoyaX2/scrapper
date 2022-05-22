import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Album } from '../album/album.entity';

@Entity()
export class Series {
  @PrimaryGeneratedColumn('uuid') id: number;

  @Column()
  name: string;

  @OneToMany(() => Album, (album) => album.gallery)
  albums: Album[];
}
