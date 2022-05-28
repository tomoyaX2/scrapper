import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Gallery } from '../gallery/gallery.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column()
  login: string;

  @Column()
  email: string;

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

  @Column()
  two_factor_code: string;

  @OneToMany(() => Gallery, (gallery) => gallery.user)
  galleries: Gallery[];
}
