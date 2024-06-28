import { PaginationCategoryRepository } from '@warehouse/categories/domain/ports/outbound/repositories/PaginationCategoryRepository';
import { PaginationParams } from 'src/Core/domain/Entities/PaginationParams';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '@warehouse/categories/infrastructure/Datebase/Entities/CategoryEntity';
import { Repository } from 'typeorm';
import { getAllPaginated } from '@core/infrastructure/Database/Utils/getAllPaginated';
import { PaginateQueryRaw } from '@core/infrastructure/Database/Models/PaginateQueryRaw';
import { PaginationResult } from '@core/domain/Entities/PaginationResult';
import { Category } from '@warehouse/categories/domain/Entities/Category';

@Injectable()
export class PaginationCategoryRepositoryAdapter
  implements PaginationCategoryRepository
{
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async handle(params: PaginationParams): Promise<PaginationResult<Category>> {
    const qb = this.categoryRepository.createQueryBuilder('categories');

    const primitives = params.toPrtmitives();
    const query: PaginateQueryRaw = {
      take: primitives.take,
      page: primitives.offset,
    };

    const result = await getAllPaginated(qb, query);

    return {
      currentPage: result.metadata.currentPage,
      totalItems: result.metadata.totalItems,
      totalPages: result.metadata.totalPages,
      itemsPerPage: result.metadata.itemsPerPage,
      nextPage: result.metadata.nextPage,
      items: result.rows.map((row) => {
        return Category.fromPrimitives({
          id: row.id,
          name: row.name,
          description: row.description,
          status: row.status,
        });
      }),
    };
  }
}
