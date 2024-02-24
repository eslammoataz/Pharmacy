
import { IsString } from 'class-validator';

class forgetPasswordDto {
    @IsString()
    email: string;
}

export default forgetPasswordDto;