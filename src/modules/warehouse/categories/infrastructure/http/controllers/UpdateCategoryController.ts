import { Body, Controller, Put } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { UpdateCategoryDto } from '@warehouse/categories/infrastructure/Dtos/UpdateCategoryDto';
import { CategoryDto } from '@warehouse/categories/infrastructure/Dtos/CategoryDto';
import { UpdateCategoryCommand } from '../../Entrypoints/Commands/Update/UpdateCategoryCommand';

@Controller('/categories/update')
export class UpdateCategoryController {
  constructor(private readonly command: CommandBus) {}

  @Put()
  async create(
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryDto> {
    return await this.command.execute(
      new UpdateCategoryCommand({
        ...updateCategoryDto,
      }),
    );
  }
}
