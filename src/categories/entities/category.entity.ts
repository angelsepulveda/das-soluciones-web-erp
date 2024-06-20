import { Entity } from 'typeorm';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    unique: true,
  })
  name: string;

  @Column('text', {
    nullable: true,
  })
  description?: string;

  @Column('boolean', {
    default: true,
  })
  state: boolean;
}
