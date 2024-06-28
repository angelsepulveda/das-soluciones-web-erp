import { DynamicModule, Module, Type } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from '@warehouse/categories/infrastructure/Datebase/Entities/CategoryEntity';
import { CreateCategoryRepository } from '@warehouse/categories/domain/ports/outbound/repositories/CreateCategoryRepository';
import { UpdateCategoryRepository } from '@warehouse/categories/domain/ports/outbound/repositories/UpdateCategoryRepository';
import { FindAllCategoryRepository } from '@warehouse/categories/domain/ports/outbound/repositories/FindAllCategoryRepository';
import { FindByIdCategoryRepository } from '@warehouse/categories/domain/ports/outbound/repositories/FindByIdCategoryRepository';
import { CreateCategoryDomainService } from '@warehouse/categories/domain/Services/CreateCategoryDomainService';
import { UpdateCategoryDomainService } from '@warehouse/categories/domain/Services/UpdateCategoryDomainService';
import { FindAllCategoryDomainService } from '@warehouse/categories/domain/Services/FindAllCategoryDomainService';
import { FindByIdCategoryDomainService } from '@warehouse/categories/domain/Services/FindByIdCategoryDomainService';
import { CreateCategoryRepositoryAdapter } from '@warehouse/categories/infrastructure/Adapters/CreateCategoryRepositoryAdapter';
import { UpdateCategoryRepositoryAdapter } from '@warehouse/categories/infrastructure/Adapters/UpdateCategoryRepositoryAdapter';
import { FindByIdCategoryRepositoryAdapter } from '@warehouse/categories/infrastructure/Adapters/FindByIdCategoryRepositoryAdapter';
import { FindAllCategoryRepositoryAdapter } from '@warehouse/categories/infrastructure/Adapters/FindAllCategoryRepositoryAdapter';
import { CreateCategoryUseCase } from '@warehouse/categories/application/UseCases/CreateCategoryUseCase';
import {
  CREATE_CATEGORY_SERVICE,
  CREATE_CATEGORY_USECASE,
  FIND_ALL_CATEGORY_SERVICE,
  FIND_ALL_CATEGORY_USECASE,
  FIND_BY_ID_CATEGORY_SERVICE,
  UPDATE_CATEGORY_SERVICE,
  UPDATE_CATEGORY_USECASE,
} from '@warehouse/categories/application/Config/CategoryConfig';
import { CreateCategoryCommandHandler } from '@warehouse/categories/infrastructure/Entrypoints/Commands/Create/CreateCategoryCommandHandler';
import { CreateCategoryController } from '@warehouse/categories/infrastructure/http/controllers/create-category.controller';
import { UpdateCategoryController } from './http/controllers/update-category.controller';
import { UpdateCategoryCommandHandler } from './Entrypoints/Commands/Update/UpdateCategoryCommandHandler';
import { UpdateCategoryUseCase } from '@warehouse/categories/application/UseCases/UpdateCategoryUseCase';
import { FindAllCategoryUseCase } from '@warehouse/categories/application/UseCases/FindAllCategoryUseCase';
import { FindAllCategoryQuery } from '@warehouse/categories/infrastructure/Entrypoints/Queries/FindAll/FindAllCategoryQuery';
import { FindAllCategoryController } from '@warehouse/categories/infrastructure/http/controllers/find-all-category.controller';
import { FindAllCategoryQueryHandler } from '@warehouse/categories/infrastructure/Entrypoints/Queries/FindAll/FindAllCategoryQueryHandler';

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
        return new CreateCategoryUseCase(createService);
      },
      inject: [CREATE_CATEGORY_SERVICE],
    };

    const FindAllCategoryUseCaseProvider = {
      provide: FIND_ALL_CATEGORY_USECASE,
      useFactory: (findAllService: FindAllCategoryDomainService) => {
        return new FindAllCategoryUseCase(findAllService);
      },
      inject: [FIND_ALL_CATEGORY_SERVICE],
    };

    const UpdateCategoryUseCaseProvider = {
      provide: UPDATE_CATEGORY_USECASE,
      useFactory: (
        findByIdService: FindByIdCategoryDomainService,
        updateService: UpdateCategoryDomainService,
      ) => {
        return new UpdateCategoryUseCase(findByIdService, updateService);
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
        FindAllCategoryUseCaseProvider,
        FindAllCategoryQueryHandler,
      ],
      exports: [
        CreateCategoryRepositoryAdapter,
        UpdateCategoryRepositoryAdapter,
        FindByIdCategoryRepositoryAdapter,
        FindAllCategoryRepositoryAdapter,
        CreateCategoryUseCaseProvider,
        UpdateCategoryUseCaseProvider,
        FindAllCategoryUseCaseProvider,
      ],
      controllers: [
        CreateCategoryController,
        UpdateCategoryController,
        FindAllCategoryController,
      ],
    };
  }
}
