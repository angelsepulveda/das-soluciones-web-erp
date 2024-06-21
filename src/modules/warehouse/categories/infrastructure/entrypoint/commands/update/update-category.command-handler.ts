import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCategoryCommand } from './update-category.command';
import { UpdateCategoryUsecase } from '@warehouse/categories/application/usecases/update-category.usecase';
import { Inject } from '@nestjs/common';
import { CategoryDto } from '@warehouse/categories/infrastructure/dtos/category.dto';
import { UPDATE_CATEGORY_USECASE } from '@warehouse/categories/application/config/category.config';

@CommandHandler(UpdateCategoryCommand)
export class UpdateCategoryCommandHandler
  implements ICommandHandler<UpdateCategoryCommand, CategoryDto>
{
  constructor(
    @Inject(UPDATE_CATEGORY_USECASE)
    private readonly usecase: UpdateCategoryUsecase,
  ) {}

  async execute(command: UpdateCategoryCommand): Promise<CategoryDto> {
    const response = await this.usecase.handle(command.request);
    return response.toPrimitives();
  }
}
