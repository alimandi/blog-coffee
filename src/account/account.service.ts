import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/schema/user.schema';
import { EditAccountInput, EditAccountOutput } from './dto/edit-account.dto';
import { getAccountOutput } from './dto/get-account.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async editAccount(
    currentUser: User,
    input: EditAccountInput,
  ): Promise<EditAccountOutput> {
    const user = await this.userModel.findOneAndUpdate(
      { _id: currentUser._id },
      { ...input },
      { new: true },
    );

    return {
      message: 'user edited successfully',
      user,
    };
  }

  async getAccount(currentUser: User): Promise<getAccountOutput> {
    return {
      message: 'account was found successfully',
      user: currentUser,
    };
  }
}
