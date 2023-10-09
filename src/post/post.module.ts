import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModelFactory } from './schema/post.schema';

@Module({
  imports: [MongooseModule.forFeatureAsync([PostModelFactory])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
