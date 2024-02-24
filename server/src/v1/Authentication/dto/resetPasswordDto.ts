
import { IsString } from 'class-validator';

class resetPasswordDto {
    @IsString()
    password: string;
    @IsString()
    passwordConfirm: string;
}

export default resetPasswordDto;