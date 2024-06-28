import { UpdateCategoryRepository } from '@warehouse/categories/domain/ports/outbound/repositories/UpdateCategoryRepository';
import { Injectable } from '@nestjs/common';
import { Category } from '@warehouse/categories/domain/Entities/Category';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '@warehouse/categories/infrastructure/Datebase/Entities/CategoryEntity';
import { Repository } from 'typeorm';

@Injectable()
export class UpdateCategoryRepositoryAdapter
  implements UpdateCategoryRepository
{
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async handle(category: Category): Promise<void> {
    const primitives = category.toPrimitives();
    const categoryEntity = await this.categoryRepository.preload({
      id: primitives.id,
      ...primitives,
    });

    await this.categoryRepository.save(categoryEntity);
  }
}
