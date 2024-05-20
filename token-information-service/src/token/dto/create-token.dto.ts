import { IsString, IsInt, IsISO8601 } from 'class-validator';

export class CreateTokenDto {
  @IsString()
  key: string;

  @IsInt()
  rateLimit: number;

  @IsISO8601()
  expiration: string;
}
