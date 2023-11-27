import { Post } from '../schema/post.schema';

export class EditPostInput {
  title: string;
  description: string;
  disable: boolean;
}

export class EditPostOutput {
  message: string;
  post?: Post;
}
