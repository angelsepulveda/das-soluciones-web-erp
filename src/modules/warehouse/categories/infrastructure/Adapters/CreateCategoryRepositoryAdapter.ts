import { Category } from '@warehouse/categories/domain/Entities/Category';
import { CreateCategoryRepository } from '@warehouse/categories/domain/ports/outbound/repositories/CreateCategoryRepository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from '@warehouse/categories/infrastructure/Datebase/Entities/CategoryEntity';

@Injectable()
export class CreateCategoryRepositoryAdapter
  implements CreateCategoryRepository
{
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async handle(category: Category): Promise<void> {
    const categoryEntity = this.categoryRepository.create(
      category.toPrimitives(),
    );

    await this.categoryRepository.save(categoryEntity);
  }
}
