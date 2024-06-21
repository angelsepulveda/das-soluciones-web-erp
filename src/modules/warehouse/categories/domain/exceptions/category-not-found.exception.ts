import { DomainException } from '@core/domain/exceptions/domain-exception';

export class CategoryNotFoundException extends DomainException {
  constructor() {
    super('Category not found');
  }
}
