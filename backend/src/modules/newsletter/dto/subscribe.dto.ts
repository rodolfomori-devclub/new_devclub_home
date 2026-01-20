import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class SubscribeDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsString()
  name?: string;
}

export class UnsubscribeDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
