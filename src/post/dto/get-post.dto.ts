import { PostModel } from '../post.model';

export class GetPostOutput {
  message: string;
  post?: PostModel;
}
