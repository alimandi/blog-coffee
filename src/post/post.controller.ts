import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { AddPostInput, AddPostOutput } from './dto/add-post.dto';
import { EditPostInput, EditPostOutput } from './dto/edit-post.dto';
import { GetPostOutput } from './dto/get-post.dto';
import { GetPostsInput, GetPostsOutput } from './dto/get-posts.dto';
import { RemovePostOutput } from './dto/remove-post.dto';
import { Types } from 'mongoose';
import { currentUser } from 'src/common/current-user.decorator';
import { User } from 'src/user/schema/user.schema';

@Controller('posts')
export class PostController {
  constructor(private postservice: PostService) {}

  @Post()
  addPost(
    @currentUser() user: User,
    @Body() input: AddPostInput,
  ): Promise<AddPostOutput> {
    return this.postservice.addPost(user, input);
  }

  @Put(':id')
  editPost(
    @currentUser() user: User,
    @Param('id') _id: Types.ObjectId,
    @Body() input: EditPostInput,
  ): Promise<EditPostOutput> {
    return this.postservice.editPost(user, _id, input);
  }

  @Delete(':id')
  removePost(
    @currentUser() user: User,
    @Param('id') _id: Types.ObjectId,
  ): Promise<RemovePostOutput> {
    return this.postservice.removePost(user, _id);
  }

  @Get(':id')
  getPost(@Param('id') _id: Types.ObjectId): Promise<GetPostOutput> {
    return this.postservice.getPost(_id);
  }

  @Get()
  getPosts(@Query() input: GetPostsInput): Promise<GetPostsOutput> {
    return this.postservice.getfilterPosts(input);
  }
}
