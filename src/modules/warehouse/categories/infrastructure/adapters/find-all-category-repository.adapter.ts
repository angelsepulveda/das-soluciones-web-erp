import { Category } from '@warehouse/categories/domain/entities/category';
import { FindAllCategoryRepository } from '@warehouse/categories/domain/ports/outbound/repositories/find-all-category.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '@warehouse/categories/infrastructure/database/entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindAllCategoryRepositoryAdapter
  implements FindAllCategoryRepository
{
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async handle(): Promise<Category[]> {
    const categoryEntities = await this.categoryRepository.find({});

    return categoryEntities.map((entity) =>
      Category.fromPrimitives({
        id: entity.id,
        name: entity.name,
        description: entity.description,
        status: entity.status,
      }),
    );
  }
}
