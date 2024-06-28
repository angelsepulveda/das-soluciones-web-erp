import { DomainException } from '@core/domain/Exceptions/DomainException';

export abstract class ValueObject<T> {
  protected abstract validate(value: T): boolean;

  protected constructor(
    private primitiveValue: T,
    errorMessage: string,
  ) {
    if (!this.validate(primitiveValue)) throw new DomainException(errorMessage);
  }

  getValue(): T {
    return this.primitiveValue;
  }
}
