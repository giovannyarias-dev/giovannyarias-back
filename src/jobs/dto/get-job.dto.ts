import { Type } from "class-transformer";
import { IsOptional } from "class-validator";

export class GetJobsDto {

  @IsOptional()
  @Type(() => String)
  yearsRange?: string;

}