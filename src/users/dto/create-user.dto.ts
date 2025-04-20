import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(['SUPER_ADMIN', 'ADMIN', 'NORMAL_USER'], {
    message: 'Valid role required',
  })
  role: 'SUPER_ADMIN' | 'ADMIN' | 'NORMAL_USER';
}
