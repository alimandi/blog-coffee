import { IsString } from 'class-validator';
import { CountryCode } from 'libphonenumber-js';

export class SendCodeInput {
  @IsString()
  region: CountryCode;

  @IsString()
  phone: string;
}
export class SendCodeOutput {
  message: string;
}
