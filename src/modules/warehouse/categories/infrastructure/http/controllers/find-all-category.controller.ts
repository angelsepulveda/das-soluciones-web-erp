import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { FindAllCategoryQuery } from '@warehouse/categories/infrastructure/entrypoint/queries/find-all/find-all-category.query';
import { CategoryDto } from '@warehouse/categories/infrastructure/dtos/category.dto';

@Controller('/categories/get-all')
export class FindAllCategoryController {
  constructor(private readonly query: QueryBus) {}

  @Get()
  async findAll(): Promise<CategoryDto[]> {
    return await this.query.execute(new FindAllCategoryQuery());
  }
}
