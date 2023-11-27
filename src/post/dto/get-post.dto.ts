import { Post } from '../schema/post.schema';

export class GetPostOutput {
  message: string;
  post?: Post;
}
