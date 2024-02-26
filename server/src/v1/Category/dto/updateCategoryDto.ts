import { IsString, IsIn, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

class updateCategoryDto {
  @IsOptional()
  @IsString()
  name: string;
}

export default updateCategoryDto;
