import { DynamicModule, Module, Type } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from '@warehouse/categories/infrastructure/database/entities/category.entity';
import { CreateCategoryRepository } from '@warehouse/categories/domain/ports/outbound/repositories/create-category.repository';
import { UpdateCategoryRepository } from '@warehouse/categories/domain/ports/outbound/repositories/update-category.repository';
import { FindAllCategoryRepository } from '@warehouse/categories/domain/ports/outbound/repositories/find-all-category.repository';
import { FindByIdCategoryRepository } from '@warehouse/categories/domain/ports/outbound/repositories/find-by-id-category.repository';
import { CreateCategoryDomainService } from '@warehouse/categories/domain/services/create-category-domain.service';
import { UpdateCategoryDomainService } from '@warehouse/categories/domain/services/update-category-domain.service';
import { FindAllCategoryDomainService } from '@warehouse/categories/domain/services/find-all-category-domain.service';
import { FindByIdCategoryDomainService } from '@warehouse/categories/domain/services/find-by-id-category-domain.service';
import { CreateCategoryRepositoryAdapter } from '@warehouse/categories/infrastructure/adapters/create-category-repository.adapter';
import { UpdateCategoryRepositoryAdapter } from '@warehouse/categories/infrastructure/adapters/update-category-repository.adapter';
import { FindByIdCategoryRepositoryAdapter } from '@warehouse/categories/infrastructure/adapters/find-by-id-category-repository.adapter';
import { FindAllCategoryRepositoryAdapter } from '@warehouse/categories/infrastructure/adapters/find-all-category-repository.adapter';
import { CreateCategoryUsecase } from '@warehouse/categories/application/usecases/create-category.usecase';
import {
  CREATE_CATEGORY_SERVICE,
  CREATE_CATEGORY_USECASE,
  FIND_ALL_CATEGORY_SERVICE,
  FIND_BY_ID_CATEGORY_SERVICE,
  UPDATE_CATEGORY_SERVICE,
  UPDATE_CATEGORY_USECASE,
} from '@warehouse/categories/application/config/category.config';
import { CreateCategoryCommandHandler } from '@warehouse/categories/infrastructure/entrypoint/commands/create/create-category.command-handler';
import { CreateCategoryController } from '@warehouse/categories/infrastructure/http/create-category.controller';
import { UpdateCategoryController } from './http/update-category.controller';
import { UpdateCategoryCommandHandler } from './entrypoint/commands/update/update-category.command-handler';
import { UpdateCategoryUsecase } from '../application/usecases/update-category.usecase';

export type CategoriesModuleOptions = {
  modules: Type[];
  adapters?: {
    createCategoryRepository: Type<CreateCategoryRepository>;
    updateCategoryRepository: Type<UpdateCategoryRepository>;
    findAllCategoryRepository: Type<FindAllCategoryRepository>;
    findByIdCategoryRepository: Type<FindByIdCategoryRepository>;
  };
};

@Module({})
export class CategoriesModule {
  static register({ modules }: CategoriesModuleOptions): DynamicModule {
    const CreateCategoryUseCaseProvider = {
      provide: CREATE_CATEGORY_USECASE,
      useFactory: (createService: CreateCategoryDomainService) => {
        return new CreateCategoryUsecase(createService);
      },
      inject: [CREATE_CATEGORY_SERVICE],
    };

    const UpdateCategoryUseCaseProvider = {
      provide: UPDATE_CATEGORY_USECASE,
      useFactory: (
        findByIdService: FindByIdCategoryDomainService,
        updateService: UpdateCategoryDomainService,
      ) => {
        return new UpdateCategoryUsecase(findByIdService, updateService);
      },
      inject: [UPDATE_CATEGORY_SERVICE],
    };

    const CreateCategoryServiceProvider = {
      provide: CREATE_CATEGORY_SERVICE,
      useFactory: (repository: CreateCategoryRepository) => {
        return new CreateCategoryDomainService(repository);
      },
      inject: [CreateCategoryRepositoryAdapter],
    };

    const UpdateCategoryServiceProvider = {
      provide: UPDATE_CATEGORY_SERVICE,
      useFactory: (repository: UpdateCategoryRepository) => {
        return new UpdateCategoryDomainService(repository);
      },
      inject: [UpdateCategoryRepositoryAdapter],
    };

    const FindAllCategoryServiceProvider = {
      provide: FIND_ALL_CATEGORY_SERVICE,
      useFactory: (repository: FindAllCategoryRepository) => {
        return new FindAllCategoryDomainService(repository);
      },
      inject: [FindAllCategoryRepositoryAdapter],
    };

    const FindByIdCategoryServiceProvider = {
      provide: FIND_BY_ID_CATEGORY_SERVICE,
      useFactory: (repository: FindByIdCategoryRepository) => {
        return new FindByIdCategoryDomainService(repository);
      },
      inject: [FindByIdCategoryRepositoryAdapter],
    };

    return {
      module: CategoriesModule,
      global: true,
      imports: [...modules, TypeOrmModule.forFeature([CategoryEntity])],
      providers: [
        CreateCategoryServiceProvider,
        UpdateCategoryServiceProvider,
        FindByIdCategoryServiceProvider,
        FindAllCategoryServiceProvider,
        CreateCategoryRepositoryAdapter,
        UpdateCategoryRepositoryAdapter,
        FindByIdCategoryRepositoryAdapter,
        FindAllCategoryRepositoryAdapter,
        CreateCategoryUseCaseProvider,
        CreateCategoryCommandHandler,
        UpdateCategoryCommandHandler,
        UpdateCategoryUseCaseProvider,
      ],
      exports: [
        CreateCategoryRepositoryAdapter,
        UpdateCategoryRepositoryAdapter,
        FindByIdCategoryRepositoryAdapter,
        FindAllCategoryRepositoryAdapter,
        CreateCategoryUseCaseProvider,
      ],
      controllers: [CreateCategoryController, UpdateCategoryController],
    };
  }
}
