import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllCategoryQuery } from '@warehouse/categories/infrastructure/Entrypoints/Queries/FindAll/FindAllCategoryQuery';
import { CategoryDto } from '@warehouse/categories/infrastructure/Dtos/CategoryDto';
import { Inject } from '@nestjs/common';
import { FIND_ALL_CATEGORY_USECASE } from '@warehouse/categories/application/Config/CategoryConfig';
import { FindAllCategoryUseCase } from '@warehouse/categories/application/UseCases/FindAllCategoryUseCase';

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
