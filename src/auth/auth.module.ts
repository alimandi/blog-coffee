import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SmsService } from 'src/sms/sms.service';
import { HttpModule } from '@nestjs/axios';
import { RedisService } from 'src/redis/redis.service';
import { JwtService } from 'src/jwt/jwt.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userModelFactory } from 'src/user/schema/user.schema';

@Module({
  imports: [MongooseModule.forFeatureAsync([userModelFactory]), HttpModule],
  providers: [AuthService, RedisService, SmsService, JwtService],
  controllers: [AuthController],
})
export class AuthModule {}
