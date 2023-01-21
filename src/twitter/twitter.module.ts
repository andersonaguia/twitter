import { Module } from '@nestjs/common';
import { databaseProviders } from 'src/core/database/database.providers';
import { TweetController } from './controller/tweet.controller';
import { UserController } from './controller/user.controller';
import { TweetService } from './service/tweet.service';
import { UserService } from './service/user.service';
import { twitterProviders } from './twitter.providers';

@Module({
  controllers: [
    UserController,
    TweetController
  ],
  providers: [
    ...databaseProviders,
    ...twitterProviders,
    UserService,
    TweetService
  ]
})
export class TwitterModule { }
