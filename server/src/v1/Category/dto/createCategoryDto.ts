import { IsString, IsIn, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

class CreateCategoryDto {
  @IsString()
  name: string;
}

export default CreateCategoryDto;
