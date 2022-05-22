import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Album } from '../album/album.entity';
import { User } from '../users/users.entity';

@Entity()
export class Gallery {
  @PrimaryGeneratedColumn('uuid') id: number;

  @Column()
  name: string;

  @OneToMany(() => Album, (album) => album.gallery)
  albums: Album[];

  @ManyToOne(() => User, (user) => user.galleries)
  user: User;
}
