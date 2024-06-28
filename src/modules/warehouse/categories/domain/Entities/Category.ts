import { CategoryId } from '@warehouse/categories/domain/ValueObjects/CategoryId';
import { Nullable } from '@core/domain/Primitives/Nullable';
import { CategoryProperties } from '@warehouse/categories/domain/Properties/CategoryProperties';
import { CategoryPrimitives } from '@warehouse/categories/domain/Primitives/CategoryPrimitives';

export class Category {
  private readonly id: CategoryId;
  private name: string;
  private description: Nullable<string>;
  private status: boolean;

  private constructor(properties: CategoryProperties) {
    Object.assign(this, properties);
  }

  static create(name: string, description: Nullable<string>): Category {
    const categoryId = new CategoryId(CategoryId.generate());

    const categoryProperties: CategoryProperties = {
      id: categoryId,
      name: name,
      description: description,
      status: true,
    };
    return new Category(categoryProperties);
  }

  updateProperties(name: string, description: Nullable<string>): void {
    this.name = name;
    this.description = description;
  }

  delete(): void {
    this.status = false;
  }

  restore(): void {
    this.status = true;
  }

  toPrimitives(): CategoryPrimitives {
    return {
      id: this.id.getValue(),
      name: this.name,
      description: this.description,
      status: this.status,
    };
  }

  static fromPrimitives(primitives: CategoryPrimitives): Category {
    const properties = {
      id: new CategoryId(primitives.id),
      name: primitives.name,
      description: primitives.description,
      status: primitives.status,
    };

    return new Category(properties);
  }
}
