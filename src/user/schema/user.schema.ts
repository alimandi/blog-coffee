import { Types } from 'mongoose';
import {
  AsyncModelFactory,
  Schema,
  Prop,
  SchemaFactory,
} from '@nestjs/mongoose';

@Schema({
  collection: 'users',
  timestamps: true,
})
export class User {
  _id: Types.ObjectId;

  @Prop({ required: true, trim: true })
  fullname: string;

  @Prop({ trim: true, required: true, unique: true })
  phone: string;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);

export const userModelFactory: AsyncModelFactory = {
  name: User.name,

  useFactory: async () => {
    const Schema = UserSchema;

    return Schema;
  },
};
