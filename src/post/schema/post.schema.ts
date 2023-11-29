import { Types } from 'mongoose';
import {
  AsyncModelFactory,
  Schema,
  Prop,
  SchemaFactory,
} from '@nestjs/mongoose';
import { User } from 'src/user/schema/user.schema';

@Schema({
  collection: 'posts',
  timestamps: true,
})
export class Post {
  _id: Types.ObjectId;

  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ trim: true })
  description: string;

  @Prop({ default: false })
  disable: boolean;

  @Prop({ type: Types.ObjectId, ref: User.name })
  createdBy: Types.ObjectId;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export type PostDocument = Post & Document;

export const PostSchema = SchemaFactory.createForClass(Post);

export const PostModelFactory: AsyncModelFactory = {
  name: Post.name,

  useFactory: async () => {
    const Schema = PostSchema;

    return Schema;
  },
};
