import { PostModel } from '../post.model';

export class AddPostInput {
  title: string;
  description: string;
}

export class AddPostOutput {
  message: string;
  post?: PostModel;
}
