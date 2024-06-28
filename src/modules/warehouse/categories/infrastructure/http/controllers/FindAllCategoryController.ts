import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { FindAllCategoryQuery } from '@warehouse/categories/infrastructure/Entrypoints/Queries/FindAll/FindAllCategoryQuery';
import { CategoryDto } from '@warehouse/categories/infrastructure/Dtos/CategoryDto';

@Controller('/categories/get-all')
export class FindAllCategoryController {
  constructor(private readonly query: QueryBus) {}

  @Get()
  async findAll(): Promise<CategoryDto[]> {
    return await this.query.execute(new FindAllCategoryQuery());
  }
}
