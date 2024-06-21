import { ValueObject } from './value-object';
import { v4 as uuidv4 } from 'uuid';

export class IdValueObject extends ValueObject<string> {
  constructor(value: string) {
    super(value, `Invalid UUID Id:${value}`);
  }

  validate(value: string): boolean {
    const re =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return re.test(value);
  }

  static generate(): string {
    return uuidv4();
  }
}
