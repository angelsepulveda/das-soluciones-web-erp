import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCategoryCommand } from '@warehouse/categories/infrastructure/Entrypoints/Commands/Create/CreateCategoryCommand';
import { CREATE_CATEGORY_USECASE } from '@warehouse/categories/application/Config/CategoryConfig';
import { CreateCategoryUseCase } from '@warehouse/categories/application/UseCases/CreateCategoryUseCase';
import { Inject } from '@nestjs/common';
import { CategoryDto } from '@warehouse/categories/infrastructure/Dtos/CategoryDto';

@CommandHandler(CreateCategoryCommand)
export class CreateCategoryCommandHandler
  implements ICommandHandler<CreateCategoryCommand, CategoryDto>
{
  constructor(
    @Inject(CREATE_CATEGORY_USECASE)
    private readonly usecase: CreateCategoryUseCase,
  ) {}

  async execute(command: CreateCategoryCommand): Promise<CategoryDto> {
    const response = await this.usecase.handle(command.request);
    return response.toPrimitives();
  }
}
