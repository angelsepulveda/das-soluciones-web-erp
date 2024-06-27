import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllCategoryQuery } from '@warehouse/categories/infrastructure/entrypoint/queries/find-all/find-all-category.query';
import { CategoryDto } from '@warehouse/categories/infrastructure/dtos/category.dto';
import { Inject } from '@nestjs/common';
import { FIND_ALL_CATEGORY_USECASE } from '@warehouse/categories/application/config/category.config';
import { FindAllCategoryUseCase } from '@warehouse/categories/application/usecases/find-all-category.usecase';

@QueryHandler(FindAllCategoryQuery)
export class FindAllCategoryQueryHandler
  implements IQueryHandler<FindAllCategoryQuery, CategoryDto[]>
{
  constructor(
    @Inject(FIND_ALL_CATEGORY_USECASE)
    private readonly usecase: FindAllCategoryUseCase,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(query: FindAllCategoryQuery): Promise<CategoryDto[]> {
    const categories = await this.usecase.handle();

    return categories.map((category) => category.toPrimitives());
  }
}
