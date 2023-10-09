import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Model } from 'mongoose';
import { PostModel } from './post.model';
import { AddPostInput, AddPostOutput } from './dto/add-post.dto';
import { GetPostsOutput } from './dto/get-posts.dto';
import { EditPostInput, EditPostOutput } from './dto/edit-post.dto';
import { RemovePostOutput } from './dto/remove-post.dto';
import { GetPostOutput } from './dto/get-post.dto';
import { Post, PostDocument, PostSchema } from './schema/post.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
  ) {}

  private posts: PostModel[] = [];

  async addPost(input: AddPostInput): Promise<AddPostOutput> {
    const post = await this.postModel.create({
      ...input,
    });

    return {
      message: 'post added successfully',
      post,
    };
  }

  editPost(id: string, input: EditPostInput): EditPostOutput {
    let post: PostModel;

    this.posts = this.posts.map((p) => {
      if (p.id === id) {
        post = {
          id: p.id,
          title: input.title,
          description: input.description,
        };

        return post;
      }
      return p;
    });

    return {
      message: 'post edited successfully',
      post,
    };
  }

  removePost(id: string): RemovePostOutput {
    let post: PostModel;

    this.posts = this.posts.filter((p) => {
      if (p.id === id) {
        post = p;
      }

      return p.id !== id;
    });

    return {
      message: 'post removed successfully',
      post,
    };
  }

  getPost(id: string): GetPostOutput {
    const post: PostModel = this.posts.find((getPost) => getPost.id == id);
    return {
      message: 'posts was found successfully',
      post,
    };
  }

  getPosts(): GetPostsOutput {
    return {
      message: 'posts was found successfully',
      post: this.posts,
    };
  }
}
