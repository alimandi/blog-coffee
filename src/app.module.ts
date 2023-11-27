import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserMiddleware } from './user/user.middleware';
import { JwtModule } from './jwt/jwt.module';
import { PostModule } from './post/post.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SmsModule } from './sms/sms.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from './redis/redis.module';
import * as Joi from 'joi';
import { userModelFactory } from './user/schema/user.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DB_URI: Joi.string().required(),
        KAVENEGAR_TOKEN: Joi.string().required(),
        KAVENEGAR_TEMPLATE: Joi.string().required(),
      }),
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('DB_URI'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeatureAsync([userModelFactory]),
    PostModule,
    UserModule,
    AuthModule,
    SmsModule,
    RedisModule,
    JwtModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
