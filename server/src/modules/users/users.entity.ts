import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Gallery } from '../gallery/gallery.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({ unique: true })
  login: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  twoFaEnabled: boolean;

  @Column({ nullable: true })
  avatarUrl: string;

  @Column({ nullable: true })
  access_token: string;

  @Column({ nullable: true })
  two_factor_code: string;

  @Column({ nullable: true })
  phone: string;

  @OneToMany(() => Gallery, (gallery) => gallery.user)
  galleries: Gallery[];
}
