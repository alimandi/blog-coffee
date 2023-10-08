import { PostModel } from '../post.model';

export class RemovePostOutput {
  message: string;
  post?: PostModel;
}
