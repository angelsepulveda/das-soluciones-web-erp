import { FindByIdCategoryRepository } from '@warehouse/categories/domain/ports/outbound/repositories/FindByIdCategoryRepository';
import { Injectable } from '@nestjs/common';
import { Category } from '@warehouse/categories/domain/Entities/Category';
import { CategoryId } from '@warehouse/categories/domain/ValueObjects/CategoryId';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '@warehouse/categories/infrastructure/Datebase/Entities/CategoryEntity';
import { Repository } from 'typeorm';
import { Nullable } from '@core/domain/Primitives/Nullable';

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
