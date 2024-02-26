import { IsString, IsIn, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

class UpdateProductDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  image: string;
}

export default UpdateProductDto;
