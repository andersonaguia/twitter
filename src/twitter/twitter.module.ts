import { Module } from '@nestjs/common';
import { databaseProviders } from 'src/core/database/database.providers';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { twitterProviders } from './twitter.providers';

@Module({
  controllers: [UserController],
  providers: [
    ...databaseProviders,
    ...twitterProviders,
    UserService
  ]
})
export class TwitterModule { }
