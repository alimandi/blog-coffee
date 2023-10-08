import { PostModel } from '../post.model';

export class GetPostsOutput {
  message: string;
  post?: PostModel[];
}
