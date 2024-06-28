import { Nullable } from '@core/domain/Primitives/Nullable';

export class Take {
  private valueDefault: number = 10;
  private readonly value: number;

  constructor(value: Nullable<number>) {
    this.value = this.insuranceValueMax(value);
  }

  private insuranceValueMax(value: Nullable<number>): number {
    if (!value) {
      return this.valueDefault;
    }

    if (value > 50 && value <= 0) {
      return this.valueDefault;
    }

    return value;
  }

  public getValue(): number {
    return this.value;
  }
}
