
import { IsArray, IsString } from 'class-validator';

class CreateProjectDto {
    @IsString()
    email: string;
    @IsString()
    password: string;

}

export default CreateProjectDto;