import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostService } from './post.service';
import { AddPostInput, AddPostOutput } from './dto/add-post.dto';
import { EditPostInput, EditPostOutput } from './dto/edit-post.dto';
import { GetPostOutput } from './dto/get-post.dto';
import { GetPostsOutput } from './dto/get-posts.dto';

@Controller('posts')
export class PostController {
  constructor(private postservice: PostService) {}

  @Post()
  addPost(@Body() input: AddPostInput): AddPostOutput {
    return this.postservice.addPost(input);
  }

  @Put(':id')
  editPost(
    @Param('id') id: string,
    @Body() input: EditPostInput,
  ): EditPostOutput {
    return this.postservice.editPost(id, input);
  }

  @Delete(':id')
  removePost(@Param('id') id: string): EditPostOutput {
    return this.postservice.removePost(id);
  }

  @Get(':id')
  getPost(@Param('id') id: string): GetPostOutput {
    return this.postservice.getPost(id);
  }

  @Get()
  getPosts(): GetPostsOutput {
    return this.postservice.getPosts();
  }
}
