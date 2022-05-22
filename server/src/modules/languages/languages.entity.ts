import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Language {
  @PrimaryGeneratedColumn('uuid') id: number;

  @Column()
  name: string;
}
