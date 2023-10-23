import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SmsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async lookup(receptor: string, token: string) {
    const remote =
      'https://api.kavenegar.com/v1/' +
      this.configService.get('KAVENEGAR_TOKEN') +
      '/verify/lookup.json?receptor=' +
      receptor +
      '&token=' +
      token +
      '&template=' +
      this.configService.get('KAVENEGAR_TEMPLATE') +
      '&type=sms';

    await this.httpService.axiosRef.get(remote);
  }
}
