import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsPositive()
  quantity: number;
}
