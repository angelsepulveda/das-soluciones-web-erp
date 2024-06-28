import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateCategoryDto } from '@warehouse/categories/infrastructure/Dtos/CreateCategoryDto';
import { CreateCategoryCommand } from '@warehouse/categories/infrastructure/Entrypoints/Commands/Create/CreateCategoryCommand';

@Controller('/categories/Create')
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
