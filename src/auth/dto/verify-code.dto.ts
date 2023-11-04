import { IsString } from 'class-validator';
import { CountryCode } from 'libphonenumber-js';
import { User } from 'src/user/schema/user.schema';

export class VerifyCodeInput {
  @IsString()
  region: CountryCode;

  @IsString()
  phone: string;

  @IsString()
  code: string;
}
export class VerifyCodeOutput {
  token?: string;
  message: string;
  user?: User;
}
