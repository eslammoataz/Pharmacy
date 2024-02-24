import { IsString, IsOptional, IsIn } from 'class-validator';

class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  @IsIn(['admin', 'customer'], {
    message: 'Role must be either admin or customer',
  })
  role?: string;
}

export default UpdateUserDto;
