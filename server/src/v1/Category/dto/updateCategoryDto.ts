import { IsString, IsIn, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

class updateCategoryDto {
  @IsString()
  name: string;
}

export default updateCategoryDto;
