import { Post } from '../schema/post.schema';

export class RemovePostOutput {
  message: string;
  post?: Post;
}
