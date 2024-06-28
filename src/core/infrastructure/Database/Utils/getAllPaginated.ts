import { SelectQueryBuilder } from 'typeorm';
import { PaginateQueryRaw } from '@core/infrastructure/Database/Models/PaginateQueryRaw';
import { Paginated } from '@core/infrastructure/Database/Models/Paginated';
import { Metadata } from '@core/infrastructure/Database/Models/Metadata';

export const getAllPaginated = async <T>(
  qb: SelectQueryBuilder<T>,
  query: PaginateQueryRaw,
): Promise<Paginated<T>> => {
  const skip = query.take * query.page - query.take;

  console.log(skip);

  const [rows, count] = await qb.take(query.take).skip(skip).getManyAndCount();

  const itemsPerPage = query.take;
  const totalPages = Math.ceil(count / itemsPerPage);
  const totalItems = count;
  const currentPage = query.page;
  const nextPage = totalPages - currentPage <= 0 ? null : currentPage + 1;

  const metadata: Metadata = {
    itemsPerPage,
    totalPages,
    totalItems,
    currentPage,
    nextPage,
  };

  return { rows, metadata };
};
