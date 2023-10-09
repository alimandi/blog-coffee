import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/blog-coffee'),
    PostModule,
  ],
})
export class AppModule {}
