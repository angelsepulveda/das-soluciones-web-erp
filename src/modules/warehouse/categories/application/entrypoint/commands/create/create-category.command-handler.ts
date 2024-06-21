import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCategoryCommand } from '@warehouse/categories/application/entrypoint/commands/create/create-category.command';
import { CREATE_CATEGORY_USECASE } from '@warehouse/categories/application/config/category.config';
import { CreateCategoryUsecase } from '@warehouse/categories/application/usecases/create-category.usecase';
import { Inject } from '@nestjs/common';
import { CategoryDto } from '@warehouse/categories/application/dtos/category.dto';

@CommandHandler(CreateCategoryCommand)
export class CreateCategoryCommandHandler
  implements ICommandHandler<CreateCategoryCommand, CategoryDto>
{
  constructor(
    @Inject(CREATE_CATEGORY_USECASE)
    private readonly usecase: CreateCategoryUsecase,
  ) {}

  async execute(command: CreateCategoryCommand): Promise<CategoryDto> {
    return await this.usecase.handle(command.request);
  }
}
