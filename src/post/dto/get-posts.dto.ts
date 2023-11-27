import { Post } from '../schema/post.schema';

export class GetPostsInput {
  page?: number = 1;
  limit?: number = 10;
  q?: string;
  disable?: boolean;
}

export class GetPostsOutput {
  message: string;
  posts?: Post[];
}
