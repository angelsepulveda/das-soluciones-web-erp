import { DynamicModule, Module, Type } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CREATE_CATEGORY_SERVICE,
  CREATE_CATEGORY_USECASE,
  FIND_ALL_CATEGORY_SERVICE,
  FIND_ALL_CATEGORY_USECASE,
  FIND_BY_ID_CATEGORY_SERVICE,
  PAGINATION_CATEGORY_SERVICE,
  PAGINATION_CATEGORY_USECASE,
  UPDATE_CATEGORY_SERVICE,
  UPDATE_CATEGORY_USECASE,
} from '@warehouse/categories/application/Config/CategoryConfig';
import {
  CreateCategoryController,
  FindAllCategoryController,
  PaginationCategoryController,
  UpdateCategoryController,
} from '@warehouse/categories/infrastructure/Http';
import {
  CreateCategoryRepositoryAdapter,
  FindAllCategoryRepositoryAdapter,
  FindByIdCategoryRepositoryAdapter,
  PaginationCategoryRepositoryAdapter,
  UpdateCategoryRepositoryAdapter,
} from '@warehouse/categories/infrastructure/Adapters';
import {
  CreateCategoryCommandHandler,
  FindAllCategoryQueryHandler,
  PaginationCategoryQueryHandler,
  UpdateCategoryCommandHandler,
} from '@warehouse/categories/infrastructure/Entrypoints';
import {
  CreateCategoryUseCase,
  FindAllCategoryUseCase,
  PaginationCategoryUseCase,
  UpdateCategoryUseCase,
} from '@warehouse/categories/application/UseCases';
import {
  CreateCategoryDomainService,
  FindAllCategoryDomainService,
  FindByIdCategoryDomainService,
  PaginationCategoryDomainService,
  UpdateCategoryDomainService,
} from '@warehouse/categories/domain/Services';
import { CategoryEntity } from '@warehouse/categories/infrastructure/Datebase';
import {
  CreateCategoryRepository,
  FindAllCategoryRepository,
  FindByIdCategoryRepository,
  PaginationCategoryRepository,
  UpdateCategoryRepository,
} from '@warehouse/categories/domain/ports/outbound/repositories';

export type CategoriesModuleOptions = {
  modules: Type[];
  adapters?: {
    createCategoryRepository: Type<CreateCategoryRepository>;
    updateCategoryRepository: Type<UpdateCategoryRepository>;
    findAllCategoryRepository: Type<FindAllCategoryRepository>;
    findByIdCategoryRepository: Type<FindByIdCategoryRepository>;
    paginationCategoryRepository: Type<PaginationCategoryRepository>;
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

    const PaginationCategoryUseCaseProvider = {
      provide: PAGINATION_CATEGORY_USECASE,
      useFactory: (paginationService: PaginationCategoryDomainService) => {
        return new PaginationCategoryUseCase(paginationService);
      },
      inject: [PAGINATION_CATEGORY_SERVICE],
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

    const PaginationCategoryServiceProvider = {
      provide: PAGINATION_CATEGORY_SERVICE,
      useFactory: (repository: PaginationCategoryRepository) => {
        return new PaginationCategoryDomainService(repository);
      },
      inject: [PaginationCategoryRepositoryAdapter],
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
        PaginationCategoryUseCaseProvider,
        PaginationCategoryServiceProvider,
        CreateCategoryRepositoryAdapter,
        UpdateCategoryRepositoryAdapter,
        FindByIdCategoryRepositoryAdapter,
        FindAllCategoryRepositoryAdapter,
        PaginationCategoryRepositoryAdapter,
        CreateCategoryUseCaseProvider,
        CreateCategoryCommandHandler,
        UpdateCategoryCommandHandler,
        UpdateCategoryUseCaseProvider,
        FindAllCategoryUseCaseProvider,
        FindAllCategoryQueryHandler,
        PaginationCategoryQueryHandler,
      ],
      exports: [
        CreateCategoryRepositoryAdapter,
        UpdateCategoryRepositoryAdapter,
        FindByIdCategoryRepositoryAdapter,
        FindAllCategoryRepositoryAdapter,
        PaginationCategoryRepositoryAdapter,
        CreateCategoryUseCaseProvider,
        UpdateCategoryUseCaseProvider,
        FindAllCategoryUseCaseProvider,
        PaginationCategoryUseCaseProvider,
      ],
      controllers: [
        CreateCategoryController,
        UpdateCategoryController,
        FindAllCategoryController,
        PaginationCategoryController,
      ],
    };
  }
}
