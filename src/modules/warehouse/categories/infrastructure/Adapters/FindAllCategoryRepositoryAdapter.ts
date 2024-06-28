import { Category } from '@warehouse/categories/domain/Entities/Category';
import { FindAllCategoryRepository } from '@warehouse/categories/domain/ports/outbound/repositories/FindAllCategoryRepository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '@warehouse/categories/infrastructure/Datebase/Entities/CategoryEntity';
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
