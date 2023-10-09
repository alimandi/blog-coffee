import { Types } from 'mongoose';
import {
  AsyncModelFactory,
  Schema,
  Prop,
  SchemaFactory,
} from '@nestjs/mongoose';

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
