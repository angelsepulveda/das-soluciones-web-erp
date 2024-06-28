import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCategoryCommand } from './UpdateCategoryCommand';
import { UpdateCategoryUseCase } from '@warehouse/categories/application/UseCases/UpdateCategoryUseCase';
import { Inject } from '@nestjs/common';
import { CategoryDto } from '@warehouse/categories/infrastructure/Dtos/CategoryDto';
import { UPDATE_CATEGORY_USECASE } from '@warehouse/categories/application/Config/CategoryConfig';

@CommandHandler(UpdateCategoryCommand)
export class UpdateCategoryCommandHandler
  implements ICommandHandler<UpdateCategoryCommand, CategoryDto>
{
  constructor(
    @Inject(UPDATE_CATEGORY_USECASE)
    private readonly usecase: UpdateCategoryUseCase,
  ) {}

  async execute(command: UpdateCategoryCommand): Promise<CategoryDto> {
    const response = await this.usecase.handle(command.request);
    return response.toPrimitives();
  }
}
