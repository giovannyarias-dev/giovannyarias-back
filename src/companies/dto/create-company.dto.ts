import { IsOptional, IsString } from "class-validator";

export class CreateCompanyDto {
  id: number;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  urlImage: string;

  @IsString()
  @IsOptional()
  country: string;

  @IsString()
  color: string;
}
