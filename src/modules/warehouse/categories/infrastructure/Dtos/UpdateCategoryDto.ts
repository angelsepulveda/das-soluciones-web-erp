import { IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";

export class UpdateCategoryDto {
    @IsUUID()
    id: string;

    @IsString()
    @MinLength(1)
    @MaxLength(50)
    name: string;
  
    @IsString()
    @IsOptional()
    @MaxLength(255)
    description?: string;
  }
  