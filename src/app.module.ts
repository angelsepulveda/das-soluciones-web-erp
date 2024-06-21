import { Module } from '@nestjs/common';
import { CategoriesModule } from '@warehouse/categories/infrastructure/categories.module';
import { InfrastructureModule } from '@core/infrastructure/infrastructure.module';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    InfrastructureModule,
    CategoriesModule.register({
      modules: [InfrastructureModule, CqrsModule],
    }),
  ],
})
export class AppModule {}
