import { Metadata } from '@core/infrastructure/Database/Models/Metadata';

export interface Paginated<T> {
  rows: T[];
  metadata: Metadata;
}
