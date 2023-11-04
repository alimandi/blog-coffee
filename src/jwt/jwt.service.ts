import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_EXPIRATION } from './jwt.constant';

@Injectable()
export class JwtService {
  constructor(private readonly configService: ConfigService) {}

  async sign(userId: string): Promise<string> {
    const privateKey = this.configService.get<string>('PRIVATE_KEY');

    return jwt.sign({ userId }, privateKey, {
      expiresIn: `${ACCESS_TOKEN_EXPIRATION}d`,
    });
  }

  async verify(token: string): Promise<any> {
    try {
      const privateKey = this.configService.get<string>('PRIVATE_KEY');

      return jwt.verify(token, privateKey);
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
