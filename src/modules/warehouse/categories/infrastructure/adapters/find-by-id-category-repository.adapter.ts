import { FindByIdCategoryRepository } from '@warehouse/categories/domain/ports/outbound/repositories/find-by-id-category.repository';
import { Injectable } from '@nestjs/common';
import { Category } from '@warehouse/categories/domain/entities/category';
import { CategoryId } from '@warehouse/categories/domain/value-objects/category-id';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '@warehouse/categories/infrastructure/database/entities/category.entity';
import { Repository } from 'typeorm';
import { Nullable } from '@core/domain/primitives/nullable';

@Injectable()
export class FindByIdCategoryRepositoryAdapter
  implements FindByIdCategoryRepository
{
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async handle(id: CategoryId): Promise<Nullable<Category>> {
    const categoryEntity = await this.categoryRepository.findOneBy({
      id: id.getValue(),
    });

    if (categoryEntity === null) return null;

    return Category.fromPrimitives({
      id: categoryEntity.id,
      name: categoryEntity.name,
      description: categoryEntity.description,
      status: categoryEntity.status,
    });
  }
}
