import { Injectable, BadRequestException } from '@nestjs/common';
import { SmsService } from 'src/sms/sms.service';
import parsePhoneNumber from 'libphonenumber-js';
import * as otpGenerator from 'otp-generator';
import { SendCodeInput, SendCodeOutput } from './dto/send-code.dto';
import { RedisService } from 'src/redis/redis.service';
import { JwtService } from 'src/jwt/jwt.service';
import { VerifyCodeInput, VerifyCodeOutput } from './dto/verify-code.dto';
import { User, UserDocument } from 'src/user/schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly smsService: SmsService,
    private readonly redisService: RedisService,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async sendCode(input: SendCodeInput): Promise<SendCodeOutput> {
    const phone = parsePhoneNumber(input.phone, input.region).number;

    const code = otpGenerator.generate(5, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    await this.redisService.set(phone, code, 120);

    await this.smsService.lookup(phone, code);

    return {
      message: 'code sent successfully',
    };
  }

  async verifyCode(input: VerifyCodeInput): Promise<VerifyCodeOutput> {
    const phone = parsePhoneNumber(input.phone, input.region).number;

    const code = await this.redisService.get(phone);

    if (code !== input.code)
      throw new BadRequestException('phone or code incorrect');

    await this.redisService.del(phone);

    const user = await this.userModel.findOneAndUpdate(
      { phone },
      {},
      { new: true, upsert: true },
    );

    const token = await this.jwtService.sign(user._id.toString());

    return {
      message: 'user authenticated successfully',
      token,
      user,
    };
  }
}
