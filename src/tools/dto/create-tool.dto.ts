import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateToolDto {

  id: number;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  urlImage: string;

  @IsString()
  @IsOptional()
  type: string;

  @IsNumber()
  @IsOptional()
  rate: number;

  @IsBoolean()
  @IsOptional()
  favorite: boolean;

}
