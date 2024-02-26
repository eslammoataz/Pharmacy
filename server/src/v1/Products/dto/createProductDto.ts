import { IsString, IsIn, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsString()
  category: string;

  @IsString()
  image: string;
}

export default CreateProductDto;
