import { IsString, IsIn } from 'class-validator';
import { Transform } from 'class-transformer';

class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  @IsIn(['admin', 'customer'], {
    message: 'Role must be either admin or customer',
  })
  role: string;
}

export default CreateUserDto;
