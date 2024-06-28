import { DomainException } from '@core/domain/Exceptions/DomainException';

export class CategoryNotFoundException extends DomainException {
  constructor() {
    super('Category not found');
  }
}
