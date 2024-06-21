import { Body, Controller, Put } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { CategoryDto } from '../dtos/category.dto';
import { UpdateCategoryCommand } from '../entrypoint/commands/update/update-category.command';

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
