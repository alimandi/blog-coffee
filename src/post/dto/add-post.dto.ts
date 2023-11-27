import { Post } from '../schema/post.schema';

export class AddPostInput {
  title: string;
  description: string;
  disable: boolean;
}

export class AddPostOutput {
  message: string;
  post?: Post;
}
