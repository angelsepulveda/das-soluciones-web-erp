import { Take } from '@core/domain/ValueObjects/Take';
import { Offset } from '@core/domain/ValueObjects/Offset';
import { Nullable } from '@core/domain/Primitives/Nullable';
import { PaginationParamsPrimitives } from '@core/domain/Primitives/PaginationParamsPrimitives';

export class PaginationParams {
  private readonly take: Take;
  private readonly offset: Offset;

  constructor(take: Nullable<number>, offset: Nullable<number>) {
    this.take = new Take(take);
    this.offset = new Offset(offset);
  }

  toPrtmitives(): PaginationParamsPrimitives {
    return {
      take: this.take.getValue(),
      offset: this.offset.getValue(),
    };
  }
}
