import { Nullable } from '@core/domain/Primitives/Nullable';

export class Offset {
  private valueDefault: number = 1;
  private readonly value: number;

  constructor(value: Nullable<number>) {
    this.value = this.insuranceValue(value);
  }

  private insuranceValue(value: Nullable<number>): number {
    if (!value) {
      return this.valueDefault;
    }

    if (value <= 0) {
      return this.valueDefault;
    }

    return value;
  }

  public getValue(): number {
    return this.value;
  }
}
