import { Type } from "class-transformer";
import { IsArray, IsDate, IsOptional, IsString, MinLength } from "class-validator";

export class CreateProjectDto {

  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @MinLength(1)
  description: string;

  @IsDate()
  @Type(() => Date)
  startDate: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  endDate?: string;

  @IsArray()
  @IsOptional()
  tools: any;

  @IsArray()
  @IsOptional()
  customers: any;

  @IsArray()
  @IsOptional()
  roles: any;

}
