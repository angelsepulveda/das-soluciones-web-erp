import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateCategoryDto } from '@warehouse/categories/application/dtos/create-category.dto';
import { CreateCategoryCommand } from '@warehouse/categories/application/entrypoint/commands/create/create-category.command';

@Controller('/categories/create')
export class CreateCategoryController {
  constructor(private readonly command: CommandBus) {}

  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<CreateCategoryDto> {
    return await this.command.execute(
      new CreateCategoryCommand({
        ...createCategoryDto,
      }),
    );
  }
}
