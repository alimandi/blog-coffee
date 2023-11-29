import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { AddPostInput, AddPostOutput } from './dto/add-post.dto';
import { GetPostsInput, GetPostsOutput } from './dto/get-posts.dto';
import { EditPostInput, EditPostOutput } from './dto/edit-post.dto';
import { RemovePostOutput } from './dto/remove-post.dto';
import { GetPostOutput } from './dto/get-post.dto';
import { Post, PostDocument } from './schema/post.schema';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/schema/user.schema';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
  ) {}

  async addPost(user: User, input: AddPostInput): Promise<AddPostOutput> {
    const post = await this.postModel.create({
      createdBy: user._id,
      ...input,
    });

    return {
      message: `post added successfully`,
      post,
    };
  }

  async editPost(
    user: User,
    _id: Types.ObjectId,
    input: EditPostInput,
  ): Promise<EditPostOutput> {
    const post = await this.postModel.findOneAndUpdate(
      { _id, createdBy: user._id },
      { ...input },
      { new: true },
    );

    if (!post) throw new NotFoundException();

    return {
      message: 'post edited successfully',
      post,
    };
  }

  async removePost(user: User, _id: Types.ObjectId): Promise<RemovePostOutput> {
    const post = await this.postModel.findOneAndRemove({
      _id,
      createdBy: user._id,
    });

    if (!post) throw new NotFoundException();

    return {
      message: 'post removed successfully',
      post,
    };
  }

  async getPost(_id: Types.ObjectId): Promise<GetPostOutput> {
    const post = await this.postModel.findById({ _id }).populate(['createdBy']);

    if (!post) throw new NotFoundException();

    return {
      message: 'posts was found successfully',
      post,
    };
  }

  async getfilterPosts(input: GetPostsInput): Promise<GetPostsOutput> {
    const filters = {};

    if (input.q) {
      filters['$or'] = [
        { title: new RegExp(`.*${input.q}.*`, 'gi') },
        { description: new RegExp(`.*${input.q}.*`, 'gi') },
      ];
    }

    if (input.disable) {
      filters['disable'] = input.disable;
    }

    const posts = await this.postModel
      .find(filters)
      .limit(input.limit)
      .skip(input.page)
      .sort({ title: -1 })
      .populate(['createdBy']);

    return {
      message: 'posts was found successfully',
      posts,
    };
  }
}
