import { Entity } from 'typeorm';
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { Nullable } from '@core/domain/Primitives/Nullable';

@Entity('categories')
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    unique: true,
  })
  name: string;

  @Column('text', {
    nullable: true,
  })
  description: Nullable<string>;

  @Column('boolean', {
    default: true,
  })
  status: boolean;
}
