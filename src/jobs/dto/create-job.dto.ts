import { Type } from "class-transformer";
import { IsArray, IsDate, IsNumber, IsOptional, IsString } from "class-validator";
import { CreateCompanyDto } from "src/companies/dto/create-company.dto";

export class CreateJobDto {

  @IsString()
  name: string;

  @IsDate()
  @Type(() => Date)
  startDate: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  endDate?: string;

  @IsArray()
  @IsOptional()
  projects?: any;

  @IsNumber()
  @IsOptional()
  company: any;

  @IsString()
  @IsOptional()
  description: string;

}
