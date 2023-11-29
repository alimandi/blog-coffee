import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userModelFactory } from 'src/user/schema/user.schema';

@Module({
  imports: [MongooseModule.forFeatureAsync([userModelFactory])],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
