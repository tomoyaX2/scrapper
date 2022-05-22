import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Gallery } from '../gallery/gallery.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid') id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  isActive: boolean;

  @Column()
  twoFaEnabled: boolean;

  @Column()
  avatarUrl: string;

  @OneToMany(() => Gallery, (gallery) => gallery.user)
  galleries: Gallery[];
}
