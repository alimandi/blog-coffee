import { PostModel } from '../post.model';

export class EditPostInput {
  title: string;
  description: string;
}

export class EditPostOutput {
  message: string;
  post?: PostModel;
}
